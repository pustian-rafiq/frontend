import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import swal from "sweetalert";

// mui components
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
// mui icons
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

// components/apollo client
import useDeleteCartItemMutation from "../../apolloClient/mutation/addtocart/cartItemDeleteMutation";

// global context
import { GlobalContext } from "../../pages/_app";

const CartItemsList = ({ cartItemList, cartListLoading }) => {
  const { token } = useContext(GlobalContext);

  const [state, setState] = useState({
    right: false,
  });

  const [cartDrawerStyle, setCartDrawerStyle] = useState(96);

  const { deleteCartItemMutationHandler } = useDeleteCartItemMutation(token);

  if (typeof window === "object") {
    window.onscroll = function () {
      cartDrawerHandler();
    };

    function cartDrawerHandler() {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        setCartDrawerStyle(56);
      } else {
        setCartDrawerStyle(96);
      }
    }
  }

  const removeFromCartListHandler = (id) => {
    swal({
      title: "Are you sure to Remove ?",
      text: "Once deleted, you will not be able to recover this add to cart details",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteCartItemMutationHandler({
          variables: {
            id: id,
          },
          context: {
            headers: {
              Authorization: `JWT ${token}`,
            },
          },

          onCompleted: () => {
            swal("Selected Product Deleted From Cart", {
              icon: "success",
            });
          },

          onError: (err) => {
            swal("Selected Product Does Not Deleted From Cart", {
              icon: "warning",
            });
          },
        });
      } else {
        swal("Your Cart Item Is Safe!");
      }
    });
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box>
      <List sx={{ padding: "0px", position: "relative" }}>
        {/* cart header  */}
        <ListItem
          sx={{
            margin: "0px",
            boxShadow: "0px 0px 5px rgb(0 0 0 / 50%)",
            alignItems: "start",
          }}
        >
          <ListItemIcon
            sx={{
              color: "var(--primary)",
              minWidth: "auto",
            }}
          >
            <ShoppingCartIcon sx={{ color: "var(--primary)" }} />
          </ListItemIcon>

          <ListItemText
            sx={{ textAlign: "center", marginTop: "0px" }}
            primary={
              <>
                <Typography variant="subtitle2">Your Shopping Cart</Typography>
                <Typography variant="caption">
                  {cartItemList?.me?.consumers?.carts?.edges.length > 0
                    ? cartItemList?.me?.consumers?.carts?.edges.length
                    : 0}{" "}
                  items in Cart
                </Typography>
              </>
            }
          />

          <ListItemIcon
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
            sx={{
              minWidth: "auto",
              border: "1px solid rgba(0, 0, 0, 0.6)",
              borderRadius: "5px",
            }}
          >
            {" "}
            <CloseIcon
              sx={{
                transition: "transform 500ms",
                "&:hover": {
                  transform: "rotate(90deg)",
                },
              }}
            />
          </ListItemIcon>
        </ListItem>

        {/* cart body  */}
        <Box
          sx={{
            height: "330px",
            overflow: "auto",
          }}
        >
          {cartItemList?.me?.consumers?.carts?.edges.map((item, index) => (
            <React.Fragment key={index}>
              {/* cart item list */}
              <ListItem
                sx={{
                  margin: "0px",
                  alignItems: "start",
                }}
              >
                {/* cart item image  */}
                <ListItemIcon
                  sx={{
                    color: "var(--primary)",
                    minWidth: "auto",
                    border: "1px solid salmon",
                  }}
                >
                  <img
                    src={item?.node?.product?.productImage}
                    height="50"
                    width="50"
                  />
                </ListItemIcon>

                <ListItemText
                  sx={{ textAlign: "center", marginTop: "0px" }}
                  primary={
                    <>
                      <Typography variant="subtitle2">
                        {item?.node?.product?.name.length > 10
                          ? `${item?.node?.product?.name.slice(0, 10)}...`
                          : item?.node?.product?.name}
                      </Typography>
                      <Typography component="p" variant="caption">
                        Price : {item?.node?.offerPrice.toFixed(2)} tk
                      </Typography>
                      <Typography component="p" variant="caption">
                        Price USD : {item?.node?.offerPriceUsd.toFixed(2)} $
                      </Typography>
                    </>
                  }
                />

                <ListItemIcon
                  role="presentation"
                  sx={{
                    minWidth: "auto",
                  }}
                >
                  <DeleteIcon
                    sx={{ mt: "15px" }}
                    onClick={() => removeFromCartListHandler(item?.node?.id)}
                  />
                </ListItemIcon>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </Box>

        {/* cart footer  */}
        <ListItem
          sx={{
            justifyContent: "space-around",
            position: "absolute",
            zIndex: "444",
          }}
        >
          <Link href="/shopping-cart">
            <Button
              sx={{
                fontSize: "10px",
                padding: "5px 10px",
                borderRadius: "15px",
                backgroundColor: "#727b84",
                "& > .MuiButton-startIcon": {
                  minWidth: "auto",
                  marginRight: "5px !important",
                },
              }}
              className="khelabalok"
              variant="contained"
              startIcon={<VisibilityIcon size="small" />}
              size="small"
              onClick={toggleDrawer(anchor, false)}
            >
              View Cart
            </Button>
          </Link>

          <Link href="/checkout">
            <Button
              sx={{
                fontSize: "10px",
                padding: "5px 10px",
                backgroundColor: "#727b84",
                borderRadius: "15px",
                "& > .MuiButton-startIcon": {
                  minWidth: "auto",
                  marginRight: "5px !important",
                },
              }}
              variant="contained"
              startIcon={<ShoppingCartIcon size="small" />}
              onClick={toggleDrawer(anchor, false)}
            >
              Checkout
            </Button>
          </Link>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box>
      <Badge
        badgeContent={
          !cartListLoading && cartItemList
            ? cartItemList?.me?.consumers?.carts?.edges.length > 0
              ? cartItemList?.me?.consumers?.carts?.edges.length
              : "0"
            : "--"
        }
        max={99}
        color="secondary"
        sx={{
          color: "white",
          margin: { xs: "0px 10px", md: "0px 0px" },
        }}
        onClick={toggleDrawer("right", true)}
      >
        <Tooltip title="Cart Items">
          <IconButton size="small" sx={{ ml: 2 }}>
            <AddShoppingCartIcon
              sx={{
                color: "white",
                fontSize: { xs: "20px", md: "20px" },
              }}
            />
          </IconButton>
        </Tooltip>
      </Badge>

      <Container>
        <Drawer
          id="drawer_container"
          variant="persistent"
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
          sx={{
            ".MuiDrawer-paper": {
              width: "250px",
              height: "455px",
              overflow: "scroll",
              marginTop: `${cartDrawerStyle}px`,
              boxShadow: "0px 0px 5px rgb(0 0 0 / 50%)",
            },
          }}
        >
          {list("right")}
        </Drawer>
      </Container>
    </Box>
  );
};

export default CartItemsList;
