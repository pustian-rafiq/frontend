import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

// mui components
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";
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
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { GET_SLIDER_NOTICE } from "../../apolloClient/queries/sliderNotice/sliderNotice";
import { useQuery } from "@apollo/client";
import { Box } from "@mui/material";

const Notification = () => {

  const {data,loading,error}=useQuery(GET_SLIDER_NOTICE);

  // console.log('data is count ::',data?.sliderNotifications?.edges);

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

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
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
     
      <Badge
        badgeContent={data?.sliderNotifications?.edges?.length}
        max={999}
        color="secondary"
        sx={{
          color: "white",
          margin: { xs: "0px 5px", md: "0px 2px" },
        }}
      >
        <Tooltip title="All Notifications">
          <IconButton
            size="small"
            sx={{ ml: 2 }}
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? "composition-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <NotificationsNoneIcon
              sx={{
                color: "white",
                fontSize: { xs: "16px", md: "17px" },
              }}
            />
          </IconButton>
        </Tooltip>
      </Badge>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        sx={{ marginTop: "13px !important" }}
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
                  <MenuItem
                    sx={{ minWidth: "250px !important" }}
                    onClick={handleClose}
                  >
                    <Typography variant="caption" sx={{ fontSize: "10px" }}>
                      Notifications
                    </Typography>
                    <Link href="#markallread">
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: "10px",
                          marginLeft: "auto",
                          color: "var(--primary)",
                          "&:hover": { color: "black" },
                        }}
                      >
                        Mark All As Read
                      </Typography>
                    </Link>
                  </MenuItem>

                  <Divider sx={{ margin: "0px !important" }} />




                 {
                  data?.sliderNotifications?.edges?.map(item=><Box key={item?.node?.id}>  
                    <Link href={`/sliderNotice/${item?.node?.id}`}>
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon sx={{ minWidth: "auto !important" }}>
                        <Logout />
                      </ListItemIcon>
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: "13px",
                          flexGrow: 1,
                          margin: "0px 10px",
                        }}
                      >
                       {item?.node?.title.slice(0,50)}
                      </Typography>
                      <Avatar
                        className="mna"
                        sx={{
                          width: "25px !important",
                          height: "25px !important",
                          marginRight: "0px !important",
                        }}
                      >
                        <MoreVertIcon fontSize="10px" />
                      </Avatar>
                    </MenuItem>
                  </Link>
                  </Box>
                  )
                 
                 }



                  <Divider sx={{ margin: "0px !important" }} />

                  <Link href="#viewall">
                    <MenuItem
                      sx={{ justifyContent: "center", color: "var(--primary)" }}
                      onClick={handleClose}
                    >
                      <Typography variant="caption" mr={1}>
                        {" "}
                        View All
                      </Typography>
                      <ListItemIcon sx={{ minWidth: "auto !important" }}>
                        <ArrowForwardIosIcon
                          fontSize="small"
                          sx={{ fontSize: "10px", color: "var(--primary)" }}
                        />
                      </ListItemIcon>
                    </MenuItem>
                  </Link>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default Notification;
