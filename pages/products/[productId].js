import React, { useContext, useRef, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactToPrint from "react-to-print";

// mui components
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardActionArea from "@mui/material/CardActionArea";

// icons
import StarIcon from "@mui/icons-material/Star";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeIcon from "@mui/icons-material/Home";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import ReplayIcon from "@mui/icons-material/Replay";
import FavoriteIcon from "@mui/icons-material/Favorite";
import YouTubeIcon from "@mui/icons-material/YouTube";

// components/apollo client
import PlayProductVideo from "../../components/Products/PlayProductVideo";
import Shop from "../../components/Shop/Shop";
import Products from "../../components/Products/Products";
import ReactImageSlider from "../../components/Products/ReactImageSlider";
import Link from "next/link";
import Title from "../../components/Header/Title";
import useSingleProduct from "../../apolloClient/queries/products/singleProductQuery";
import useProducts from "../../apolloClient/queries/products/productsQuery";
import createCartMutation from "../../apolloClient/mutation/addtocart/cartAddMutation";
import Product from "../../components/Products/Product";
import useCartList from "../../apolloClient/queries/cart/useCartListQuery";

// utils
import { GlobalContext } from "../_app";

const ProductDetails = ({ singleProduct }) => {
  const [productNumber, setProductNumber] = useState(1);
  const [follow, setFollow] = useState(0);
  const [fbgColor, setFbgColor] = useState("var(--primary)");

  const { token, currentUser } = useContext(GlobalContext);
  const { cartCreateOrUpdate } = createCartMutation(token);

  const router = useRouter();

  const componentRef = useRef();

  if (router.isFallback) {
    return (
      <Typography sx={{ textAlign: "center", color: "palegreen" }}>
        Loadding Requested Product ...
      </Typography>
    );
  }

  // get cart items
  const { cartListData } = useCartList(token);

  // product Add To Cart Handler
  const productAddToCartHandler = (product) => {
    console.log('product in single pages ::',product);
    
    let itemExistOrNotInCart = cartListData?.me?.consumers?.carts?.edges.find(
      (item) => item.node.product.id == product.id
    );

    if (token !== null) {
      if (product?.quantity > 0) {
        if (!itemExistOrNotInCart) {
          // addCartItemHandler mutation
          cartCreateOrUpdate({
            variables: {
              productId: product?.id,
              quantity: productNumber,

              //-------------------------- vat  ---------------------------
              vatPercentage: product?.vat?.percentageAmt,

              vatAmountUsd:
                productNumber *
                product?.sellPriceDolar *
                (product?.vat?.percentageAmt / 100),
              vatAmountBuyer:
                currentUser?.consumers?.country?.id ==
                product?.consumer?.country?.id
                  ? productNumber *
                    product?.sellPrice *
                    (product?.vat?.percentageAmt / 100)
                  : productNumber *
                    product?.sellPriceDolar *
                    currentUser?.consumers?.country?.usd1ToLocalCurrency *
                    (product?.vat?.percentageAmt / 100),

              vatAmount:
                productNumber *
                product?.sellPrice *
                (product?.vat?.percentageAmt / 100),

              //-------------------------- commission  ---------------------------
              commissionUsd: productNumber * product?.commissionDolar,
              commissionBuyer:
                currentUser?.consumers?.country?.id ==
                product?.consumer?.country?.id
                  ? productNumber * product?.commission
                  : productNumber *
                    product?.commissionDolar *
                    currentUser?.consumers?.country?.usd1ToLocalCurrency,
              commission: productNumber * product?.commission,

              //-------------------------- discount  ---------------------------
              discountUsd: productNumber * product?.discountDolar,
              discountBuyer:
                currentUser?.consumers?.country?.id ==
                product?.consumer?.country?.id
                  ? productNumber * product?.discount
                  : productNumber *
                    product?.discountDolar *
                    currentUser?.consumers?.country?.usd1ToLocalCurrency,
              discount: productNumber * product?.discount,

              //-------------------------- offerPrice  ---------------------------
              offerPriceUsd: productNumber * product?.productoffer?.amountUsd,
              offerPriceBuyer:
                currentUser?.consumers?.country?.id ==
                product?.consumer?.country?.id
                  ? productNumber * product?.productoffer?.amount
                  : productNumber *
                    product?.productoffer?.amountUsd *
                    currentUser?.consumers?.country?.usd1ToLocalCurrency,
              offerPrice: productNumber * product?.productoffer?.amount,

              //-------------------------- subtotal  ---------------------------
              subtotalUsd: productNumber * product?.sellPriceDolar,
              subtotalBuyer:
                currentUser?.consumers?.country?.id ==
                product?.consumer?.country?.id
                  ? productNumber * product?.sellPrice
                  : productNumber *
                    product?.sellPriceDolar *
                    currentUser?.consumers?.country?.usd1ToLocalCurrency,
              subtotal: productNumber * product?.sellPrice,

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
            },
            onError: (err) => {
              toast.success("Product does not add to cart", {
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

  // product increment decrement handler
  const productIncrementDecrementHandler = (type, qty) => {
    if (type === 1) {
      if (qty > productNumber) {
        setProductNumber(productNumber + 1);
      }
    } else {
      if (productNumber > 1) {
        setProductNumber(productNumber - 1);
      } else {
        setProductNumber(1);
      }
    }
  };

  const handlefollow = () => {
    setFollow(1);
    setFbgColor("orange");
  };

  return (
    <>
      <Title>Ehsan Marketing {singleProduct?.product?.name} </Title>
      <Box
        sx={{
          backgroundColor: "var(--secondary)",
        }}
        ref={componentRef}
      >
        <Container>
          {/* products details  */}
          <Grid
            container
            sx={{
              padding: "30px 0px",
            }}
          >
            <Grid item container xs={12}>
              {/* images  */}
              <Grid item xs={12} md={4}>
                <ReactImageSlider
                  productImage={singleProduct?.product?.productImage}
                  productSlider1={singleProduct?.product?.productSlider1}
                  productSlider2={singleProduct?.product?.productSlider2}
                  productSlider3={singleProduct?.product?.productSlider3}
                  productSlider4={singleProduct?.product?.productSlider4}
                />
              </Grid>

              {/* info  */}
              <Grid
                item
                xs={12}
                md={5}
                sx={{
                  backgroundColor: "var(--secondary)",
                  padding: "20px",
                }}
              >
                {/* title  */}
                <Typography variant="subtitle2" sx={{ fontSize: "16px" }}>
                  {singleProduct?.product?.name}
                </Typography>
                {/* rating  */}
                <Box>
                  <Rating
                    sx={{ fontSize: "15px" }}
                    name="product-feedback"
                    value={singleProduct?.product?.avarageRating}
                    readOnly
                    precision={0.5}
                    size="small"
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />

                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: "15px",
                      paddingRight: "5px",
                      marginRight: "5px",
                      borderRight: "2px solid black",
                    }}
                    component="span"
                  >
                    ({singleProduct?.product?.avarageRating})
                  </Typography>
                  <Typography
                    varient="caption"
                    sx={{
                      fontSize: "13px",
                    }}
                    component="span"
                  >
                    Total Review 1
                  </Typography>
                </Box>
                {/* price  */}
                <Box
                  sx={{
                    marginTop: "10px",
                  }}
                >
                  <Typography
                    variant="h5"
                    component="span"
                    sx={{ fontSize: { xs: "14px", sm: "16px", md: "18px" } }}
                  >
                    ৳ {singleProduct?.product?.buyPrice.toFixed(2)}
                  </Typography>

                  <Typography
                    variant="caption"
                    component="span"
                    sx={{ margin: "0px 5px" }}
                  >
                    (${singleProduct?.product?.buyPriceDolar.toFixed(2)})
                  </Typography>

                  <Typography variant="caption" sx={{ margin: "0px 5px" }}>
                    <>
                      <del>{singleProduct?.product?.comparePrice.toFixed(2)}</del>
                      <Typography
                        variant="caption"
                        component="span"
                        sx={{
                          backgroundColor: "var(--primary-deep)",
                          borderRadius: "10px",
                          marginLeft: "5px",
                          fontSize: "10px",
                          color: "var(--white)",
                          padding: "4px 6px",
                        }}
                      >
                        30% off
                      </Typography>
                    </>
                  </Typography>
                </Box>{" "}
                {/* stock status  */}
                <Typography
                  variant="body1"
                  sx={{ marginTop: "15px", opacity: 0.6 }}
                >
                  Available:{" "}
                  {singleProduct?.product?.quantity
                    ? "in stock"
                    : "Not Avaliable"}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: "14px", sm: "16px", md: "15px" },
                    marginTop: "2px",
                    opacity: 0.6,
                  }}
                >
                  Product Origin:{" "}
                  {singleProduct?.product?.originCountry?.name
                    ? singleProduct?.product?.originCountry?.name
                    : "Not-Specified"}
                </Typography>
                {/* product number  */}
                <Box sx={{ margin: "20px 0px" }}>
                  <ButtonGroup
                    variant="outlined"
                    aria-label="outlined button group"
                  >
                    <Button
                      sx={{
                        border: "1px solid #b9b9b9;",
                        color: "#555",
                        fontSize: "1px",
                      }}
                      onClick={() =>
                        productIncrementDecrementHandler(
                          0,
                          singleProduct?.product?.quantity
                        )
                      }
                    >
                      <RemoveIcon
                        sx={{
                          fontSize: "15px",
                        }}
                      />
                    </Button>
                    <Button
                      sx={{ border: "1px solid  #b9b9b9", color: "#555" }}
                    >
                      {productNumber}
                    </Button>
                    <Button
                      sx={{
                        border: "1px solid  #b9b9b9",
                        color: "#555",
                        fontSize: "10px",
                      }}
                      onClick={() =>
                        productIncrementDecrementHandler(
                          1,
                          singleProduct?.product?.quantity
                        )
                      }
                    >
                      <AddIcon
                        sx={{
                          fontSize: "15px",
                        }}
                      />{" "}
                    </Button>
                  </ButtonGroup>
                </Box>
                {/* add to cart  */}
                <Box>
                  <Button
                    variant="contained"
                    sx={{
                      margin: "20px 0px",
                      backgroundColor: "var(--primary)",
                      borderRadius: "25px",
                    }}
                    endIcon={<ShoppingCartIcon />}
                    onClick={() =>
                      productAddToCartHandler(singleProduct?.product)
                    }
                  >
                    Add To Cart
                  </Button>
                </Box>
                {/* social icon list  */}
                <Box>
                  <IconButton
                    variant="contained"
                    aria-label="delete"
                    size="small"
                    sx={{
                      color: "white",
                      backgroundColor: "var(--primary)",
                      borderRadius: "5px",
                      margin: "5px",
                      padding: "10px",
                      transition: "all 0.5s ease-in-out",
                      "&:hover": {
                        backgroundColor: "#000",
                        color: "#fff",
                      },
                    }}
                  >
                    <AddIcon fontSize="inherit" />
                  </IconButton>

                  <IconButton
                    variant="contained"
                    aria-label="delete"
                    size="small"
                    title="Ehsan Facebook"
                    sx={{
                      color: "white",
                      backgroundColor: "#1976d2",
                      borderRadius: "5px",
                      margin: "5px",
                      padding: "4px 8px",
                      transition: "all 0.5s ease-in-out",
                      "&:hover": {
                        backgroundColor: "#1976d2",
                        opacity: "0.7",
                        transform: "scale(1.2)",
                      },
                    }}
                  >
                    <Link href="https://www.facebook.com/" passHref>
                      <a target="_blank" rel="noopener noreferrer">
                        <FacebookIcon
                          fontSize="small"
                          sx={{ marginTop: "3px" }}
                        />
                      </a>
                    </Link>
                  </IconButton>

                  <IconButton
                    variant="contained"
                    aria-label="delete"
                    size="small"
                    title="Ehsan Twitter"
                    sx={{
                      color: "white",
                      backgroundColor: "rgb(29, 155, 240)",
                      borderRadius: "5px",
                      transition: "all 0.5s ease-in-out",
                      margin: "5px",
                      padding: "5px 8px",

                      "&:hover": {
                        backgroundColor: "rgb(29, 155, 240)",
                        opacity: "0.7",
                        transform: "scale(1.2)",
                      },
                    }}
                  >
                    <Link href="https://twitter.com/?lang=en" passHref>
                      <a target="_blank" rel="noopener noreferrer">
                        <TwitterIcon
                          fontSize="inherit"
                          sx={{ marginTop: "3px" }}
                        />
                      </a>
                    </Link>
                  </IconButton>

                  <IconButton
                    variant="contained"
                    aria-label="delete"
                    title="Ehsan Mail"
                    size="small"
                    sx={{
                      color: "white",
                      backgroundColor: "#1976d2",
                      borderRadius: "5px",
                      transition: "all 0.5s ease-in-out",
                      margin: "5px",
                      padding: "5px 8px",
                      "&:hover": {
                        color: "white",
                        backgroundColor: "#1976d2",
                        opacity: 0.7,
                        transform: "scale(1.2)",
                      },
                    }}
                  >
                    <Link href="https://mail.worldehsan.com/mail/" passHref>
                      <a target="_blank" rel="noopener noreferrer">
                        <MailOutlineIcon
                          fontSize="inherit"
                          sx={{ marginTop: "3px" }}
                        />
                      </a>
                    </Link>
                  </IconButton>

                  <IconButton
                    variant="contained"
                    aria-label="delete"
                    size="small"
                    title="What's App"
                    sx={{
                      color: "white",
                      backgroundColor: "#0cb70c",
                      borderRadius: "5px",
                      transition: "all 0.5s ease-in-out",
                      margin: "5px",
                      padding: "5px 8px",
                      "&:hover": {
                        backgroundColor: "#0cb70c",
                        opacity: 0.7,
                        transform: "scale(1.2)",
                      },
                    }}
                  >
                    <Link
                      href="https://api.whatsapp.com/send/?phone=8801991166550&text&app_absent=0"
                      passHref
                    >
                      <a target="_blank" rel="noopener noreferrer">
                        <WhatsAppIcon
                          fontSize="inherit"
                          sx={{ marginTop: "3px" }}
                        />
                      </a>
                    </Link>
                  </IconButton>

                  <IconButton
                    variant="contained"
                    aria-label="delete"
                    size="small"
                    sx={{
                      color: "white",
                      backgroundColor: "red",
                      transition: "all 0.5s ease-in-out",
                      borderRadius: "5px",
                      margin: "5px",
                      padding: "5px 8px",
                      "&:hover": {
                        backgroundColor: "red",
                        opacity: 0.7,
                        transform: "scale(1.2)",
                      },
                    }}
                    title="Ehsan Marketing You Tube Channel"
                  >
                    <Link
                      href="https://www.youtube.com/channel/UCeYgucTxBtD-d1AwdfBBvqg/videos"
                      passHref
                    >
                      <a target="_blank" rel="noopener noreferrer">
                        <YouTubeIcon
                          fontSize="inherit"
                          sx={{ marginTop: "3px" }}
                        />
                      </a>
                    </Link>
                  </IconButton>

                  <IconButton
                    variant="contained"
                    aria-label="delete"
                    size="small"
                    title="print"
                    sx={{
                      color: "white",
                      backgroundColor: "#500f1b",
                      borderRadius: "5px",
                      margin: "5px",
                      padding: "8px 8px",
                      transition: "all 0.5s ease-in-out",
                      "&:hover": {
                        backgroundColor: "#500f1b",
                        opacity: 0.7,
                        transform: "scale(1.2)",
                      },
                    }}
                  >
                    <ReactToPrint
                      trigger={() => (
                        <LocalPrintshopIcon
                          fontSize="inherit"
                          sx={{ marginTop: "3px" }}
                        />
                      )}
                      content={() => componentRef?.current}
                    ></ReactToPrint>
                  </IconButton>
                </Box>
              </Grid>

              {/* more info/right sidebar  */}
              <Grid
                item
                xs={12}
                md={3}
                sx={{
                  backgroundColor: "white",
                  padding: "20px",
                }}
              >
                <Stack>
                  {/* DELIVERY OPTIONS   */}
                  <Box>
                    <Divider
                      sx={{
                        borderTop: "1px dashed rgba(0, 0, 0, 0.35)",
                        marginBottom: "5px",
                      }}
                    />
                    <Typography variant="subtitle2">
                      DELIVERY OPTIONS
                    </Typography>

                    <MenuItem sx={{ paddingLeft: "0px", fontSize: "12px" }}>
                      <ListItemIcon>
                        <LocationOnIcon fontSize="small" />
                      </ListItemIcon>
                      Uttara sector#10, Dhaka
                    </MenuItem>

                    <MenuItem
                      sx={{
                        paddingLeft: "0px",
                        fontSize: "12px",
                        alignItems: "start",
                      }}
                    >
                      <ListItemIcon>
                        <HomeIcon fontSize="small" />
                      </ListItemIcon>
                      <Stack>
                        <Typography variant="caption" component="p">
                          Home Delivery{" "}
                        </Typography>
                        <Typography variant="caption" component="p">
                          3-5 days (Free)
                        </Typography>
                      </Stack>
                    </MenuItem>

                    <MenuItem
                      sx={{
                        paddingLeft: "0px",
                        fontSize: "12px",
                        alignItems: "start",
                      }}
                    >
                      <ListItemIcon>
                        <LocalShippingIcon fontSize="small" />
                      </ListItemIcon>
                      <Stack>
                        <Typography variant="caption" component="p">
                          Express Delivery
                        </Typography>
                        <Typography variant="caption" component="p">
                          2 days (Extra Charge $2)
                        </Typography>
                      </Stack>
                    </MenuItem>

                    <MenuItem sx={{ paddingLeft: "0px", fontSize: "12px" }}>
                      <ListItemIcon>
                        <KeyboardIcon fontSize="small" />
                      </ListItemIcon>
                      Cash on delivery available
                    </MenuItem>
                  </Box>

                  {/* RETURN and WARRENTY */}
                  <Box>
                    <Divider
                      sx={{
                        borderTop: "1px dashed rgba(0, 0, 0, 0.35)",
                        marginBottom: "5px",
                      }}
                    />
                    <Typography variant="subtitle2" component="span">
                      RETURN &amp; WARRENTY
                    </Typography>

                    <MenuItem
                      sx={{
                        paddingLeft: "0px",
                        fontSize: "12px",
                        alignItems: "start",
                      }}
                    >
                      <ListItemIcon>
                        <ReplayIcon fontSize="small" />
                      </ListItemIcon>
                      <Stack>
                        <Typography variant="caption" component="p">
                          {singleProduct?.product?.warranty} Days Return
                        </Typography>
                        <Typography variant="caption" component="p">
                          Change of mind is not applicable.
                        </Typography>
                      </Stack>
                    </MenuItem>

                    <MenuItem
                      sx={{
                        paddingLeft: "0px",
                        fontSize: "12px",
                        alignItems: "start",
                      }}
                    >
                      <ListItemIcon>
                        <FavoriteIcon fontSize="small" />
                      </ListItemIcon>
                      24 Seller Warranty
                    </MenuItem>
                  </Box>

                  {/* SHOP REVIEW  */}
                  <Box>
                    <Divider
                      sx={{
                        borderTop: "0.1px dashed rgba(0, 0, 0, 0.35)",
                        marginBottom: "5px",
                      }}
                    />
                    <Typography variant="subtitle2" component="span">
                      SHOP REVIEW
                    </Typography>

                    <Box
                      sx={{
                        border: "0.1px solid #e3e5ed",
                        margin: "5px 0px",
                        padding: "5px",
                      }}
                    >
                      <Typography
                        varient="caption"
                        component="span"
                        sx={{
                          fontSize: "8px",
                        }}
                      >
                        POSITIVE SELLER RATINGS
                      </Typography>
                      <Typography
                        varient="caption"
                        sx={{
                          fontSize: "14px",
                        }}
                      >
                        90%
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        border: "0.1px solid #e3e5ed",
                        margin: "5px 0px",
                        padding: "5px",
                      }}
                    >
                      <Typography
                        varient="caption"
                        component="span"
                        sx={{
                          fontSize: "8px",
                        }}
                      >
                        Shop On Time
                      </Typography>
                      <Typography
                        varient="caption"
                        sx={{
                          fontSize: "14px",
                        }}
                      >
                        90%
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        border: "0.1px solid #e3e5ed",
                        margin: "5px 0px",
                        padding: "5px",
                      }}
                    >
                      <Typography
                        varient="caption"
                        component="span"
                        sx={{
                          fontSize: "8px",
                        }}
                      >
                        Chat Response Time
                      </Typography>
                      <Typography
                        varient="caption"
                        sx={{
                          fontSize: "14px",
                        }}
                      >
                        100%
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </Grid>
            </Grid>

            {/* product video button  */}
            <Grid
              item
              xs={12}
              sx={{
                backgroundColor: "var(--secondary)",
                marginTop: "30px",
              }}
            >
              <PlayProductVideo />
            </Grid>
          </Grid>

          {/* shop  */}
          <Grid
            container
            sx={{
              margin: "20px 0px",
            }}
          >
            {/* shop profile  */}
            <Grid item xs={12} sm={12} md={4}>
              <Card sx={{ maxWidth: 345, margin: { xs: "0 auto", md: "0px" } }}>
                <CardActionArea sx={{ width: "100%", height: "200px" }}>
                  <CardMedia
                    component="img"
                    image={
                      singleProduct?.product?.shop?.shopImage
                        ? singleProduct?.product?.shop?.shopImage
                        : "/images/products/shop.webp"
                    }
                    alt="green iguana"
                    sx={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                </CardActionArea>

                <CardContent sx={{ padding: "10px" }}>
                  <Stack>
                    <Typography variant="caption" component="p">
                      {singleProduct?.product?.shop?.name} Shop
                    </Typography>
                    <Typography variant="subtitle2">Top Brands</Typography>
                    <Typography variant="caption">
                      100.0% Positive feedback
                    </Typography>
                    <Typography variant="caption">
                      {follow == 1 ? follow : "0"} Followers
                    </Typography>
                  </Stack>
                </CardContent>
                <Divider />
                <CardActions>
                  <Link href={`/shop/${singleProduct?.product?.shop?.slug}`}>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<HomeIcon />}
                      sx={{
                        backgroundColor: "#666",
                        padding: { xs: "5px", sm: "5px" },
                        fontSize: { xs: "12px" },
                        width: { xs: "250px" },
                      }}
                    >
                      Go To Shop
                    </Button>
                  </Link>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<AddIcon />}
                    sx={{
                      backgroundColor: `${fbgColor}`,
                      padding: { xs: "5px", sm: "5px" },
                      fontSize: { xs: "12px" },
                      width: { xs: "250px" },
                    }}
                    onClick={() => handlefollow()}
                  >
                    Follow
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            {/* shop details  */}
            <Grid
              item
              xs={12}
              sm={12}
              md={8}
              sx={{ backgroundColor: "var(--white)" }}
            >
              <Shop singleProduct={singleProduct} />
            </Grid>
          </Grid>

          {/* related products  */}
          <Grid container spacing={2}>
            {singleProduct?.product?.products?.edges?.map((relatedProduct) => (
              <Grid item md={4} xs={12} key={relatedProduct?.node?.id}>
                {" "}
                <Product product={relatedProduct} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

// dynamic path for dynamic static site generation
export const getStaticPaths = async () => {
  const res = await useProducts(null, 10);

  const paths = res?.data?.products?.edges.map((product) => {
    return {
      params: {
        productId: `${product.node.id}`,
      },
    };
  });

  return {
    paths: paths,
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const { params } = context;

  const res = await useSingleProduct(params.productId);

  if (res.data.product == null) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      singleProduct: res.data,
    },
  };
};

export default ProductDetails;
