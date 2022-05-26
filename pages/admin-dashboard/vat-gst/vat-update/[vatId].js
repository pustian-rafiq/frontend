import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Autocomplete } from "@mui/material";
import useVatGst from "../../../../apolloClient/queries/vatGst/vatQuery";
import getCookie from "../../../../utils/getCookie";
import useCountry from "../../../../apolloClient/queries/allCountryQuery";
import { useForm } from "react-hook-form";
import useUpdateVat from "../../../../apolloClient/mutation/vatGst/updateVat";
import { useRouter } from "next/router";
import { GET_VAT_GST_LIST } from "../../../../apolloClient/queries/vatGst/vatGstListQuery";
import withAdminAuth from "../../../../components/Dashboard/PrivateRoute/withAdminAuth";
import getCurrentUser from "../../../../utils/getCurrentUser";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const UpdateVat = ({ countries, token, currentUser }) => {
  const router = useRouter();
  const { vatId } = router.query;
  const { data: vatData, loading: vatLoading } = useVatGst(vatId);

  const [country, setCountry] = useState(vatData?.vat?.country?.id);
  const {
    vatMutation,
    loading: vatUpdateLoading,
    error: vatUpdateError,
  } = useUpdateVat();

  useEffect(() => {
    setCountry(vatData?.vat?.country?.id);
  }, [vatData]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { country: country } });

  const onSubmit = (data) => {
    const formData = new FormData();
    for (const i in data) {
      if (i === "percentageAmt") {
        formData.append("percentageAmt", parseFloat(data[i]));
      } else {
        formData.append(i, data[i]);
      }
    }

    vatMutation({
      variables: {
        id: vatData?.vat?.id,
        sector: formData.get("sector"),
        description: formData.get("description"),
        percentageAmt: formData.get("percentageAmt"),
        country: country,
        state: formData.get("state"),
        county: formData.get("county"),
        city: formData.get("city"),
      },
      context: {
        headers: {
          Authorization: `JWT ${token}`,
        },
      },
      // refetchQueries: [
      //   GET_VAT_GST_LIST, // DocumentNode object parsed with gql
      // ],
    });

    if (!vatUpdateLoading && !vatUpdateError) {
      router.push("/admin-dashboard/vat-gst/vat-list");
    } else {
      alert(vatUpdateError);
    }
  };

  return (
    <>
      <div className="paymentTitle">
        <span>Update Vat</span>
      </div>
      <Divider sx={{ mb: 5 }} />
      {!vatLoading && (
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ flexGrow: 1, maxWidth: "100%" }}>
              <Grid container spacing={2} rowSpacing={4}>
                <Grid item md={12}>
                  <Item style={{ padding: "20px 20px" }}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={4}>
                        <TextField
                          fullWidth
                          size="small"
                          id="fullWidth"
                          label="Sector*"
                          defaultValue={vatData?.vat?.sector}
                          {...register("sector", { required: true })}
                        />
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <TextField
                          fullWidth
                          size="small"
                          id="fullWidth"
                          label="Percentage amt*"
                          defaultValue={vatData?.vat?.percentageAmt}
                          {...register("percentageAmt")}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Autocomplete
                          id="size-small-outlined"
                          size="small"
                          options={countries}
                          getOptionLabel={(option) => option?.node?.name}
                          defaultValue={countries.find(
                            (v) => v.node.name === vatData?.vat?.country?.name
                          )}
                          onChange={(event, value) =>
                            setCountry(value?.node?.id)
                          }
                          renderInput={(params) => (
                            <TextField
                              required
                              {...params}
                              label="Select Country *"
                              placeholder="Search by country"
                              {...register("country")}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          fullWidth
                          size="small"
                          id="fullWidth"
                          label="State"
                          defaultValue={vatData?.vat?.state}
                          {...register("state")}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          fullWidth
                          size="small"
                          id="fullWidth"
                          label="County"
                          defaultValue={vatData?.vat?.county}
                          {...register("county")}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          fullWidth
                          size="small"
                          id="fullWidth"
                          label="City"
                          defaultValue={vatData?.vat?.city}
                          {...register("city")}
                        />
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Description"
                          id="outlined-textarea"
                          multiline
                          defaultValue={vatData?.vat?.description}
                          {...register("description")}
                        />
                      </Grid>

                      <Grid item xs={6} md={2}>
                        <Button
                          type="submit"
                          sx={{
                            background: "#20C20C",
                            color: "white",
                            textTransform: "capitalize",
                            ":hover": {
                              background: "#0B4A02",
                            },
                          }}
                        >
                          Save
                        </Button>
                      </Grid>
                    </Grid>
                  </Item>
                </Grid>
              </Grid>
            </Box>
          </form>
        </div>
      )}
    </>
  );
};
export default withAdminAuth(UpdateVat);

export const getServerSideProps = async ({ req }) => {
  const isServerSide = "isServerSide";

  const getSessionCookie = getCookie(req, isServerSide);
  const getUser = JSON.parse(getCurrentUser(req, isServerSide));
  const { countries } = await useCountry();
  const countries1 = countries.countries.edges;

  if (getSessionCookie === null || !getUser || !getUser.isStaff) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      countries: countries1,
      token: getSessionCookie,
      currentUser: getUser,
    },
  };
};
