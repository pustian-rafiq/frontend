import { GET_COUNTRIES } from "../../../apolloClient/queries/allCountryQuery";
import withAdminAuth from "../../../components/Dashboard/PrivateRoute/withAdminAuth";
import getCookie from "../../../utils/getCookie";
import getCurrentUser from "../../../utils/getCurrentUser";
import client from "../../../apolloClient/configuration/apolloConfig";


const addOrUpdateTax = ({ countries, token, currentUser }) => {
  return (
    <>
      <h1>Hello</h1>
      {/* <AddOrUpdateTax countries={countries} action="New" /> */}
    </>
  );
};

export default withAdminAuth(addOrUpdateTax);

export const getServerSideProps = async ({ req }) => {
  const isServerSide = "isServerSide";

  const getSessionCookie = getCookie(req, isServerSide);
  const getUser = JSON.parse(getCurrentUser(req, isServerSide));
  const { data } = await client.query({ query: GET_COUNTRIES });

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
      countries: data.countries,
      token: getSessionCookie,
      currentUser: getUser,
    },
  };
};
