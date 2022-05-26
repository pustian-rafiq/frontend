import { useQuery } from "@apollo/client";
import { Grid, Skeleton } from "@mui/material";
import { GET_CONSUMER_DETAILS, GET_PROFILE_DETAILS } from "../../apolloClient/queries/ConsumerDashboard/Profile/ConsumerDetails";
import ConsumerDashboard from "../../components/Dashboard/ConsumerDashboard";
import withConsumerAuth from "../../components/Dashboard/PrivateRoute/withConsumerAuth";
import getCookie from "../../utils/getCookie";
import getCurrentUser from "../../utils/getCurrentUser";

const ConsumerDashboardPage = ({ token }) => {
  // Fetch logged in consumer details
  const { data: ConsumerDetails, loading: consumerLoading } = useQuery(GET_CONSUMER_DETAILS, {
    context: {
      headers: {
        Authorization: `JWT ${token}`,
      },
    },
    fetchPolicy: 'cache-and-network',
  })
  if (consumerLoading) {
    return <div>
      <Grid container spacing={1}>
        <Grid item md={4}>
          <Skeleton variant="rectangular" width={290} height={180} />
        </Grid>
        <Grid item md={4}>
          <Skeleton variant="rectangular" width={290} height={180} />
        </Grid>
        <Grid item md={4}>
          <Skeleton variant="rectangular" width={290} height={180} />
        </Grid>
        <Grid item md={4}>
          <Skeleton variant="rectangular" width={290} height={180} />
        </Grid>
        <Grid item md={4}>
          <Skeleton variant="rectangular" width={290} height={180} />
        </Grid>
        <Grid item md={4}>
          <Skeleton variant="rectangular" width={290} height={180} />
        </Grid>
        <Grid item md={12} sx={{ mt: 3 }}>
          <Skeleton variant="rectangular" layout="fill" height={500} />
        </Grid>
      </Grid>
    </div>
  }
  localStorage.removeItem("shopId")
  return <ConsumerDashboard ConsumerDetails={ConsumerDetails} />;
};

export default withConsumerAuth(ConsumerDashboardPage);

export const getServerSideProps = async ({ req }) => {
  const isServerSide = "isServerSide";

  const getSessionCookie = getCookie(req, isServerSide);
  const getUser = JSON.parse(getCurrentUser(req, isServerSide));
  if (getSessionCookie === null || !getUser || getUser.isStaff) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  //IMPORTANT:: Every pages from consumer dashboard must return "token" and "currentUser" form "getServerSideProps" which is used in "withConsumerAuth" HOC(Higher order Component)!
  return {
    props: {
      token: getSessionCookie,
      currentUser: getUser,
    },
  };
};
