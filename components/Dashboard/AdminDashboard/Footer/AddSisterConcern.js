import { Button, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { toast } from 'react-toastify';
import useSisterConcernMutation from '../../../../apolloClient/mutation/footer/SiteSetting/CreateSisterConcern';
import { GET_SISTER_CONCERN } from '../../../../apolloClient/queries/adminDashboard/Footer/GetSisterConcern';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
}));

const AddSisterConcern = ({token}) => {

    const { sisterConcernMutationHandler, loading, error, data } =
    useSisterConcernMutation();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }, } = useForm()


 // Submit sister concern data
 const submitHandler = (data) => {

    sisterConcernMutationHandler({
      variables: {
        name: data.name,
        link: data.link,
      },
      refetchQueries: [{ query: GET_SISTER_CONCERN }],
     // refetchQueries: 
      context: {
        headers: {
          Authorization: `JWT ${token}`,
        },
      },

      onCompleted: () => {
       // router.push("/consumer-dashboard/inventory/warehouse/warehouse-list");
        
        toast.success("Sister concern added successfully!", {
          position: "top-center",
          autoClose: 3000,
        });

        reset({
          name: "",
          link: ""
        });
      },
      onError: (err) => {
        console.log("please input valid value :: ", err);
        toast.warn("Sister concern not added!", {
          position: "top-center",
          autoClose: 3000,
        });
      },
    });
  };

    return (
        <>
            <form onSubmit={handleSubmit(submitHandler)}>
                <Typography sx={{fontSize:{xs:'10px',md:'12px',lg:'16px',padding:'5px'}}}>Add New Sister Concern</Typography>
                <Item sx={{mb:5,p:3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <TextField
                                fullWidth
                                size="small"
                                id="fullWidth"
                                label="Name"
                                name="name"
                                {...register("name", { required: true })}

                            />
                            <Typography sx={{ color: "#E75C33" }}>
                                {errors.name &&
                                    errors.name.type === "required" &&
                                    "You must have category name"}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={12}>
                            <TextField
                                fullWidth
                                size="small"
                                id="fullWidth"
                                label="Link"
                                //sx={{ background: "#F5F5F5" }}
                                {...register("link")}
                            //value={slug}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
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
            </form>


        </>
    )
}

export default AddSisterConcern