import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import swal from "sweetalert";
//toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// mui components
import {
  Box,
  Breadcrumbs,
  Button,
  ButtonGroup,
  CardMedia,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";

// icons
import ListIcon from "@mui/icons-material/List";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faReceipt } from "@fortawesome/free-solid-svg-icons";

// components/apollo client
import Title from "../../components/Header/Title";
import { useCartListOnServerSide } from "../../apolloClient/queries/cart/useCartListQuery";
import useCartList from "../../apolloClient/queries/cart/useCartListQuery";
import useDeleteCartItemMutation from "../../apolloClient/mutation/addtocart/cartItemDeleteMutation";
import useProcessOrderMutation from "../../apolloClient/mutation/order/useProcessOrderMutation";

// utils
import { globalCookie } from "../../utils/globalCookie";

// global context
import { GlobalContext } from "../_app";

const ShoppingCart = ({ cartItems }) => {
  const router = useRouter();
  const { token } = useContext(GlobalContext);
  // cart list in client side
  const { cartListLoading, cartListError, cartListData } = useCartList(token);
  const [cartItemsState, setCartItemsState] = useState(cartItems?.carts?.edges);
  const [totalCartAmout, setTotalCartAmout] = useState(0);
  const [totalCartAmoutUsd, setTotalCartAmoutUsd] = useState(0);

  // process order mutation
  const { processOrderMutationHandler } = useProcessOrderMutation(token);

  // delete cart item mutation
  const { deleteCartItemMutationHandler } = useDeleteCartItemMutation(token);

  // process order handler
  const processOrderHandler = (cartItemsData) => {
    processOrderMutationHandler({
      variables: {
        listCart: cartItemsData,
      },
      context: {
        headers: {
          Authorization: `JWT ${token}`,
        },
      },
      onCompleted: (data) => {
        toast.success("Your order is in progress", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        router.push("/checkout");
      },
      onError: (err) => {
        toast.warn("Order does not in progress", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      },
    });
  };

  // cart product increment handler
  const cartProductIncrementHandler = (id) => {
    const newCartItems = [...cartItemsState];

    let selectCartItemIndex = newCartItems.findIndex(
      (item) => item.node.id == id
    );

    if (
      newCartItems[selectCartItemIndex].node?.quantity <
      newCartItems[selectCartItemIndex].node?.product?.quantity
    ) {
      // quantity
      newCartItems[selectCartItemIndex].node.quantity =
        newCartItems[selectCartItemIndex].node.quantity + 1;

      // subtotal
      newCartItems[selectCartItemIndex].node.subtotal =
        newCartItems[selectCartItemIndex].node.quantity *
        newCartItems[selectCartItemIndex].node.product?.sellPrice;

      // subtotalUsd
      newCartItems[selectCartItemIndex].node.subtotalUsd =
        newCartItems[selectCartItemIndex].node.quantity *
        newCartItems[selectCartItemIndex].node.product?.sellPriceDolar;

      // offerPrice
      newCartItems[selectCartItemIndex].node.offerPrice =
        newCartItems[selectCartItemIndex].node.quantity *
        newCartItems[selectCartItemIndex].node.product?.productoffer?.amount;

      // offerPriceUsd
      newCartItems[selectCartItemIndex].node.offerPriceUsd =
        newCartItems[selectCartItemIndex].node.quantity *
        newCartItems[selectCartItemIndex].node.product?.productoffer?.amountUsd;

      setCartItemsState(newCartItems);
    } else {
      toast.warn("Product out of stock", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // cart product decrement handler
  const cartProductDecrementHandler = (id) => {
    const newCartItems = [...cartItemsState];

    let selectCartItemIndex = newCartItems.findIndex(
      (item) => item.node.id == id
    );

    if (newCartItems[selectCartItemIndex].node?.quantity > 1) {
      // quantity
      newCartItems[selectCartItemIndex].node.quantity =
        newCartItems[selectCartItemIndex].node.quantity - 1;

      // subtotal
      newCartItems[selectCartItemIndex].node.subtotal =
        newCartItems[selectCartItemIndex].node.quantity *
        newCartItems[selectCartItemIndex].node.product?.sellPrice;

      // subtotalUsd
      newCartItems[selectCartItemIndex].node.subtotalUsd =
        newCartItems[selectCartItemIndex].node.quantity *
        newCartItems[selectCartItemIndex].node.product?.sellPriceDolar;

      // offerPrice
      newCartItems[selectCartItemIndex].node.offerPrice =
        newCartItems[selectCartItemIndex].node.quantity *
        newCartItems[selectCartItemIndex].node.product?.productoffer?.amount;

      // offerPriceUsd
      newCartItems[selectCartItemIndex].node.offerPriceUsd =
        newCartItems[selectCartItemIndex].node.quantity *
        newCartItems[selectCartItemIndex].node.product?.productoffer?.amountUsd;

      setCartItemsState(newCartItems);
    } else {
      toast.warn("Product Quantity can't be Zero", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // cart product delete handler
  const removeProductFromCartHandler = (id) => {
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
              icon: "warnings",
            });
          },
        });
      } else {
        swal("Your Cart Item Is Safe!");
      }
    });
  };

  useEffect(() => {
    // Total cart amount calculation for billing summary
    if (cartItemsState && cartItemsState.length > 0) {
      // total subtotal
      let totalAmount = cartItemsState
        .map((item) => item.node.subtotal)
        .reduce((prev, next) => prev + next);

      // total subtotal usd
      let totalAmountUsd = cartItemsState
        .map((item) => item.node.subtotalUsd)
        .reduce((prev, next) => prev + next);

      setTotalCartAmout(totalAmount);
      setTotalCartAmoutUsd(totalAmountUsd);
    } else {
      setTotalCartAmout(0);
      setTotalCartAmoutUsd(0);
    }
  }, [cartItemsState]);

  // update server side cartlist after delete cart item
  useEffect(() => {
    if (
      !cartListLoading &&
      cartListData !== undefined &&
      cartListData?.me?.consumers?.carts?.edges.length !== cartItemsState.length
    ) {
      console.log(
        "cartListData length ::",
        cartListData?.me?.consumers?.carts?.edges.length
      );
      console.log("cartItemsState length ::", cartItemsState.length);

      setCartItemsState(cartListData?.me?.consumers?.carts?.edges);
    }
  }, [cartListData]);

  return (
    <Box>
      <Title>Shopping Cart</Title>

      {cartItemsState?.length > 0 ? (
        <Box>
          {/* cart details header  */}
          <Container sx={{ mt: "20px" }}>
            <Box textAlign="left">
              <IconButton>
                <ListIcon fontSize="large" sx={{ color: "var(--primary)" }} />
                <Typography ml={1} sx={{ fontSize: "22px", color: "#000" }}>
                  Your Shopping Cart
                </Typography>
              </IconButton>
            </Box>
          </Container>

          {/* cart items  */}
          <Container sx={{ my: "30px" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={9} order={{ xs: 1 }}>
                <Box>
                  {cartItemsState?.map((cartItem) => (
                    <Paper
                      elevation={3}
                      sx={{
                        border: "1px solid transparent",
                        transition: "all 0.5s linear",
                        mt: "15px",
                        ":hover": {
                          border: "1px solid var(--primary)",
                          cursor: "pointer",
                        },
                      }}
                      key={cartItem.node.id}
                    >
                      <Grid container spacing={1}>
                        {/* product delete button  */}
                        <Grid
                          item
                          xs={2}
                          sm={2}
                          md={1}
                          order={{ xs: 5, sm: 1 }}
                        >
                          <FontAwesomeIcon
                            icon={faTrashCan}
                            style={{
                              border: "1px solid #d9d9d9",
                              padding: "8px",
                              color: "rgb(254, 135, 89)",
                              fontSize: "18px",
                              borderRadius: "50%",
                              margin: "50px auto",
                              display: "block",
                            }}
                            id="delete_cart"
                            onClick={() =>
                              removeProductFromCartHandler(cartItem?.node?.id)
                            }
                          />
                        </Grid>

                        {/* product image  */}
                        <Grid
                          item
                          xs={6}
                          sm={6}
                          md={2}
                          order={{ xs: 1, sm: 2 }}
                        >
                          <CardMedia
                            component="img"
                            height="150"
                            image={cartItem?.node?.product?.productImage}
                            alt="green iguana"
                            sx={{
                              border: "1px solid #d9d9d9",
                              padding: "5px",
                              margin: "10px 0px",
                            }}
                          />
                        </Grid>

                        {/* product info  */}
                        <Grid
                          item
                          xs={6}
                          sm={4}
                          md={4}
                          order={{ xs: 2, sm: 3 }}
                        >
                          <Box sx={{ ml: "31px" }}>
                            <Typography
                              sx={{
                                marginTop: "10px",
                                fontSize: "14px",
                              }}
                            >
                              {cartItem?.node?.product?.name}
                            </Typography>

                            <Breadcrumbs
                              aria-label="breadcrumb"
                              sx={{
                                color: "var(--primary)",
                                fontSize: "12px",
                              }}
                            >
                              <Typography variant="div">
                                <Link
                                  href={`category/${cartItem?.node?.product?.category?.name}`}
                                >
                                  {cartItem?.node?.product?.category?.name}
                                </Link>
                                /
                              </Typography>
                              <Typography variant="div">
                                <Link
                                  href={`category/subCategory/${cartItem?.node?.product?.subcategory?.name}`}
                                >
                                  {cartItem?.node?.product?.subcategory?.name}
                                </Link>
                              </Typography>
                              <Typography variant="div">
                                <a
                                  href={`/category/subCategory/subSubCategory/${cartItem?.node?.product?.subsubcategory?.name}`}
                                  target="_blank"
                                >
                                  {
                                    cartItem?.node?.product?.subsubcategory
                                      ?.name
                                  }
                                </a>
                                {/* </Link> */}
                              </Typography>
                            </Breadcrumbs>
                            <Divider sx={{ my: "7px", width: "80%" }} />

                            <Box
                              sx={{
                                fontSize: "13px",
                                color: "rgba(0, 0, 0, 0.5)",
                                marginBottom: "10px",
                              }}
                            >
                              <Typography
                                variant="p"
                                sx={{ display: "block", mb: "4px" }}
                              >
                                {}
                                Discount:{" "}
                                {`${
                                  cartItems?.country?.currenciesSymbol
                                } ${cartItem?.node?.discount.toFixed(
                                  2
                                )} / $ ${cartItem?.node?.discountUsd.toFixed(
                                  2
                                )} `}
                              </Typography>

                              <Typography variant="p" sx={{ display: "block" }}>
                                <Typography
                                  component="span"
                                  sx={{ mr: "5px" }}
                                  variant="caption"
                                >
                                  Price:
                                  {` ${
                                    cartItems?.country?.currenciesSymbol
                                  } ${cartItem?.node?.product?.sellPrice.toFixed(
                                    2
                                  )}`}
                                </Typography>
                                <del style={{ color: "salmon" }}>
                                  {` ${cartItems?.country?.currenciesSymbol} `}
                                  {(
                                    cartItem?.node?.product?.productoffer
                                      ?.amount +
                                    cartItem?.node?.product?.sellPrice
                                  ).toFixed(2)}
                                </del>{" "}
                              </Typography>

                              <Typography variant="p" sx={{ display: "block" }}>
                                <Typography
                                  component="span"
                                  sx={{ mr: "5px" }}
                                  variant="caption"
                                >
                                  Price: USD
                                  {` ${(cartItem?.node?.product?.sellPriceDolar).toFixed(
                                    2
                                  )}`}
                                </Typography>
                                <del style={{ color: "salmon" }}>
                                  {" "}
                                  USD.{" "}
                                  {` ${(
                                    cartItem?.node?.product?.productoffer
                                      ?.amountUsd +
                                    cartItem?.node?.product?.sellPriceDolar
                                  ).toFixed(2)}`}
                                </del>{" "}
                              </Typography>

                              <Typography
                                variant="p"
                                sx={{ display: "block", mb: "4px" }}
                              >
                                variant: {cartItem?.node?.discount}
                              </Typography>

                              <Typography
                                variant="p"
                                sx={{ display: "block", mb: "4px" }}
                              >
                                In Stock:
                                {cartItem?.node?.product?.quantity > 0
                                  ? cartItem?.node?.product?.quantity > 1
                                    ? ` ${cartItem?.node?.product?.quantity} pieces`
                                    : ` ${cartItem?.node?.product?.quantity} piece`
                                  : " Not Available"}{" "}
                              </Typography>

                              <Typography variant="p">
                                Shop: {cartItem?.node?.product?.shop?.name}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>

                        {/* product increment/decrement button  */}
                        <Grid
                          item
                          xs={5}
                          sm={3}
                          md={2}
                          sx={{ mt: "40px", ml: "0px" }}
                          order={{ xs: 3, sm: 4 }}
                        >
                          <ButtonGroup
                            variant="outlined"
                            aria-label="outlined button group"
                            size="small"
                          >
                            <Button
                              onClick={() =>
                                cartProductDecrementHandler(cartItem?.node?.id)
                              }
                            >
                              <RemoveIcon />
                            </Button>

                            <Button>{cartItem?.node?.quantity}</Button>
                            <Button
                              onClick={() =>
                                cartProductIncrementHandler(cartItem?.node?.id)
                              }
                            >
                              <AddIcon />
                            </Button>
                          </ButtonGroup>
                        </Grid>

                        {/* total amount  */}
                        <Grid
                          item
                          xs={5}
                          sm={3}
                          md={3}
                          sx={{ textAlign: "center", mt: "25px" }}
                          order={{ xs: 4, sm: 5 }}
                        >
                          <Typography component="p" variant="caption">
                            {`${cartItems?.country?.currenciesSymbol} `}
                            {cartItem?.node?.product?.quantity > 0
                              ? cartItem?.node?.subtotal.toFixed(2)
                              : 0}
                          </Typography>

                          <Typography component="p" variant="caption">
                            USD.
                            {` ${
                              cartItem?.node?.product?.quantity > 0
                                ? cartItem?.node?.subtotalUsd.toFixed(2)
                                : 0
                            }`}
                          </Typography>

                          <Typography component="p" variant="caption">
                            <del style={{ color: "salmon" }}>
                              {`${cartItems?.country?.currenciesSymbol} `}
                              {cartItem?.node?.product?.quantity > 0
                                ? (
                                    cartItem?.node?.offerPrice +
                                    cartItem?.node?.subtotal
                                  ).toFixed(2)
                                : 0}
                            </del>
                          </Typography>

                          <Typography component="p" variant="caption">
                            <del style={{ color: "salmon" }}>
                              USD.{" "}
                              {cartItem?.node?.product?.quantity > 0
                                ? (
                                    cartItem?.node?.offerPriceUsd +
                                    cartItem?.node?.subtotalUsd
                                  ).toFixed(2)
                                : 0}
                            </del>
                          </Typography>

                          <Typography
                            component="p"
                            variant="subtitle2"
                            sx={{ color: "green" }}
                          >
                            SAVED: {`${cartItems?.country?.currenciesSymbol} `}
                            {cartItem?.node?.product?.quantity > 0
                              ? cartItem?.node?.offerPrice.toFixed(2)
                              : 0}
                          </Typography>
                          <Typography
                            component="p"
                            variant="subtitle2"
                            sx={{ color: "green" }}
                          >
                            SAVED: USD
                            {` ${
                              cartItem?.node?.product?.quantity > 0
                                ? cartItem?.node?.offerPriceUsd.toFixed(2)
                                : 0
                            }`}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                  ))}
                </Box>

                <Box sx={{ textAlign: "right" }}>
                  <Button
                    variant="contained"
                    sx={{
                      textTransform: "capitalize",
                      background: "gray",
                      marginTop: "8px",
                      ":hover": {
                        backgroundColor: "var(--primary)",
                      },
                    }}
                    startIcon={<ShoppingCartIcon />}
                  >
                    Continue Shopping
                  </Button>
                </Box>
              </Grid>

              {/* Billing Summary  */}
              <Grid item xs={12} sm={12} md={3} order={{ xs: 2 }}>
                <Paper elevation={3}>
                  <Box>
                    <Box
                      sx={{ fontSize: "20px", padding: "14px 0px", mt: "18px" }}
                    >
                      <FontAwesomeIcon
                        icon={faReceipt}
                        style={{
                          color: "var(--primary)",
                        }}
                      />
                      <Typography variant="p" sx={{ ml: "6px" }}>
                        Billing Summary
                      </Typography>
                    </Box>

                    <Box sx={{ padding: "5px" }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="body1">Total :</Typography>

                        <Typography variant="body1">
                          {`${
                            cartItems?.country?.currenciesSymbol
                          } ${totalCartAmout.toFixed(2)}`}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="body1">Total(usd) :</Typography>

                        <Typography variant="body1">
                          {`$ ${totalCartAmoutUsd.toFixed(2)} `}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth={true}
                    sx={{
                      textTransform: "capitalize",
                      backgroundColor: "var(--primary)",
                      my: "20px",
                    }}
                    endIcon={<ChevronRightIcon />}
                    onClick={() => processOrderHandler(cartItemsState)}
                  >
                    Process Order
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      ) : (
        <Box sx={{ m: "70px auto", textAlign: "center" }}>
          <img
            src="/images/products/emptycart.svg"
            height={300}
            width={300}
            alt="empty cart"
          />
          <Typography variant="h4">Your Cart is Empty!</Typography>
          <Typography variant="caption">
            Looks like you haven't add product to cart.
          </Typography>

          {/* continue shipping   */}
          <Box sx={{ textAlign: "center" }}>
            <Link href="/">
              <Button
                variant="contained"
                sx={{
                  textTransform: "capitalize",
                  background: "gray",
                  marginTop: "8px",
                  ":hover": {
                    backgroundColor: "var(--primary)",
                  },
                }}
                startIcon={<ShoppingCartIcon />}
              >
                Continue Shopping
              </Button>
            </Link>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export const getServerSideProps = async () => {
  const { cartItems } = useCartListOnServerSide(globalCookie);

  let newCartItems = await cartItems;

  return {
    props: {
      cartItems: newCartItems?.data?.me?.consumers,
      serverSideToken: globalCookie,
    },
  };
};

export default ShoppingCart;
