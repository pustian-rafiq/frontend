//This Layout is used in consumer dashboard only...
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { mainListItems } from "./listItems";
import { useContext, useEffect, useRef, useState } from "react";
import {
  Avatar,
  ClickAwayListener,
  Divider,
  Grow,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Tooltip,
} from "@mui/material";
import Head from "next/head";
import Customization from "./Customization/Customization";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import useWindowDimensions from "../../utils/useWindowDimensions";
import Image from "next/image";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SettingsOutlined from "@mui/icons-material/SettingsOutlined";
import Logout from "@mui/icons-material/Logout";
import { GlobalContext } from "../../pages/_app";
import useLoggedUser from "../../apolloClient/queries/ConsumerDashboard/Profile/LoggedUserDetails";

const drawerWidth = 240;

function Copyright(props) {
  return (
    <Typography
      component={"div"}
      color="#98a6ad"
      fontSize={"11px"}
      fontWeight={600}
      textTransform="uppercase"
      align="center"
      {...props}
    >
      {"© "}
      2012 - {new Date().getFullYear()}
      <a href="https://ehsanmarketing.com/" style={{ color: "#6777ef" }}>
        {" "}
        EHSAN MARKETING{" "}
      </a>
      DEVELOPED BY{" "}
      <a href="https://www.ehsansoftware.com/" style={{ color: "#6777ef" }}>
        {" "}
        EHSAN SOFTWARE{" "}
      </a>
      (A SISTER CONCERN OF{" "}
      <a href="https://worldehsan.org/" style={{ color: "#6777ef" }}>
        {" "}
        EHSAN Group{" "}
      </a>
      ) ALL RIGHTS RESERVED.
    </Typography>
  );
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: "0.7s",
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: "0.7s",
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiListSubheader-root": {
    transition: "0.7s",
  },
  "& .MuiAccordionSummary-root": {
    transition: "0.7s",
  },
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: "0.7s",
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: "0.7s",
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
      "& .MuiListSubheader-root": {
        color: "#45b9e0",
        marginTop: "10px",
        marginBottom: "10px",
        lineHeight: "3px",
        fontSize: "0",
        transition: "0.7s",
      },
      "& .MuiAccordionSummary-root": {
        color: "rgba(255,255,255,0)",
        left: -30,
        transition: "0.7s",
      },
      "& .MuiAccordionSummary-expandIconWrapper": {
        color: "rgba(255,255,255,0)",
        transition: "0.7s",
      },
    }),
  },
  "& .MuiToolbar-root": {
    backgroundColor: "#ffffff",
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;",
  },
}));

const mdTheme = createTheme();

const DashboardLayout = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [open, setOpen] = useState(false);
  const { height, width } = useWindowDimensions();
  const router = useRouter();
  const prevOpen = useRef(open);
  const anchorRef = useRef(null);

  const { token, currentUser, globalContextHandler } =
  useContext(GlobalContext);

  // Fetch looged user details
