import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import withAdminAuth from "../../../../components/Dashboard/PrivateRoute/withAdminAuth";
import getCurrentUser from "../../../../utils/getCurrentUser";
import getCookie from "../../../../utils/getCookie";
import { useRouter } from "next/router";

const footerLinkEdit = ({ token, currentUser }) => {
  const router = useRouter();
  const { footerLinkId } = router.query;
  const link = rows.find((row) => row.sl === parseInt(footerLinkId));

  return (
    <Paper sx={{ p: 3 }} component="form">
      <Box sx={{ textAlign: "center" }}>
        <Typography sx={{ color: "#6c757d", fontSize: "14px" }}>
          Update Footer Link
        </Typography>
      </Box>
      <Grid container spacing={2} sx={{ alignItems: "center" }}>
        <Grid item xs={12} sm={6} sx={{ my: { xs: 1, sm: 2, md: 3 } }}>
          <TextField
            size="small"
            fullWidth
            id="outlined-required"
            label="Link Title"
            type="text"
            placeholder="Enter Link Title"
            defaultValue={link?.title}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            size="small"
            fullWidth
            id="outlined-required"
            label="Link Url"
            type="text"
            placeholder="Enter Link Url"
            defaultValue={link?.url}
          />
        </Grid>
      </Grid>
      <Button variant="contained" sx={{ my: 1 }}>
        Save
      </Button>
    </Paper>
  );
};

export default withAdminAuth(footerLinkEdit);

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

const rows = [
  { sl: 1, title: "Ehsan Map", url: "https://ehsanmap.com/" },
  { sl: 2, title: "Ehsan Blog", url: "https://ehsanblog.com/" },
  { sl: 3, title: "Ehsan News", url: "http://ehsannews.com/	" },
  { sl: 4, title: "Ehsan Software", url: "https://www.ehsansoftware.com/" },
  { sl: 5, title: "Ehsan Marketing", url: "https://ehsanmarketing.com/" },
  {
    sl: 6,
    title: "World Ehsan Email",
    url: "https://mail.worldehsan.com/mail/",
  },
  { sl: 7, title: "Ehsan Live (Upcoming…)", url: "http://worldehsan.live/" },
  { sl: 8, title: "Ehsan RTC (Upcoming…)", url: "http://worldehsan.live/" },
  { sl: 9, title: "Ehsan Calling (Upcoming…)", url: "http://worldehsan.live/" },
  {
    sl: 10,
    title: "Ehsan Messenger (Upcoming…)",
    url: "http://worldehsan.live/	",
  },
];
