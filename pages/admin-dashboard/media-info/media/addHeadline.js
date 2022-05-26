import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
} from "@mui/material";
import dynamic from "next/dynamic";
import withAdminAuth from "../../../../components/Dashboard/PrivateRoute/withAdminAuth.js";
import getCookie from "../../../../utils/getCookie.js";
import getCurrentUser from "../../../../utils/getCurrentUser.js";

const CKEditor = dynamic(
  import(
    "../../../../components/Dashboard/AdminDashboard/CkEditor/CkEditor.js"
  ),
  {
    ssr: false,
  }
);

const addHeadline = ({ token, currentUser }) => {
  return (
    <Paper sx={{ p: 3, m: 2 }}>
      <Box component="form" autoComplete="off">
        <Box sx={{ mb: 3 }}>
          <TextField fullWidth size="small" id="fullWidth" label="Author" />
        </Box>
        <Box sx={{ mb: 3 }}>
          <TextField fullWidth size="small" id="fullWidth" label="Headline" />
        </Box>
        <Box sx={{ mb: 3 }}>
          <InputLabel sx={{ fontSize: "14px", color: "#34395e" }}>
            Footer Text
          </InputLabel>
          <CKEditor />
        </Box>
        <Box sx={{ mb: 3 }}>
          <InputLabel sx={{ fontSize: "14px", color: "#34395e" }}>
            Image
          </InputLabel>
          <Box
            sx={{
              border: "1px solid #b1b1b1cc",
              p: 1.5,
              borderRadius: "5px",
              ":hover": {
                border: "1px solid #000000",
              },
            }}
          >
            <Input accept="image/*" id="icon-button-file" type="file" />
          </Box>
        </Box>
        <Box sx={{ mb: 3 }}>
          <InputLabel sx={{ fontSize: "14px", color: "#34395e" }}>
            Description
          </InputLabel>
          <CKEditor />
        </Box>
        <Box sx={{ mb: 3 }}>
          <InputLabel sx={{ fontSize: "14px", color: "#34395e" }}>
            Advertise Image 1
          </InputLabel>
          <Box
            sx={{
              border: "1px solid #b1b1b1cc",
              p: 1.5,
              borderRadius: "5px",
              ":hover": {
                border: "1px solid #000000",
              },
            }}
          >
            <Input accept="image/*" id="icon-button-file" type="file" />
          </Box>
        </Box>
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            size="small"
            id="fullWidth"
            label="Advertise Link 1"
          />
        </Box>
        <Box sx={{ mb: 3 }}>
          <InputLabel sx={{ fontSize: "14px", color: "#34395e" }}>
            Advertise Image 2
          </InputLabel>
          <Box
            sx={{
              border: "1px solid #b1b1b1cc",
              p: 1.5,
              borderRadius: "5px",
              ":hover": {
                border: "1px solid #000000",
              },
            }}
          >
            <Input accept="image/*" id="icon-button-file" type="file" />
          </Box>
        </Box>
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            size="small"
            id="fullWidth"
            label="Advertise Link 2"
          />
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <Button variant="contained">Save</Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default withAdminAuth(addHeadline);

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
