import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import { LineChart } from "./LineChat";
import PieChart from "./PieChart";

const ConsumerDashboard = ({ ConsumerDetails }) => {
  return (
    <Box>
      <Grid container spacing={1}>
        {/* ============================================ */}
        <Grid item xs={12} md={4} lg={4}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 170,
            }}
          >
            <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Grid container spacing={1}>
                <Grid item xs={6} sm={6} md={7}>
                  <Typography
                    component="p"
                    variant="h4"
                    sx={{ fontSize: "16px", mt: 1, fontWeight: "bold" }}
                  >
                    Total Consumer
                  </Typography>
                  <Typography
                    component="p"
                    variant="h4"
                    sx={{ fontSize: "16px", mt: 2, fontWeight: "bold" }}
                  >
                    {ConsumerDetails?.me?.consumers?.consumerreftree
                      ?.ref1Count +
                      ConsumerDetails?.me?.consumers?.consumerreftree
                        ?.ref2Count +
                      ConsumerDetails?.me?.consumers?.consumerreftree
                        ?.rootCount}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: "12px", sm: "14px", md: "15px" },
                      mt: 1,
                    }}
                  >
                    Reference-1:{" "}
                    {ConsumerDetails?.me?.consumers?.consumerreftree?.ref1Count}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: "12px", sm: "14px", md: "15px" },
                      mt: 1,
                    }}
                  >
                    Reference-2:{" "}
                    {ConsumerDetails?.me?.consumers?.consumerreftree?.ref2Count}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6} md={5} sx={{ mb: 2 }}>
                  <Image
                    src="/images/consumer-image.png"
                    width="170"
                    height="170"
                    style={{ paddingBottom: "20px" }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 170,
            }}
          >
            <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Typography
                component="p"
                variant="h4"
                sx={{
                  fontSize: "16px",
                  mt: 1,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Create References
              </Typography>
              <Typography
                sx={{ fontSize: { xs: "12px", sm: "14px", md: "15px" }, mt: 3 }}
              >
                Reference-1: {ConsumerDetails?.me?.consumers?.leftRefer}
              </Typography>
              <Typography
                sx={{ fontSize: { xs: "12px", sm: "14px", md: "15px" }, mt: 1 }}
              >
                Reference-2: {ConsumerDetails?.me?.consumers?.rightRefer}
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 170,
            }}
          >
            <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Typography
                component="p"
                variant="h4"
                sx={{
                  fontSize: "16px",
                  mt: 1,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Account Info.
              </Typography>
              <Typography
                sx={{ fontSize: { xs: "12px", sm: "14px", md: "15px" }, mt: 3 }}
              >
                Name: {ConsumerDetails?.me?.consumers?.user?.firstName}{" "}
                {ConsumerDetails?.me?.consumers?.user?.lastName}
              </Typography>
              <Typography
                sx={{ fontSize: { xs: "12px", sm: "14px", md: "15px" }, mt: 1 }}
              >
                CIN: {ConsumerDetails?.me?.consumers?.username}
              </Typography>
              {/* <Typography
                sx={{ fontSize: { xs: "10px", sm: "12px", md: "14px" }, mt: 1 }}
              >
                Password: 1111250
              </Typography> */}
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 170,
            }}
          >
            <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Typography
                component="p"
                variant="h4"
                sx={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  textAlign: "center",
                  mt: 1,
                }}
              >
                Available Balance
              </Typography>
              <Typography
                sx={{ fontSize: { xs: "12px", sm: "14px", md: "15px" }, mt: 1 }}
              >
                ৳0 ($0.057571000000000004)
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "12px", sm: "14px", md: "15px" },
                  mt: 1,
                  fontWeight: "700",
                }}
              >
                Total Income:
              </Typography>
              <Typography
                sx={{ fontSize: { xs: "12px", sm: "14px", md: "15px" }, mt: 1 }}
              >
                ৳ 0 ($0.057571000000000004)
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 170,
            }}
          >
            <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Typography
                component="p"
                variant="h4"
                sx={{
                  fontSize: "16px",
                  mt: 1,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Total Revenue Tax
              </Typography>
              <Typography
                sx={{ fontSize: { xs: "12px", sm: "14px", md: "15px" }, mt: 1 }}
              >
                ৳None ($None)
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "12px", sm: "14px", md: "15px" },
                  mt: 1,
                  fontWeight: "700",
                }}
              >
                Last Paid Tax
              </Typography>
              <Typography
                sx={{ fontSize: { xs: "12px", sm: "14px", md: "15px" }, mt: 1 }}
              >
                ৳ 0.00 ($0.00)
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 170,
            }}
          >
            <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Typography
                component="p"
                variant="h4"
                sx={{
                  fontSize: "16px",
                  mt: 1,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Email Info
              </Typography>
              <Typography
                sx={{ fontSize: { xs: "12px", sm: "14px", md: "15px" }, mt: 3 }}
              >
                Email: {ConsumerDetails?.me?.consumers?.user?.email}
              </Typography>
              {/* <Typography
                sx={{ fontSize: { xs: "10px", sm: "12px", md: "14px" }, mt: 1 }}
              >
                Password: 1111250
              </Typography> */}
              <Typography
                sx={{
                  fontSize: { xs: "12px", sm: "14px", md: "15px" },
                  mt: 1,
                  color: "#45B9E0",
                }}
              >
                <a href="https://mail.worldehsan.com/mail/" target={"_blank"}>
                  Got to mail
                </a>
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* ============================================== */}
        {/* Chart */}
        <Grid item xs={12} md={12} lg={12} sx={{ mb: 5 }}>
          <Paper
            sx={{
              p: 2,
            }}
          >
            <LineChart />
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={12} lg={12}>
          <Paper
            sx={{
              p: 2,
            }}
          >
            <PieChart ConsumerDetails={ConsumerDetails} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ConsumerDashboard;
