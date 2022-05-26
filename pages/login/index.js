import React, { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import axios from "axios";

//toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// utils
import { globalCookie } from "../../utils/globalCookie";

import {
  Box,
  Button,
  Checkbox,
  Divider,
  Grid,
  OutlinedInput,
  Paper,
  Typography,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserLock,
  faEnvelope,
  faKey,
  faLock,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

import Title from "../../components/Header/Title";
import { GlobalContext } from "../_app";

// css
import logincss from "../../styles/Login.module.css";
import Image from "next/image";

const Login = ({ token }) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const globalData = useContext(GlobalContext);
  const [pwd, setPwd] = useState("");
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  //checkbox
  const [checked, setChecked] = useState(false);

  // consumer login handler
  const cosumerLoginHandler = async (data) => {
    const newData = {};

    let regex = new RegExp("[a-z0-9]+@worldehsan.com");

    let isEmail = regex.test(data.username);

    if (isEmail) {
      newData.email = data.username;
      newData.password = data.password;
    } else {
      newData.username = data.username;
      newData.password = data.password;
    }

    const res = await axios.post("/api/auth/consumer/login", newData);
    if (res?.data?.data?.tokenAuth?.errors == null) {
      router.push("/");
      toast.success("Login successfull",{
        position: "top-right",
        autoClose: 2000,
      });
    } else {
      toast.error(
        `${res?.data?.data?.tokenAuth?.errors?.nonFieldErrors[0].message}`,
        {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };

  function onChange(value) {
    console.log("Captcha value:", value);
  }

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <>
      <Title>User Login</Title>
      <Box
        sx={{
          backgroundImage: "url('/images/svg/loginbg.svg')",
          height: "130vh",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Box>
          <Grid container spacing={2}>
            <Grid xs={2} sm={3} md={5} lg={4} item></Grid>
            <Grid xs={8} sm={9} md={4} lg={4} item>
              <Paper
                elevation={3}
                sx={{
                  height: "480px",
                  top: "50px",
                  position: "absolute",
                  width: "400px",
                  backgroundImage:
                    "linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)",
                }}
                className={logincss.login_responsive}
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

                  <Typography
                    variant="h5"
                    sx={{
                      margin: "0px 0px 0px 8px",
                      fontSize: "23px",
                      fontWeight: "bold",
                    }}
                  >
                    Login
                  </Typography>
                </Box>

                {/* login form  */}
                <form
                  onSubmit={handleSubmit(cosumerLoginHandler)}
                  style={{ padding: "0px 25px" }}
                >
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{
                        marginBottom: "0px",
                      }}
                    >
                      <FontAwesomeIcon icon={faEnvelope} /> Email/CIN
                    </Typography>{" "}
                    {/* email or CIN  */}
                    <OutlinedInput
                      id="email"
                      style={{
                        width: "100%",
                        padding: "0px 0px",
                        marginTop: "13px",
                        border: "0px",
                        borderRadius: "5px",
                        backgroundColor: "#fff",
                      }}
                      size="small"
                      {...register("username")}
                      required
                      placeholder="Email/CIN"
                    />
                    <br />
                    <br />
                    {/* password   */}
                    <Typography variant="body1">
                      <FontAwesomeIcon icon={faKey} /> Password
                    </Typography>{" "}
                    <Box className="pwd-container">
                      <OutlinedInput
                        name="pwd"
                        type={isRevealPwd ? "text" : "password"}
                        onChange={(e) => setPwd(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "0px 0px",
                          marginTop: "13px",
                          border: "0px",
                          borderRadius: "5px",
                          backgroundColor: "#fff",
                        }}
                        size="small"
                        {...register("password")}
                        required
                        placeholder="password"
                      />

                      <Image
                        src={
                          isRevealPwd
                            ? "/images/password2.png "
                            : "/images/password.png"
                        }
                        onClick={() =>
                          setIsRevealPwd((prevState) => !prevState)
                        }
                        height={15}
                        width={15}
                      />
                    </Box>
                    {/* input field for checkbox  */}
                    <Box className={logincss.checkbox_input}>
                      <Box
                        className={logincss.remember}
                        sx={{ display: "flex" }}
                      >
                        {/* <input type="checkbox" /> */}
                        <Checkbox
                          checked={checked}
                          onChange={handleChange}
                          inputProps={{ "aria-label": "controlled" }}
                          sx={{
                            color: "#dddddd",
                            height: "3px",
                            width: "3px",
                            backgroundColor: "#fff",
                          }}
                        />
                        <Typography variant="body2" sx={{ marginLeft: "8px" }}>
                          Remember Me
                        </Typography>
                      </Box>

                      <Box className={logincss.password_forgot}>
                        <Link href="/forgot-password">Forget Password</Link>
                      </Box>
                    </Box>
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{
                        padding: "7px 28px",
                        borderRadius: "20px",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        color: "#fff",
                        fontSize: "13px",
                        border: "none",
                        margin: "30px auto",
                        display: "block",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faLock}
                        style={{ marginRight: "5px" }}
                      />
                      LOGIN
                    </Button>
                  </Box>
                </form>

                <Divider sx={{ m: "20px 0px 10px 0px" }} />

                <Box sx={{ fontSize: "13px", textAlign: "center" }}>
                  <Typography variant="body2">
                    Don't have an account yet ?{" "}
                    <Link href="/register">
                      <strong style={{ cursor: "pointer" }}>Resister</strong>
                    </Link>
                  </Typography>

                  <Link href="/">
                    <a>
                      <FontAwesomeIcon icon={faHome} /> Go Home
                    </a>
                  </Link>
                </Box>
              </Paper>
            </Grid>

            <Grid xs={2} md={3} sm={4} lg={4} item></Grid>
          </Grid>
        </Box>
      </Box>
      <ToastContainer />
    </>
  );
};

export const getStaticProps = async () => {
  return {
    props: {
      token: globalCookie,
    },
  };
};

export default Login;

// individual page layout
Login.getLayout = function pageLayout(page) {
  return <>{page}</>;
};
