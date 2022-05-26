import { useQuery } from "@apollo/client";
import { GET_DETAILS_INFORMATION } from "../../apolloClient/queries/adminDashboard/DeailsQuery";
import AdminDashboard from "../../components/Dashboard/AdminDashboard/AdminDashboard";
import withAdminAuth from "../../components/Dashboard/PrivateRoute/withAdminAuth";
import getCookie from "../../utils/getCookie";
import getCurrentUser from "../../utils/getCurrentUser";
import Image from "next/image"
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Grid } from "@mui/material";

const AdminDashboardPage = ({ token, currentUser }) => {
  // Fetch all consumers count
  const { data, loading } = useQuery(GET_DETAILS_INFORMATION)
  if (loading) {
    return <div>
      <Grid container spacing={1}>
        <Grid item md={6}>
        <Skeleton variant="rectangular" width={435} height={220} />
        </Grid>
        <Grid item md={6}>
        <Skeleton variant="rectangular" width={435} height={220} />
        </Grid>
        <Grid item md={12} sx={{mt:3}}>
        <Skeleton variant="rectangular" layout="fill" height={500} />
        </Grid>

      </Grid>
    </div>
  }
  return <AdminDashboard details={data} />;
};

export default withAdminAuth(AdminDashboardPage);

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

  //IMPORTANT:: Every pages from admin dashboard must return "token" and "currentUser" form "getServerSideProps" which is used in "withAdminAuth" HOC(Higher order Component)!
  return {
    props: {
      token: getSessionCookie,
      currentUser: getUser,
    },
  };
};
