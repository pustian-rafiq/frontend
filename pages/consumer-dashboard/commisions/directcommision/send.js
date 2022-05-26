import React, { useState, useRef } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import styles from "../../../../components/Dashboard/Commisions/Commision.module.css";
import SearchData from "../../../../components/Dashboard/Commisions/DirectGiveCommison/SearchData";
import withConsumerAuth from "../../../../components/Dashboard/PrivateRoute/withConsumerAuth";
import getCookie from "../../../../utils/getCookie";
import getCurrentUser from "../../../../utils/getCurrentUser";
import useSearchConsumers from "../../../../apolloClient/queries/consumer/searchConsumerQuery";

const SendCommision = () => {
  const ref = useRef();
  const [searchConsumer, setSearchConsumer] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  var findData = [];

  // Consumer Search handler
  // const searchConsumerHandler = async () => {
  //   const searchData = useSearchConsumers(searchText)
  //   await searchData.then((res) => {
  //     setSearchConsumer(res?.data?.searchConsumer?.edges)
  //     setPage(0);
  //   }).catch((err) => {
  //     console.log(err)
  //   })
  // }

  const serachHandler = async () => {
    setLoading(true);
    const searchData = useSearchConsumers(ref.current.value);
    await searchData
      .then((res) => {
        setLoading(res?.loading);
        setSearchConsumer(res?.data?.searchConsumer?.edges);
        if (res?.data?.searchConsumer?.edges?.length === 0) {
          setMessage("No Result Found!");
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setMessage(`Something went wrong! ${err.message}`);
      });
    // console.log("searchConsumer:::", searchConsumer);
    // setShowData(findData);
    // console.log("searchData:::", searchData);
  };

  // console.log("CommisionData", searchConsumer);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <div className={styles.searchTitle}>
        Search by CIN or Phone(without country code like 17XXXXXXXX)
      </div>
      <Grid container>
        <Grid item xs={10} md={11}>
          <div className={styles.searchSection}>
            <div className={styles.searchInput}>
              <input type="text" placeholder="Ex.17xxxxxxxx or CIN" ref={ref} />
            </div>
          </div>
        </Grid>
        <Grid item xs={2} md={1} className={styles.searchLabel}>
          <div onClick={serachHandler}>Search</div>
        </Grid>
      </Grid>
      {loading ? (
        "Searching! Please Wait..."
      ) : searchConsumer.length > 0 ? (
        <SearchData showCommisionData={searchConsumer} />
      ) : (
        message
      )}
    </Box>
  );
};
export default withConsumerAuth(SendCommision);

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

  return {
    props: {
      token: getSessionCookie,
      currentUser: getUser,
    },
  };
};
