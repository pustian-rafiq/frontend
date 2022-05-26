import AdminDashboardLayout from "../../../components/Dashboard/AdminDashboard/AdminDashboardLayout";
import { Box, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import AddSubCategory from "../../../components/Dashboard/AdminDashboard/Inventory/SubCategory/AddSubCategory";
import ShowSubCategory from "../../../components/Dashboard/AdminDashboard/Inventory/SubCategory/ShowSubCategory";
import getCookie from "../../../utils/getCookie";
import client from "../../../apolloClient/configuration/apolloConfig";
import { GET_SUBCATEGORIES } from "../../../apolloClient/queries/inventory/SubCategoryQuery";
import { GET_CATEGORIES } from "../../../apolloClient/queries/inventory/CategoryQuery";
import withAdminAuth from "../../../components/Dashboard/PrivateRoute/withAdminAuth";
import getCurrentUser from "../../../utils/getCurrentUser";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const SubCategory = ({ categories, token, sub_categories }) => {
  return (
    <>
      <Box sx={{ flexGrow: 1, maxWidth: "100%" }}>
        <Grid container spacing={2} rowSpacing={4}>
          <Grid item md={12}>
            {/* Add Category */}
            <Item style={{ padding: "20px 20px" }}>
              <AddSubCategory
                categories={categories}
                getSessionCookie={token}
              />
            </Item>
            {/* Show Category */}
            <ShowSubCategory
              subCategories={sub_categories}
              getSessionCookie={token}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default withAdminAuth(SubCategory);

export const getServerSideProps = async ({ req }) => {
  const isServerSide = "isServerSide";

  const getSessionCookie = getCookie(req, isServerSide);
  const getUser = JSON.parse(getCurrentUser(req, isServerSide));

  //Fetch sub category
  const { data } = await client.query({
    query: GET_SUBCATEGORIES,
    fetchPolicy: "network-only",
    context: {
      headers: {
        Authorization: `JWT ${getSessionCookie}`,
      },
    },
  });

  // Fetch Category
  const { data: categories } = await client.query({
    query: GET_CATEGORIES,
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
      categories: categories.categories.edges,
      sub_categories: data.subCategories.edges,
      token: getSessionCookie,
      currentUser: getUser,
    },
  };
};
