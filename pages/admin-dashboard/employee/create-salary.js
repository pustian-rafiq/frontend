import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Autocomplete } from "@mui/material";
import { useForm } from "react-hook-form";
import withAdminAuth from "../../../components/Dashboard/PrivateRoute/withAdminAuth";
import getCookie from "../../../utils/getCookie";
import getCurrentUser from "../../../utils/getCurrentUser";
// import Moment from "react-moment";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));
const Input = styled("input")({
  display: "none",
});

const AddSalary = ({ token, currentUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const date = new Date();
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var monthName = months[date.getMonth()];
  // const paymentTime = <Moment format="MM Do YYYY, h:mm:ss a">{date}</Moment>;

  return (
    <>
      <div className="paymentTitle">
        <span>Add Employee Salary</span>
      </div>
      <Divider sx={{ mb: 5 }} />
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ flexGrow: 1, maxWidth: "100%" }}>
            <Grid container spacing={2} rowSpacing={4}>
              <Grid item md={12}>
                <Item style={{ padding: "20px 20px" }}>
                  <Grid container spacing={3}>
                    {/* Left Column of the form*/}
                    <Grid item xs={12} md={4}>
                      <Autocomplete
                        id="size-small-outlined"
                        size="small"
                        options={employeeList}
                        getOptionLabel={(option) => option.name}
                        //defaultValue={employeeList[0]}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Employee *"
                            placeholder="Search by name"
                            {...register("employee_name", { required: true })}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      {/* <InputLabel htmlFor="component-simple">First name *</InputLabel> */}
                      <TextField
                        fullWidth
                        size="small"
                        id="fullWidth"
                        label="Salary month*"
                        value={monthName}
                        inputProps={{ readOnly: true }}
                        {...register("salary_month", { required: true })}
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      {/* <InputLabel htmlFor="component-simple">First name *</InputLabel> */}
                      <TextField
                        fullWidth
                        size="small"
                        id="fullWidth"
                        label="Gross salary*"
                        {...register("salary", { required: true })}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      {/* <InputLabel htmlFor="component-simple">First name *</InputLabel> */}
                      <TextField
                        fullWidth
                        size="small"
                        id="fullWidth"
                        label="Increment amount*"
                        {...register("increment_amount", { required: true })}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      {/* <InputLabel htmlFor="component-simple">First name *</InputLabel> */}
                      <TextField
                        fullWidth
                        size="small"
                        id="fullWidth"
                        label="Reduce amount*"
                        {...register("reduce_amount", { required: true })}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      {/* <InputLabel htmlFor="component-simple">First name *</InputLabel> */}
                      <TextField
                        fullWidth
                        size="small"
                        id="fullWidth"
                        label="Total salary*"
                        {...register("total_salary", { required: true })}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      {/* <InputLabel htmlFor="component-simple">First name *</InputLabel> */}
                      <TextField
                        fullWidth
                        size="small"
                        id="fullWidth"
                        label="Received amount*"
                        {...register("receive_amount", { required: true })}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      {/* <InputLabel htmlFor="component-simple">First name *</InputLabel> */}
                      <TextField
                        fullWidth
                        size="small"
                        id="fullWidth"
                        label="Remaining amount*"
                        {...register("remaining_amount", { required: true })}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      {/* <InputLabel htmlFor="component-simple">First name *</InputLabel> */}
                      <TextField
                        fullWidth
                        size="small"
                        label="Reduce amount description"
                        multiline
                        id="outlined-textarea"
                        {...register("reduce_amount_description", {
                          required: true,
                        })}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      {/* <InputLabel htmlFor="component-simple">First name *</InputLabel> */}
                      <TextField
                        fullWidth
                        size="small"
                        // value={paymentTime.props.children.toString()}
                        inputProps={{ readOnly: true }}
                        multiline
                        id="outlined-textarea"
                        label="Salary payment time"
                        {...register("salary_payment_time", { required: true })}
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
export default withAdminAuth(AddSalary);

export const getServerSideProps = async ({ req }) => {
  const isServerSide = "isServerSide";

  const getSessionCookie = getCookie(req, isServerSide);
  const getUser = JSON.parse(getCurrentUser(req, isServerSide));

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
      currentUser: getUser,
    },
  };
};

const employeeList = [
  { name: "Md. Rafiqul Islam" },
  { name: "Md. Mim Islam" },
  { name: "Md. Ariful Islam" },
  { name: "Md. Munna" },
  { name: "Md. Nazmul Hossain" },
  { name: "Md. Shovo" },
];
