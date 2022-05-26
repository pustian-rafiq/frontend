import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Autocomplete } from "@mui/material";
import { useForm } from "react-hook-form";
import useCreateVat from "../../../apolloClient/mutation/vatGst/createVat";
import getCookie from "../../../utils/getCookie";
import { useRouter } from "next/router";
import useCountry from "../../../apolloClient/queries/allCountryQuery";
import { GET_VAT_GST_LIST } from "../../../apolloClient/queries/vatGst/vatGstListQuery";
import withAdminAuth from "../../../components/Dashboard/PrivateRoute/withAdminAuth";
import getCurrentUser from "../../../utils/getCurrentUser";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));
const Input = styled("input")({
  display: "none",
});

const AddVat = ({ token, countries, currentUser }) => {
  const router = useRouter();
  const [country, setCountry] = useState(
    countries[18]?.node?.id ? countries[18]?.node?.id : "Q291bnRyeU5vZGU6MjY5"
  );
  const {
    vatMutation,
    loading: vatCreateLoading,
    error: vatCreateError,
  } = useCreateVat();

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
    });

    if (!vatCreateLoading && !vatCreateError) {
      router.push("/admin-dashboard/vat-gst/vat-list");
    } else {
      alert(vatCreateError);
    }
  };

  return (
    <>
      <div className="paymentTitle">
        <span>Add New Vat</span>
      </div>
      <Divider sx={{ mb: 5 }} />
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
                        {...register("sector", { required: true })}
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        size="small"
                        id="fullWidth"
                        label="Percentage amt*"
                        {...register("percentageAmt", { required: true })}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Autocomplete
                        id="size-small-outlined"
                        size="small"
                        options={countries}
                        getOptionLabel={(option) => option?.node?.name}
                        defaultValue={countries[18]}
                        onChange={(event, value) => setCountry(value?.node?.id)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Country *"
                            placeholder="Search by country"
                            {...register("country", { required: true })}
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
                        {...register("state", { required: true })}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        size="small"
                        id="fullWidth"
                        label="County"
                        {...register("county", { required: true })}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        size="small"
                        id="fullWidth"
                        label="City"
                        {...register("city", { required: true })}
                      />
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Description"
                        id="outlined-textarea"
                        multiline
                        {...register("description", { required: true })}
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
    </>
  );
};
export default withAdminAuth(AddVat);

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
      token: getSessionCookie,
      countries: countries1,
      currentUser: getUser,
    },
  };
};
