import React, { useState, useEffect, useContext } from "react";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Box } from "@mui/system";
import Title from "../../components/Header/Title";
import { Breadcrumbs, ButtonGroup, Container, Divider, Grid, Paper } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

//swet alert
import swal from "sweetalert";
import { GlobalContext } from "../_app";
import { useQuery } from "@apollo/client";
import useWishlists, {
  GET_WISHLISTS,
  useWishlistsOnClientSide,
} from "../../apolloClient/queries/wishlist/wishlistQuery";
import useDeleteWishlist from "../../apolloClient/mutation/wishlist/wishlistDelete";



const WishlistDetails = () => {

    const { token, currentUser } = useContext(GlobalContext);
 
  const { data, loading, error } = useQuery(GET_WISHLISTS, {
    context: {
      headers: {
        Authorization: `JWT ${token}`,
      },
    },
    fetchPolicy: "cache-and-network",
  });

  // console.log('wishlist data :: ', data);
  const { wishListDelete } = useDeleteWishlist();




  // remove product from wishlist handler
  const removeProductFromWishListHandler = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this wishlist product!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        wishListDelete({
          variables: {
            productId: id,
          },
          context: {
            headers: {
              Authorization: `JWT ${token}`,
            },
          },
          onCompleted: () => {
            swal("Selected Product Deleted From Wishlist", {
              icon: "success",
            });
          },
          onError: (err) => {
            swal("Selected Product Does Not Deleted From Wishlist", {
              icon: "warnings",
            });
          },
        });
      } else {
        swal("Your wishlist product is safe!");
      }
    });
  };

  if (loading) {
    return <Typography component="div">
      <img src="/images/loading.gif" alt="wishlistloading" />
    </Typography>;
  }

  return (
    <>
      {/* browser title  */}
      <Title>products/wishlist</Title>

      {/* header section  */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          my: "30px",
        }}
      >
        <FavoriteBorderIcon />
        <Typography variant="h5" color="initial">
          All Wish list products{" "}
        </Typography>
      </Box>

      {/* wishlist prodects list */}

      <Container>
        <Grid container spacing={2}>
          {data?.me?.consumers?.wishlists?.products?.edges?.map(
            (wishlistItem) => (
                  <Grid item xs={12} sm={12} md={12} order={{ xs: 1 }}
                   key={wishlistItem?.node?.id}
                  >
                <Box>
                 
                    
                      <Paper
                        elevation={3}
                        sx={{
                          border: "1px solid transparent",
                          transition: "all 0.5s linear",
                          // backgroundColor:'red',
                          // height:'150px',
                          overflow:'hidden',
                          mt: "15px",
                          ":hover": {
                            border: "1px solid var(--primary)",
                            cursor: "pointer",
                            
                          },
                        }}
                        // key={cartItem.node.id}
                      >
                        {/* <Link href={`products/${wishlistItem?.node?.id}`}>  */}
                        <Grid container spacing={1}>
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
                          removeProductFromWishListHandler(
                            wishlistItem?.node?.id
                          )
                        }
                            />
                          </Grid>

                          <Grid
                            item
                            xs={6}
                            sm={6}
                            md={3}
                            order={{ xs: 1, sm: 2 }}
                            
                          >
                            {/* <CardMedia
                              component="img"
                              height="150"
                              image={
                              wishlistItem?.node?.productImage
                                ? wishlistItem?.node?.productImage
                                : "/images/products/m-11.jpg"
                            }
                              alt="green iguana"
                              sx={{
                                border: "1px solid #d9d9d9",
                                padding: "5px",
                                margin: "10px 0px",
                               
                              }}
                            /> */}
                            <img src={wishlistItem?.node?.productImage
                                ? wishlistItem?.node?.productImage
                                : "/images/products/m-11.jpg"}
                                width="200"
                                height="150"
                                alt="green iguana"
                                style={{
                                   border: "1px solid #d9d9d9",
                                   padding: "5px",
                                   margin: "10px 0px",
                                   overflow:'hidden'
                                }}
                                />
                          </Grid>

                          <Grid
                            item
                            xs={6}
                            sm={4}
                            md={5}
                            order={{ xs: 2, sm: 3 }}
                           
                          >
                            <Typography
                              sx={{
                                marginTop: "10px",
                                fontSize: "14px",
                                color:'var(--primary)'
                              }}
                            >
                              {wishlistItem?.node?.name}
                            </Typography>

                            <Divider sx={{ my: "7px", width: "80%" }} />

                            <Box
                              sx={{
                                fontSize: "13px",
                                color: "rgba(0, 0, 0, 0.5)",
                              }}
                            >
                              <Typography
                                variant="p"
                                sx={{ display: "block", mb: "4px" }}
                              >
                                product Offer : 
                                {wishlistItem?.node?.productoffer?.amount ? wishlistItem?.node?.productoffer?.amount : 'No offer'}
                              </Typography>

                              <Typography
                                variant="p"
                                sx={{ display: "block", mb: "4px" }}
                              >
                                <Typography
                                  component="p"
                                  sx={{ mr: "5px" }}
                                  variant="caption"
                                >
                                  sell_Price: {wishlistItem?.node?.sellPrice} ৳
                                </Typography>

                                <Typography
                                  component="p"
                                  sx={{ mr: "5px" }}
                                  variant="caption"
                                >
                                  sell_Price: ${wishlistItem?.node?.sellPriceDolar}
                                </Typography>
                                
                              </Typography>

                              <Typography
                                variant="p"
                                sx={{ display: "block", mb: "4px" }}
                              >
                                Made By: {wishlistItem?.node?.originCountry?.name}
                              </Typography>

                              <Typography
                                variant="p"
                                sx={{ display: "block", mb: "4px" }}
                              >
                                In Stock: {wishlistItem?.node?.quantity >0
                                  ? "Available": " Not Available"}{" "}
                              </Typography>

                           
                            </Box>
                          </Grid>

                     
                          <Grid
                            item
                            xs={5}
                            sm={3}
                            md={3}
                            sx={{ textAlign: "center", mt: "45px"
                            
                          }}
                            order={{ xs: 4, sm: 5 }}
                          >
                           
                            <Box sx={{display:'flex'}}> 

                          
                          <Link href={`products/${wishlistItem?.node?.id}`}> 
                            <Typography variant="body2" sx={{backgroundColor:'#4f9999',
                             color:'#fff',
                             width:'40%',
                             p:'5px',
                             borderRadius:'7px',
                             letterSpacing:'1px'
                             
                          }}>
                             view
                              
                            </Typography>
                           </Link>
                            {/* add to cart  sections  */}


                          <Typography variant="body2" sx={{backgroundColor:'var(--primary)',
                             color:'#fff',
                             width:'43%',
                             p:'7px',
                             marginLeft:'7px',
                             borderRadius:'7px'
                          }}
                          
                          onClick={() =>
                            productAddToCartHandler(singleProduct?.product)
                          }

                          >
                              Add To Cart 
                              
                            </Typography>
                            </Box>
                            
                            
                          </Grid>
                        </Grid>

                        {/* </Link> */}

                      </Paper>
                    
                 
                </Box>

           
              </Grid>
            )
          )}


        </Grid>
      </Container>
    </>
  );
};

