import React, { useContext, useState } from "react";
import Link from "next/link";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// mui components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import CardActionArea from "@mui/material/CardActionArea";
import Rating from "@mui/material/Rating";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

// icons
import StarIcon from "@mui/icons-material/Star";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import VideocamIcon from "@mui/icons-material/Videocam";
import FavoriteIcon from "@mui/icons-material/Favorite";

// components/apollo client
import createCartMutation from "../../apolloClient/mutation/addtocart/cartAddMutation";

// global context
import { GlobalContext } from "../../pages/_app";

// css
import styles from "../../styles/Products/Products.module.css";
import useCreateWishlist from "../../apolloClient/mutation/wishlist/wishlistCreate";

const Product = ({ product, cartList, wishList }) => {
  console.log("cartList in product component ::", cartList);

  const [
    protectMoreClickOnAddToCarthandler,
    setProtectMoreClickOnAddToCarthandler,
  ] = useState(true);
  const { token, currentUser } = useContext(GlobalContext);
  // add to cart mutation
  const { cartCreateOrUpdate } = createCartMutation(token);

  // add to wish list mutation
  const { addToWishListMutationHandler } = useCreateWishlist(token);

  // mouse enter handle
  const productOverlayEnterHandler = () => {
    let poc = document.getElementById(
      `product_overlay_container${product?.node?.id}`
    );

    poc.style.height = "100%";
    poc.style.borderRadius = "0px";
    poc.style.padding = "5px";
  };

  // mouse leave handler
  const productOverlayLeaveHandler = () => {
    let poc = document.getElementById(
      `product_overlay_container${product?.node?.id}`
    );

    poc.style.height = "0%";
    poc.style.borderRadius = "0px 0px 50px 50px";
    poc.style.padding = "0px";
  };

  // add to wishlists handler
  const addToWishListHandler = (productid) => {
    let itemExistOrNotInWishList = wishList?.find(
      (item) => item.node.id == productid
    );

    if (token !== null) {
      if (!itemExistOrNotInWishList) {
        addToWishListMutationHandler({
          variables: {
            productId: productid,
          },
          context: {
            headers: {
              Authorization: `JWT ${token}`,
            },
          },
          onCompleted: () => {
            toast.success("Added to wishlist successfully", {
              position: "top-right",
              autoClose: 2500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          },
          onError: (err) => {
            toast.warn("Product Does Not Added TO Wishlist", {
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
      } else {
        toast.warn("Product Already Exist in Wishlist", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast.warn("Please Login First!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // product Add To Cart Handler
  const productAddToCartHandler = (product) => {
    setProtectMoreClickOnAddToCarthandler(false);
    let initialProductQuantityForCart = 1;

    // check product exist or not in cart
    let itemExistOrNotInCart = cartList?.find(
      (item) => item?.node?.product?.id == product?.node?.id
    );

    if (token !== null) {
      if (product?.node?.quantity > 0) {
        if (!itemExistOrNotInCart) {
          cartCreateOrUpdate({
            variables: {
              productId: product?.node?.id,
              quantity: initialProductQuantityForCart,

              //-------------------------- vat  ---------------------------
              vatPercentage: product?.node?.vat?.percentageAmt,
              vatAmountUsd:
                initialProductQuantityForCart *
                product?.node?.sellPriceDolar *
                (product?.node?.vat?.percentageAmt / 100),
              vatAmountBuyer:
                currentUser?.consumers?.country?.id ==
                product?.consumer?.country?.id
                  ? initialProductQuantityForCart *
                    product?.node?.sellPrice *
                    (product?.node?.vat?.percentageAmt / 100)
                  : initialProductQuantityForCart *
                    product?.node?.sellPriceDolar *
                    currentUser?.consumers?.country?.usd1ToLocalCurrency *
                    (product?.node?.vat?.percentageAmt / 100),

              vatAmount:
                initialProductQuantityForCart *
                product?.node?.sellPrice *
                (product?.node?.vat?.percentageAmt / 100),

              //-------------------------- commission  ---------------------------
              commissionUsd:
                initialProductQuantityForCart * product?.node?.commissionDolar,
              commissionBuyer:
                currentUser?.consumers?.country?.id ==
                product?.consumer?.country?.id
                  ? initialProductQuantityForCart * product?.node?.commission
                  : initialProductQuantityForCart *
                    product?.node?.commissionDolar *
                    currentUser?.consumers?.country?.usd1ToLocalCurrency,
              commission:
                initialProductQuantityForCart * product?.node?.commission,

              //-------------------------- discount  ---------------------------
              discountUsd:
                initialProductQuantityForCart * product?.node?.discountDolar,
              discountBuyer:
                currentUser?.consumers?.country?.id ==
                product?.consumer?.country?.id
                  ? initialProductQuantityForCart * product?.node?.discount
                  : initialProductQuantityForCart *
                    product?.node?.discountDolar *
                    currentUser?.consumers?.country?.usd1ToLocalCurrency,
              discount: initialProductQuantityForCart * product?.node?.discount,

              //-------------------------- offerPrice  ---------------------------
              offerPriceUsd:
                initialProductQuantityForCart *
                product?.node?.productoffer?.amountUsd,
              offerPriceBuyer:
                currentUser?.consumers?.country?.id ==
                product?.consumer?.country?.id
                  ? initialProductQuantityForCart *
                    product?.node?.productoffer?.amount
                  : initialProductQuantityForCart *
                    product.node.productoffer?.amountUsd *
                    currentUser?.consumers?.country?.usd1ToLocalCurrency,
              offerPrice:
                initialProductQuantityForCart *
                product?.node?.productoffer?.amount,

              //-------------------------- subtotal  ---------------------------
              subtotalUsd:
                initialProductQuantityForCart * product?.node?.sellPriceDolar,
              subtotalBuyer:
                currentUser?.consumers?.country?.id ==
                product?.consumer?.country?.id
                  ? initialProductQuantityForCart * product.node.sellPrice
                  : initialProductQuantityForCart *
                    product?.node?.sellPriceDolar *
                    currentUser?.consumers?.country?.usd1ToLocalCurrency,
              subtotal:
                initialProductQuantityForCart * product?.node?.sellPrice,

              //-------------------------- extraField  ---------------------------
              // extraField: extraField,
            },
            context: {
              headers: {
                Authorization: `JWT ${token}`,
              },
            },
            onCompleted: () => {
              toast.success("Successfully Added To Cart", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              // setProtectMoreClickOnAddToCarthandler(true);
            },
            onError: (err) => {
              toast.warning("Product does not add to cart", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            },
          });
        } else {
          toast.warn(`This product already exist in cart`, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } else {
        toast.warn(`This product is not available`, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast.warn(`Please login first`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <Card className={styles.product_card}>
      {/* image  */}
      <CardActionArea className={styles.card_action_area}>
        <MoreVertIcon
          className={styles.three_dot_icon}
          onMouseEnter={productOverlayEnterHandler}
        />

        <CardMedia
          component="img"
          className={styles.card_action_area__card_media}
          image={product.node.productImage}
          alt={product.node.name}
        />

        {/* product hover content  */}
        <Box
          className={styles.card_media__overlay}
          id={`product_overlay_container${product.node.id}`}
          onMouseLeave={productOverlayLeaveHandler}
        >
          {/* shop  */}
          <Box>
            <Typography variant="caption">
              Shop: {product.node.shop && product.node.shop.name}
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption">
              Country:{" "}
              {product.node.consumer &&
                product.node.consumer.country &&
                product.node.consumer.country.name}{" "}
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption">
              Shop owner:{" "}
              {product.node.consumer &&
                product.node.consumer.user &&
                product.node.consumer.user.firstName +
                  " " +
                  product.node.consumer.user.lastName}
            </Typography>
          </Box>

          {/* Ehsan Marketing Commission  */}
          <Box>
            <Typography variant="caption">
              Ehsan Marketing Commission:
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="caption"
              component="span"
              sx={{
                backgroundColor: "var(--primary-deep)",
                borderRadius: "2px",
                color: "var(--white)",
                padding: "2px",
              }}
            >
              {token !== null &&
              currentUser?.consumers?.country?.id !==
                product?.consumer?.country?.id ? (
                <>
                  {`${currentUser?.consumers?.country?.currenciesSymbol}
                  ${(
                    currentUser?.consumers?.country?.usd1ToLocalCurrency *
                    product.node.commissionDolar
                  ).toFixed(2)} `}
                </>
              ) : (
                <>
                  {`${product.node.consumer?.country?.currenciesSymbol}
                  ${product.node.commission.toFixed(2)}`}
                </>
              )}
            </Typography>

            <Typography
              variant="caption"
              component="span"
              sx={{
                backgroundColor: "var(--primary-deep)",
                borderRadius: "2px",
                marginLeft: "5px",
                color: "var(--white)",
                padding: "2px",
              }}
            >
              $ {product?.node?.commissionDolar?.toFixed(2)}
            </Typography>
          </Box>

          {/* video wishlist live  */}
          <Box
            sx={{
              paddingTop: "0px",
              marginTop: "10px",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Typography
              variant="caption"
              component="span"
              sx={{
                backgroundColor: "var(--primary-deep)",
                borderRadius: "2px",
                color: "var(--white)",
                padding: "2px",
              }}
            >
              <VideocamIcon sx={{ fontSize: "12px", marginRight: "3px" }} />
              Video
            </Typography>

            <Typography
              variant="caption"
              component="span"
              sx={{
                backgroundColor: "var(--primary-deep)",
                borderRadius: "2px",
                marginLeft: "5px",
                color: "var(--white)",
                padding: "2px",
              }}
              onClick={() => addToWishListHandler(product?.node?.id)}
            >
              {" "}
              <FavoriteIcon sx={{ fontSize: "12px", marginRight: "3px" }} />
              Wish List
            </Typography>

            <Typography
              variant="caption"
              component="span"
              sx={{
                backgroundColor: "var(--primary-deep)",
                borderRadius: "2px",
                marginLeft: "5px",
                color: "var(--white)",
                padding: "2px",
              }}
            >
              {" "}
              <LiveTvIcon sx={{ fontSize: "12px", marginRight: "3px" }} />
              Live
            </Typography>
          </Box>
        </Box>
      </CardActionArea>

      {/* content  */}
      <CardContent sx={{ padding: "5px 8px" }}>
        {/* header  */}
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ height: "70px" }}
        >
          {/* product name  */}
          <Grid item>
            <Typography
              gutterBottom
              variant="p"
              sx={{
                color: "#007bff",
                fontSize: "14px",
                display: "block",
              }}
            >
              {product.node.name.length >= 60
                ? `${product.node.name.slice(0, 60)} ...`
                : product.node.name}
            </Typography>
          </Grid>

          {/* product status  */}
          {product.node.productUsedStatus !== null && (
            <Grid item>
              <Typography
                gutterBottom
                variant="caption"
                sx={{
                  backgroundColor: "#ffff80",
                  padding: "3px 6px",
                  borderRadius: "10px",
                  color: "green",
                  textTransform: "capitalize",
                  fontSize: "9px",
                }}
              >
                {product.node.productUsedStatus}
              </Typography>
            </Grid>
          )}
        </Grid>

        {/* rating  */}
        <Box
          sx={{
            width: 200,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            varient="caption"
            component="span"
            sx={{ fontSize: "11px" }}
          >
            ({product.node.avarageRating})
          </Typography>
          <Rating
            name="product-feedback"
            value={product.node.avarageRating}
            readOnly
            precision={0.1}
            size="small"
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
            sx={{ color: "#ffc107", fontSize: "17px" }}
          />
        </Box>

        <Divider
          sx={{ borderBottom: "1px dashed rgba(0, 0, 0, 0.29)", mt: "5px" }}
        />

        {/* offer */}
        <Box mt={1}>
          <Typography variant="caption">
            <>
              <del style={{ color: "gray", fontSize: "14px" }}>
                {token !== null &&
                currentUser?.consumers?.country?.id !==
                  product?.consumer?.country?.id ? (
                  <>
                    {`${currentUser?.consumers?.country?.currenciesSymbol}
                          ${(
                            currentUser?.consumers?.country
                              ?.usd1ToLocalCurrency *
                            product?.node?.productoffer?.amountUsd
                          ).toFixed(2)} `}
                  </>
                ) : (
                  <>
                    {product.node.productoffer
                      ? `${product.node.consumer?.country?.currenciesSymbol} ${product.node.productoffer.amount}`
                      : `${product.node.consumer?.country?.currenciesSymbol} 0`}
                  </>
                )}
              </del>
              <Typography
                variant="caption"
                component="span"
                sx={{
                  backgroundColor: "var(--primary)",
                  borderRadius: "2px",
                  marginLeft: "5px",
                  color: "var(--white)",
                  padding: "2px",
                }}
              >
                off
              </Typography>
            </>
          </Typography>
        </Box>

        {/* price  */}
        <Box>
          <Grid container justifyContent="space-between">
            {/* price in local currencis  */}
            <Grid item>
              <Typography variant="subtitle2">
                <Typography
                  component="span"
                  variant="subtitle2"
                  sx={{ fontSize: "12px", marginLeft: "2px" }}
                >
                  {token !== null &&
                  currentUser?.country?.id !==
                    product?.consumer?.country?.id ? (
                    <>
                      {currentUser?.consumers?.country?.currenciesSymbol}
                      {(
                        currentUser?.consumers?.country?.usd1ToLocalCurrency *
                        product.node.sellPriceDolar
                      ).toFixed(2).length > 7
                        ? ` ${(
                            currentUser?.consumers?.country
                              ?.usd1ToLocalCurrency *
                            product.node.sellPriceDolar
                          )
                            .toFixed(2)
                            .slice(0, 7)} ...`
                        : ` ${
                            currentUser?.consumers?.country
                              ?.usd1ToLocalCurrency *
                            product.node.sellPriceDolar
                          }`}
                    </>
                  ) : (
                    <>
                      {product.node.sellPrice.toFixed(2).length > 7 ? (
                        <>
                          {product.node.consumer?.country?.currenciesSymbol}

                          {` ${product.node.sellPrice
                            .toFixed(2)
                            .slice(0, 7)} ...`}
                        </>
                      ) : (
                        <>
                          {" "}
                          {
                            product.node.consumer?.country?.currenciesSymbol
                          }{" "}
                          {` ${product.node.sellPrice.toFixed(2)}`}
                        </>
                      )}
                    </>
                  )}
                </Typography>{" "}
                <Typography variant="caption" sx={{ color: "gray" }}>
                  {" "}
                  (
                  {product.node.quantity > 999 ? (
                    <>
                      {` ${999}`}
                      <sup>+ </sup>
                    </>
                  ) : (
                    ` ${product.node.quantity} `
                  )}
                  {product.node.quantity > 1 ? "pieces " : "piece "} )
                </Typography>
              </Typography>
            </Grid>

            {/* price in global currencies  */}
            <Grid item>
              <Typography
                variant="subtitle2"
                sx={{ fontSize: "12px", marginTop: "3px" }}
              >
                ${" "}
                {product.node.sellPriceDolar.toFixed(2).length > 7
                  ? ` ${product.node.sellPriceDolar.toFixed(2).slice(0, 7)} ...`
                  : ` ${product.node.sellPriceDolar.toFixed(2)}`}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* made in  */}
        <Typography variant="caption" color="text.secondary">
          Made By:{" "}
          {product.node.originCountry
            ? product.node.originCountry.name.length > 23
              ? `${product.node.originCountry.name.slice(0, 23)} ...`
              : product.node.originCountry.name
            : "Not Specified"}
        </Typography>
      </CardContent>

      {/* action buttons  */}
      <CardActions sx={{ display: "flex", paddingTop: "0px" }}>
        <Button
          variant="contained"
          startIcon={<AddShoppingCartIcon />}
          size="small"
          sx={{
            flexGrow: 1,
            backgroundColor: "var(--primary)",
            fontSize: "11px",
            "&:hover": {
              backgroundColor: "rgb(31 155 197)",
              transition: "0.5s",
            },
          }}
          onClick={() => productAddToCartHandler(product)}
          disabled={protectMoreClickOnAddToCarthandler ? false : true}
        >
          Add To Cart
        </Button>

        <Link href={`products/${encodeURIComponent(product.node.id)}`}>
          <Button
            variant="contained"
            startIcon={<VisibilityIcon />}
            size="small"
            sx={{
              backgroundColor: "#8f8f8f",
              fontSize: "11px",
              "&:hover": {
                backgroundColor: "rgb(31 155 197)",
                transition: "0.5s",
              },
            }}
          >
            View
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default Product;
