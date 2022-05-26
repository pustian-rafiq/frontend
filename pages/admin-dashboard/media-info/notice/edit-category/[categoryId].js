import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useRouter } from "next/router";
import withAdminAuth from "../../../../../components/Dashboard/PrivateRoute/withAdminAuth";
import getCookie from "../../../../../utils/getCookie";
import getCurrentUser from "../../../../../utils/getCurrentUser";

const rows = [
  {
    sl: 1,
    title: "General",
    description: "General",
  },
  {
    sl: 2,
    title: "Special",
    description: "Special",
  },
];

const editCategory = ({ token, currentUser }) => {
  const router = useRouter();
  const { categoryId } = router.query;
  const category = rows.find((row) => row.sl === parseInt(categoryId));
  console.log(categoryId);
  return (
    <Box>
      <Grid container spacing={2} sx={{ alignItems: "center" }}>
        <Grid item xs={12} sm={6} sx={{ my: 3 }}>
          <InputLabel
            sx={{
              fontSize: { xs: "12px", sm: "16px", md: "18px" },
              fontWeight: 600,
              color: "#34395e",
            }}
          >
            Title<span style={{ color: "red" }}>*</span>
          </InputLabel>
          <FormControl fullWidth sx={{ background: "#ffffff" }}>
            <OutlinedInput
              multiline
              maxRows={4}
              defaultValue={category.title}
              placeholder="Enter Title"
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} sx={{ my: 3 }}>
          <InputLabel
            sx={{
              fontSize: { xs: "12px", sm: "16px", md: "18px" },
              fontWeight: 600,
              color: "#34395e",
            }}
          >
            Description<span style={{ color: "red" }}>*</span>
          </InputLabel>
          <FormControl fullWidth sx={{ background: "#ffffff" }}>
            <OutlinedInput
              multiline
              maxRows={4}
              defaultValue={category.description}
              placeholder="Enter Description"
            />
          </FormControl>
        </Grid>
      </Grid>
      <Button variant="contained">Save</Button>
    </Box>
  );
};

export default withAdminAuth(editCategory);

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
