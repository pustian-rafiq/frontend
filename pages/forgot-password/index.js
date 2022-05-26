import { Box, Button, Divider, Grid, Paper } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserLock,
  faEnvelope,
  faLocationDot,
  faPhone,
  faLock,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Title from "../../components/Header/Title";

const ForgotPassword = () => {
  const handle_forget = () => {
    console.log("ami forget password");
  };

  return (
    <div>
      <Title>Forgot Password</Title>
      <Box
        sx={{
          backgroundImage: "url('/images/svg/loginbg.svg')",
          height: "100vh",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Box>
          <Grid container spacing={2}>
            <Grid md={5} lg={4}></Grid>
            <Grid xs={12} md={4} lg={4}>
              <Paper
                elevation={3}
                sx={{
                  height: "500px",
                  top: "50px",
                  position: "absolute",
                  width: "400px",
                  backgroundImage:
                    "linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)",
                }}
              >
                {/* header of login pages  */}

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginY: "40px",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faUserLock}
                    style={{ fontSize: "23px" }}
                  />
                  <h3 style={{ margin: "0px 0px 0px 8px", fontSize: "23px" }}>
                    Forget Password
                  </h3>
                </Box>

                {/* email input form  */}

                <form onSubmit={handle_forget} style={{ padding: "0px 25px" }}>
                  <label htmlFor="email">
                    <FontAwesomeIcon icon={faEnvelope} /> Username/CIN
                  </label>{" "}
                  <br />
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter Username/CIN"
                    style={{
                      width: "97%",
                      padding: "10px 0px 10px 10px",
                      marginTop: "10px",
                      border: "0px",
                      borderRadius: "5px",
                    }}
                  />
                  <br />
                  <br />
                  {/* for password section  */}
                  <label htmlFor="location">
                    <FontAwesomeIcon icon={faLocationDot} /> Location
                  </label>{" "}
                  <br />
                  <select
                    name="cars"
                    id="cars"
                    placeholder="Enter Phone Location"
                    style={{
                      width: "98%",
                      padding: "10px 0px 10px 10px",
                      marginTop: "10px",
                      border: "0px",
                      borderRadius: "5px",
                      backgroundColor: "#fff",
                    }}
                  >
                    <option value="">--select--</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                  </select>
                  <br />
                  <br />
                  <label htmlFor="phone">
                    <FontAwesomeIcon icon={faPhone} /> Phone
                  </label>{" "}
                  <br />
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="01XXXXX"
                    style={{
                      width: "98%",
                      padding: "10px 0px 10px 10px",
                      marginTop: "10px",
                      border: "0px",
                      borderRadius: "5px",
                    }}
                  />
                  <Divider sx={{ m: "30px 0px 0px 0px" }} />
                  <Box sx={{ fontSize: "13px", textAlign: "center" }}>
                    <p>
                      Don't have an account yet ?{" "}
                      <Link href="/login">
                        <a>
                          <b>Sign In</b>
                        </a>
                      </Link>
                    </p>

                    <Link href="/">
                      <a>
                        <FontAwesomeIcon icon={faHome} /> Go Home
                      </a>
                    </Link>
                  </Box>
                  <button
                    type="submit"
                    style={{
                      padding: "10px 20px",
                      borderRadius: "25px",
                      backgroundColor: "rgba(0,0,0,0.5)",
                      color: "#fff",
                      fontSize: "15px",
                      border: "none",
                      margin: "20px auto",

                      display: "block",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      style={{ marginRight: "5px" }}
                    />
                    SEND MESSAGE
                  </button>
                </form>
              </Paper>
            </Grid>

            <Grid md={3} lg={4}></Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default ForgotPassword;

ForgotPassword.getLayout = function pageLayout(page) {
  return <>{page}</>;
};
