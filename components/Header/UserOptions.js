import React, { useState, useEffect, useContext, useRef } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

//toast
import "react-toastify/dist/ReactToastify.css";

// mui components
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuList from "@mui/material/MenuList";

// mui icons
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Login from "@mui/icons-material/Login";
import DashboardIcon from "@mui/icons-material/Dashboard";
// import { currentUser, setCurrentUser } from "../../utils/useCurrentUser";

import { GlobalContext } from "../../pages/_app";
import { toast } from "react-toastify";
import { Typography } from "@mui/material";

const UserOptions = () => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const { token, currentUser, globalContextHandler } =
    useContext(GlobalContext);
  const router = useRouter();
  const prevOpen = useRef(open);

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

  // return focus to the button when we transitioned from !open -> open
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  // logout handler
  const logoutHandler = async () => {
    const logoutRes = await axios.post("/api/auth/consumer/logout");
    if (logoutRes) {
      globalContextHandler(null);
      toast.success("successfully logout");
    }
    router.push("/");
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="User Seetings">
          <IconButton
            size="small"
            sx={{ marginLeft: { xs: "1px", md: "12px" } }}
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? "composition-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <Avatar
              sx={{ width: { xs: 22, md: 30 }, height: { xs: 22, md: 30 } }}
              src={
                token !== null && currentUser
                  ? currentUser?.consumers?.photo
                  : "/images/consumer.png"
              }
            />
          </IconButton>
        </Tooltip>
      </Box>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        sx={{ marginTop: "7px !important" }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
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
                  {/* {token !== null && currentUser && (
                    <MenuItem>
                      {" "}
                      <Typography
                        variant="body1"
                        align="center"
                        sx={{ color: "#2ec4d8" }}
                      >
                        {currentUser?.consumers?.isMaster
                          ? "Master Consumer"
                          : currentUser?.isStaff
                          ? "Admin"
                          : "Consumer"}
                      </Typography>{" "}
                    </MenuItem>
                  )} */}

                  {/* {token !== null && currentUser && (
                    <MenuItem>
                      {" "}
                      <Typography variant="body2" sx={{ color: "#2ec4d8" }}>
                        {currentUser?.email}
                      </Typography>
                    </MenuItem>
                  )} */}

                  <Link
                    href={
                      currentUser?.isStaff
                        ? "/admin-dashboard/profile"
                        : "/consumer-dashboard/profile"
                    }
                  >
                    <MenuItem>
                      <Avatar
                        sx={{
                          width: "25px !important",
                          height: "25px !important",
                          marginRight: "0px !important",
                          marginRight: "10px",
                        }}
                      />{" "}
                      My Profile
                    </MenuItem>
                  </Link>

                  {token !== null && currentUser && (
                    <Link
                      href={
                        currentUser.isStaff
                          ? "/admin-dashboard"
                          : "/consumer-dashboard"
                      }
                      onClick={handleClose}
                    >
                      <MenuItem>
                        <ListItemIcon>
                          <DashboardIcon fontSize="small" />
                        </ListItemIcon>
                        Dashboard
                      </MenuItem>
                    </Link>
                  )}

                  <Link
                    href={
                      currentUser?.isStaff
                        ? "/admin-dashboard/profile/settings"
                        : "/consumer-dashboard/profile/settings"
                    }
                  >
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <Settings fontSize="small" />
                      </ListItemIcon>
                      Settings
                    </MenuItem>
                  </Link>

                  <Divider />

                  {token == null && (
                    <Link href="/register" onClick={handleClose}>
                      <MenuItem>
                        <ListItemIcon>
                          <PersonAdd fontSize="small" />
                        </ListItemIcon>
                        Register
                      </MenuItem>
                    </Link>
                  )}

                  {token == null && (
                    <Link href="/login" onClick={handleClose}>
                      <MenuItem>
                        <ListItemIcon>
                          <Login fontSize="small" />
                        </ListItemIcon>
                        Login
                      </MenuItem>
                    </Link>
                  )}

                  {token !== null && (
                    <MenuItem
                      onClick={(event) => {
                        logoutHandler();
                        handleClose(event);
                      }}
                    >
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  )}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default UserOptions;