export default WishlistDetails;


  //  <Grid
  //               item
  //               xs={12}
  //               sm={6}
  //               md={3}
  //               lg={4}
  //               key={wishlistItem?.node?.id}
  //             >
  //               <Card style={{ width: "300px" }}>
  //                 <CardMedia
  //                   component="img"
  //                   alt="green iguana"
  //                   height="140"
  //                   image={
  //                     wishlistItem?.node?.productImage
  //                       ? wishlistItem?.node?.productImage
  //                       : "/images/products/m-11.jpg"
  //                   }
  //                 />
  //                 {/* content  */}
  //                 <CardContent sx={{ padding: "5px 8px" }}>
  //                   {/* header  */}
  //                   <Grid
  //                     container
  //                     justifyContent="space-between"
  //                     alignItems="center"
  //                   >
  //                     <Grid item>
  //                       <Typography
  //                         gutterBottom
  //                         variant="p"
  //                         sx={{
  //                           color: "#007bff",
  //                           fontSize: "16px",
  //                           m: "7px 0px 4px 0px",
  //                           display: "block",
  //                         }}
  //                       >
  //                         {wishlistItem?.node?.name?.slice(0, 70)}
  //                       </Typography>
  //                     </Grid>
  //                     <Grid item>
  //                       <Typography
  //                         gutterBottom
  //                         variant="caption"
  //                         sx={{
  //                           backgroundColor: "#ffff80",
  //                           padding: "3px 6px",
  //                           borderRadius: "10px",
  //                           color: "green",
  //                           textTransform: "capitalize",
  //                           fontSize: "9px",
  //                         }}
  //                       >
  //                         new
  //                       </Typography>
  //                     </Grid>
  //                   </Grid>

  //                   {/* rating  */}
  //                   <Box
  //                     sx={{
  //                       width: 200,
  //                       display: "flex",
  //                       alignItems: "center",
  //                     }}
  //                   ></Box>
  //                   <Divider
  //                     sx={{
  //                       borderBottom: "1px dashed rgba(0, 0, 0, 0.29)",
  //                       mt: "5px",
  //                     }}
  //                   />

  //                   {/* price  */}
  //                   <Box mt={1}>
  //                     <Typography variant="caption">
  //                       <>
  //                         <del style={{ color: "gray", fontSize: "14px" }}>
  //                           &#2547;
  //                           {wishlistItem?.node?.sellPrice +
  //                             wishlistItem?.node?.productoffer?.amount}
  //                         </del>
  //                         <Typography
  //                           variant="caption"
  //                           component="span"
  //                           sx={{
  //                             backgroundColor: "var(--primary)",
  //                             borderRadius: "2px",
  //                             marginLeft: "5px",
  //                             color: "var(--white)",
  //                             padding: "2px",
  //                           }}
  //                         >
  //                           {wishlistItem?.node?.productoffer?.amount
  //                             ? wishlistItem?.node?.productoffer?.amount
  //                             : 0}{" "}
  //                           off
  //                         </Typography>
  //                       </>
  //                     </Typography>
  //                   </Box>
  //                   <Box>
  //                     <Grid container justifyContent="space-between">
  //                       <Grid item>
  //                         <Typography variant="subtitle2">
  //                           &#2547;
  //                           <span style={{ marginLeft: "2px" }}>
  //                             {wishlistItem?.node?.sellPrice
  //                               ? wishlistItem?.node?.sellPrice
  //                               : 0}
  //                           </span>{" "}
  //                           <Typography
  //                             variant="caption"
  //                             sx={{ color: "gray" }}
  //                           >
  //                             {" "}
  //                             (
  //                             {wishlistItem?.node?.quantity
  //                               ? wishlistItem?.node?.quantity
  //                               : 0}{" "}
  //                             piece){" "}
  //                           </Typography>
  //                         </Typography>
  //                       </Grid>
  //                       <Grid item>
  //                         <Typography variant="subtitle2">
  //                           $
  //                           {wishlistItem?.node?.sellPriceDolar
  //                             ? wishlistItem?.node?.sellPriceDolar
  //                             : 0}
  //                         </Typography>
  //                       </Grid>
  //                     </Grid>
  //                   </Box>

  //                   {/* made in  */}
  //                   <Typography variant="caption" color="text.secondary">
  //                     Made By{" "}
  //                     {wishlistItem?.node?.originCountry
  //                       ? wishlistItem?.node?.originCountry?.name
  //                       : "Not-Specified"}
  //                   </Typography>
  //                 </CardContent>

  //                 {/* action buttons  */}
  //                 <CardActions>
  //                   <Link href={`products/${wishlistItem?.node?.id}`}>
  //                     <Button
  //                       variant="contained"
  //                       startIcon={<AddShoppingCartIcon />}
  //                       size="small"
  //                       sx={{
  //                         backgroundColor: "var(--primary)",
  //                         fontSize: "11px",
  //                         width: "150px",
  //                         marginLeft: "15px",
  //                         "&:hover": {
  //                           backgroundColor: "rgb(31 155 197)",
  //                           transition: "0.5s",
  //                         },
  //                       }}
  //                     >
  //                       View
  //                     </Button>
  //                   </Link>

  //                   <Link href="/wishlist">
  //                     <Button
  //                       variant="contained"
  //                       startIcon={
  //                         <FontAwesomeIcon
  //                           icon={faTrashCan}
  //                           style={{ fontSize: "14px" }}
  //                         />
  //                       }
  //                       size="small"
  //                       sx={{
  //                         backgroundColor: "#8f8f8f",
  //                         width: "140px",
  //                         fontSize: "11px",
  //                         "&:hover": {
  //                           backgroundColor: "rgb(31 155 197)",
  //                           transition: "0.5s",
  //                         },
  //                       }}
  //                       onClick={() =>
  //                         removeProductFromWishListHandler(
  //                           wishlistItem?.node?.id
  //                         )
  //                       }
  //                     >
  //                       Remove
  //                     </Button>
  //                   </Link>
  //                 </CardActions>
  //               </Card>
  //             </Grid>