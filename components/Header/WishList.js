import React, { useEffect, useState, useRef, useContext } from "react";
import Link from "next/link";

// mui components
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuList from "@mui/material/MenuList";

// mui icons
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DeleteIcon from "@mui/icons-material/Delete";

//query from database

import useWishlists, {
  GET_WISHLISTS,
} from "../../apolloClient/queries/wishlist/wishlistQuery";
import { useQuery } from "@apollo/client";
import { GlobalContext } from "../../pages/_app";
import useDeleteWishlist from "../../apolloClient/mutation/wishlist/wishlistDelete";
import { padding } from "@mui/system";

const WishList = () => {
  //use context for token
  const { token, currentUser } = useContext(GlobalContext);

  const { data, loading, error } = useQuery(GET_WISHLISTS, {
    context: {
      headers: {
        Authorization: `JWT ${token}`,
      },
    },
    fetchPolicy: "cache-and-network",
  });

  //delete wishlist
  const { wishListDelete } = useDeleteWishlist();

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
  const prevOpen = React.useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  // delete item from wishlist handler 
  const deleteItemFromWishListHandler = (id) => {
    swal({
      title: "Are you sure to Remove ?",
      text: "Once deleted, you will not be able to recover this add to cart details",
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
        swal("Your cart item is safe!");
      }
    });
  };

  return (
    <>
      <Badge
        badgeContent={data?.me?.consumers?.wishlists?.productCount ? data?.me?.consumers?.wishlists?.productCount : 0}
        max={999}
        color="secondary"
        sx={{
          color: "white",
          margin: { xs: "0px 5px", md: "0px 1px" },
        }}
      >
        <Tooltip title="Your WishList">
          <IconButton
            size="small"
            sx={{ ml: { sx: "0px", md: "1px" } }}
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? "composition-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <FavoriteBorderIcon
              sx={{
                color: "white",
                fontSize: { xs: "17px", md: "17px" }
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
            <Paper sx={{
              width:'280px',
              position:'absolute',
              right:'-107px',
              height:'450px'
              }}>
              <ClickAwayListener onClickAway={handleClose}>
                   <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                  
                  
                >
                  <Box>
                    
                    <Box sx={{display:'flex',justifyContent:'center'}}> 
                     <FavoriteBorderIcon
                      sx={{
                        color: "var(--primary)",
                        fontSize: { xs: "17px", md: "22px" },
                        mr:'7px'
                       
                      }}
                    /> 
                    <Typography variant="body2" sx={{fontWeight:'500'}}>Your selected wishlist</Typography>
                    </Box> 

                    <Typography
                      variant="body2"
                      sx={{ fontSize: "10px", textAlign: "center",lineHeight:'25px' }}
                    >
                       You Have {data?.me?.consumers?.wishlists?.productCount}{" "}
                      Wishlists
                    </Typography>
                  </Box>

                  <Divider sx={{ boxShadow:'2px 2px 2px gray' }} />

                  <Box sx={{height:'340px',overflowY:'auto'}}>  

                  {data?.me?.consumers?.wishlists?.products?.edges.map(
                    (wishlistItem) => (
                      //  show the wishlist products

                      <Box
                        sx={{ my: "15px"}}
                        key={wishlistItem?.node?.id}
                      >
                        <Grid container spacing={0}>
                          <Grid item xs={6} md={3}>
                            <img
                              src={wishlistItem?.node?.productImage}
                              alt=""
                              height="50"
                              width="100"
                              style={{padding:'4px 0px 5px 8px' }}
                            />
                          </Grid>

                          <Grid item xs={6} md={6}>
                            <Typography variant="body2" sx={{textAlign:'center',fontSize:'13px',ml:'33px'}}>
                              {wishlistItem?.node?.name}
                            </Typography>
                          </Grid>

                          <Grid item xs={6} md={2}>
                            <DeleteIcon
                              onClick={() =>
                                deleteItemFromWishListHandler(wishlistItem?.node?.id)
                              }
                              sx={{color: 'rgba(231, 94, 40, 0.925)',
                               border:'1px solid red',
                               borderRadius:'50%',
                               height:'30px',
                               width:'30px',
                               p:'2px',
                               ml:'20px',
                               
                            }}
                            />
                          </Grid>
                        </Grid>
                        <Divider />
                      </Box>
                    )
                  )}
                  
                  </Box>
                  

               

                </MenuList>
                 
              </ClickAwayListener>
                
                
                <Box sx={{position:'absolute',bottom:'0px',borderTop:'1px solid #bdbdbd',width:'100%'}} component="div"> 
                
                  <Link href="/wishlist">
                  <Box > 
                    <MenuItem
                      sx={{ justifyContent: "center", color: "var(--primary)" }}
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
                  </Box> 
                  </Link>
                  </Box>
                  
                
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default WishList;


              