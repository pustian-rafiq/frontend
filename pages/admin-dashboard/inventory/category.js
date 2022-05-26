import { Box, Grid } from "@mui/material";
import AddCategory from "../../../components/Dashboard/AdminDashboard/Inventory/Category/AddCategory";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import ShowCategory from "../../../components/Dashboard/AdminDashboard/Inventory/Category/ShowCategory";
import client from "../../../apolloClient/configuration/apolloConfig";
import { GET_CATEGORIES } from "../../../apolloClient/queries/inventory/CategoryQuery";
import getCookie from "../../../utils/getCookie";
import withAdminAuth from "../../../components/Dashboard/PrivateRoute/withAdminAuth";
import getCurrentUser from "../../../utils/getCurrentUser";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const category = ({ token, categories }) => {
  return (
    <>
      <Box sx={{ flexGrow: 1, maxWidth: "100%" }}>
        <Grid container spacing={2} rowSpacing={4}>
          <Grid item md={12}>
            {/* Add Category */}
            <Item style={{ padding: "20px 20px" }}>
              <AddCategory getSessionCookie={token} />
            </Item>
            {/* Show Category */}
            <ShowCategory getSessionCookie={token} categories={categories} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default withAdminAuth(category);

export const getServerSideProps = async ({ req }) => {
  const isServerSide = "isServerSide";

  const getSessionCookie = getCookie(req, isServerSide);
  const getUser = JSON.parse(getCurrentUser(req, isServerSide));

  const { data } = await client.query({
    query: GET_CATEGORIES,
    fetchPolicy: "network-only",
    // custom header for every request
    context: {
      headers: {
        Authorization: `JWT ${getSessionCookie}`,
      },
    },
  });

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
      categories: data.categories.edges,
      token: getSessionCookie,
      currentUser: getUser,
    },
  };
};