const {data,error,loading} = useLoggedUser(token)
 

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const logoutHandler = async () => {
    const res = await axios.post("/api/auth/consumer/logout");
    router.push("/");
    toast.success("Successfully logout!");
  };

  useEffect(() => {
    width < 600 ? setDrawerOpen(false) : setDrawerOpen(true);
  }, [width]);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  // if(loading){
  //   return <div>Loadingg22......</div>
  // }
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <Head>
          <title>Dashboard</title>
          <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
        </Head>
        <CssBaseline />
        <AppBar
          elevation={0}
          position="absolute"
          open={drawerOpen}
          sx={{
            backgroundColor: "#ffffff",
            color: "#000000",
            boxShadow:
              "rgba(0, 0, 0, 0.04) 0px 4px 0px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
          }}
        >
          <Toolbar
            sx={
              {
                // pr: "24px", // keep right padding when drawer closed
              }
            }
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="Open drawer"
              onClick={toggleDrawer}
              sx={{
                // marginRight: "36px",
                ...(drawerOpen && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            {drawerOpen ? (
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1, ml: "20px" }}
              >
                Dashboard
              </Typography>
            ) : (
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <img src="/images/logo.png" alt="Logo" width={30} height={30} />
                <Link href="/">
                  <Typography
                    textTransform={"uppercase"}
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{
                      flexGrow: 1,
                      fontSize: "15px",
                      fontWeight: 700,
                      color: "#000000",
                      ml: 1,
                      ":hover": {
                        color: "#6777ef",
                        cursor: "pointer",
                      },
                    }}
                  >
                    Ehsan Marketing
                  </Typography>
                </Link>
              </Box>
            )}
            <IconButton
              color="inherit"
              sx={{ mr: 2, display: { xs: "none", md: "block" } }}
            >
              <Badge badgeContent={4} color="success">
                <EmailOutlinedIcon />
              </Badge>
            </IconButton>
            <IconButton
              color="inherit"
              sx={{ mr: 2, display: { xs: "none", md: "block" } }}
            >
              <Badge badgeContent={4} color="success">
                <NotificationsNoneOutlinedIcon />
              </Badge>
            </IconButton>

            {/* =============================================== */}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton
                  sx={{ p: 0 }}
                  ref={anchorRef}
                  id="composition-button"
                  aria-controls={open ? "composition-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleToggle}
                >
                  <Avatar src={data?.me?.consumers?.photo} />
                </IconButton>
              </Tooltip>
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom-start"
                          ? "left top"
                          : "left bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={open}
                          id="composition-menu"
                          aria-labelledby="composition-button"
                          onKeyDown={handleListKeyDown}
                        >
                          <MenuItem onClick={handleClose}>
                            <Typography
                              component={"span"}
                              textAlign="center"
                              sx={{ fontSize: "12px", marginLeft: "5px" }}
                            >
                              {data?.me?.consumers?.user?.email}
                            </Typography>
                          </MenuItem>
                          <Link href={"/consumer-dashboard/profile"}>
                            <MenuItem onClick={handleClose}>
                              <PersonOutlineIcon sx={{ fontSize: "20px" }} />
                              <Typography
                                component={"span"}
                                textAlign="center"
                                sx={{ fontSize: "13px", marginLeft: "5px" }}
                              >
                                Profile
                              </Typography>
                            </MenuItem>
                          </Link>
                          <Link href={"/consumer-dashboard/profile/settings"}>
                            <MenuItem onClick={handleClose}>
                              <SettingsOutlined sx={{ fontSize: "18px" }} />
                              <Typography
                                component={"span"}
                                textAlign="center"
                                sx={{ fontSize: "13px", marginLeft: "5px" }}
                              >
                                Setting
                              </Typography>
                            </MenuItem>
                          </Link>
                          <Divider />
                          <MenuItem onClick={logoutHandler}>
                            <Logout
                              sx={{ fontSize: "15px", marginLeft: "5px" }}
                            />
                            <Typography
                              component={"span"}
                              textAlign="center"
                              sx={{
                                fontSize: "13px",
                                marginLeft: "5px",
                                color: "red",
                              }}
                            >
                              Logout
                            </Typography>
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </Box>
            {/* =============================================== */}
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          open={drawerOpen}
          sx={{ height: "100vh", overflow: "auto" }}
        >
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              position: "fixed",
              zIndex: 5,
              "&.MuiToolbar-root": {
                paddingRight: 6,
                pl: 2,
              },
            }}
          >
            <img src="/images/logo.png" alt="Logo" width={30} height={30} />
            <Link href="/">
              <Typography
                textTransform={"uppercase"}
                sx={{
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#000000",
                  ml: 1,
                  ":hover": {
                    color: "#6777ef",
                    cursor: "pointer",
                  },
                }}
              >
                Ehsan Marketing
              </Typography>
            </Link>

            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <List component="nav" sx={{ mt: 10 }}>
            {mainListItems}
          </List>
        </Drawer>
        <Box
          sx={{
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
            background: "#F6F6F6",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "90vh",
            }}
          >
            <Container component="main" sx={{ pt: 12, pb: 2 }} maxWidth="lg">
              {children}
            </Container>
          </Box>

          <Box
            component="footer"
            sx={{
              py: 3,
              px: 2,
              mt: "auto",
            }}
          >
            <Container maxWidth="lg">
              <Copyright />
              <Customization />
            </Container>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default DashboardLayout;

//This Layout is used in consumer dashboard only...
