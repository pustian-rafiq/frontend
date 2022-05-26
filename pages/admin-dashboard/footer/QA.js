import {
  Box,
  Button,
  Grid,
  InputLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import dynamic from "next/dynamic";
import withAdminAuth from "../../../components/Dashboard/PrivateRoute/withAdminAuth";
import getCookie from "../../../utils/getCookie";
import getCurrentUser from "../../../utils/getCurrentUser";
const CKEditor = dynamic(
  import("../../../components/Dashboard/AdminDashboard/CkEditor/CkEditor.js"),
  {
    ssr: false,
  }
);

const QA = ({ token, currentUser }) => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography
        sx={{
          color: "#6c757d",
          textAlign: "center",
          fontSize: "14px",
          fontWeight: 400,
          mb: 2,
        }}
      >
        Question & Answer (Q&A)
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
          <TextField
            size="small"
            fullWidth
            multiline
            sx={{ mb: 2 }}
            id="outlined-required"
            label="Question"
            placeholder="Enter Question"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <TextField
            size="small"
            fullWidth
            sx={{ mb: 2 }}
            id="outlined-required"
            label="Position"
            type="number"
            placeholder="Enter Position"
          />
        </Grid>
      </Grid>

      <Box sx={{ mb: 2 }}>
        <InputLabel sx={{ fontSize: "14px", color: "#34395e" }}>
          Description of Q&A
        </InputLabel>
        <CKEditor />
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Button variant="contained">Save</Button>
      </Box>
    </Paper>
  );
};

export default withAdminAuth(QA);

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
