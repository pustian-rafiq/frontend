import { Box, Grid, TextField, Typography } from "@mui/material";
import React, { useState, useRef } from "react";
import FindReference from "../../../components/Dashboard/AdminDashboard/ConsumerInfo/FindReference";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { ReferenceData } from "../../../utility/ReferenceData";
import getCookie from "../../../utils/getCookie";
import getCurrentUser from "../../../utils/getCurrentUser";
import withAdminAuth from "../../../components/Dashboard/PrivateRoute/withAdminAuth";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));
const Input = styled("input")({
  display: "none",
});
const FindByReference = () => {
  const ref = useRef();
  const [searchText, setSearchText] = useState("");
  const [showData, setShowData] = useState([]);
  var findData = [];
  const searchHandler = (e) => {
    setSearchText(e.target.value);
    const searchValue = e.target.value;
    console.log(ref.current.value);
    findData = ReferenceData.filter((search) => {
      return search.cin.toLowerCase().includes(searchValue.toLowerCase());
    });
    setShowData(findData);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid item xs={8} md={12}>
          <Item>
            <Grid container spacing={1} sx={{ ml: 5, pt: 5, pb: 5 }}>
              <Grid item xs={10} md={9}>
                <TextField
                  fullWidth
                  size="small"
                  id="fullWidth"
                  label="Search by CIN"
                  onChange={searchHandler}
                  value={searchText}
                  ref={ref}
                />
              </Grid>
              <Grid item xs={3} md={1}>
                <Typography
                  sx={{
                    px: 2,
                    py: 1,
                    background: "#F0F0FA",
                    borderRadius: "5px",
                  }}
                  onClick={searchHandler}
                >
                  Search
                </Typography>
              </Grid>
            </Grid>
          </Item>
        </Grid>
      </Grid>
      {showData.length > 0 ? (
        <FindReference showCommisionData={showData} />
      ) : (
        ""
      )}
    </Box>
  );
};

export default withAdminAuth(FindByReference);

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
