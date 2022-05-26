import { Box, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import AddSubSubCategory from "../../../components/Dashboard/AdminDashboard/Inventory/SubSubCategory/AddSubSubCategory";
import ShowSubSubCategory from "../../../components/Dashboard/AdminDashboard/Inventory/SubSubCategory/ShowSubSubCategory";
import getCookie from "../../../utils/getCookie";
import client from "../../../apolloClient/configuration/apolloConfig";
import { GET_SUB_SUBCATEGORIES } from "../../../apolloClient/queries/inventory/SubsubCategoryQuery";
import { GET_SUBCATEGORIES } from "../../../apolloClient/queries/inventory/SubCategoryQuery";
import withAdminAuth from "../../../components/Dashboard/PrivateRoute/withAdminAuth";
import getCurrentUser from "../../../utils/getCurrentUser";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const SubSubCategory = ({ sub_categories, token, sub_subcategories }) => {
  return (
    <>
      <Box sx={{ flexGrow: 1, maxWidth: "100%" }}>
        <Grid container spacing={2} rowSpacing={4}>
          <Grid item md={12}>
            {/* Add Category */}
            <Item style={{ padding: "20px 20px" }}>
              <AddSubSubCategory
                subCategories={sub_categories}
                getSessionCookie={token}
              />
            </Item>
            {/* Show Category */}
            <ShowSubSubCategory
              subSubCategories={sub_subcategories}
              getSessionCookie={token}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default withAdminAuth(SubSubCategory);

export const getServerSideProps = async ({ req }) => {
  const isServerSide = "isServerSide";

  const getSessionCookie = getCookie(req, isServerSide);
  const getUser = JSON.parse(getCurrentUser(req, isServerSide));

  //Fetch sub categories
  const { data: subCategories } = await client.query({
    query: GET_SUBCATEGORIES,
    context: {
      headers: {
        Authorization: `JWT ${getSessionCookie}`,
      },
    },
  });

  // Fetch sub sub categories
  const { data } = await client.query({
    query: GET_SUB_SUBCATEGORIES,
    fetchPolicy: "network-only",
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
      sub_categories: subCategories.subCategories.edges,
      sub_subcategories: data.subSubCategories.edges,
      token: getSessionCookie,
      currentUser: getUser,
    },
  };
};
