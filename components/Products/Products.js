import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

// mui components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

// our component
import Product from "./Product";

// css
import styles from "../../styles/Products/Products.module.css";

const Products = ({
  title,
  allProducts,
  fetchMoreProductsHandler,
  hasMoreProduct,
  wishList,
  cartList,
}) => {
  return (
    <Box className={styles.products_section}>
      <Container>
        {/* product section title  */}
        <Box className={styles.products_section_title}>
          <Typography variant="body1" sx={{ fontSize: "20px" }}>
            {title}
          </Typography>
        </Box>

        {/* products container  */}
        <Box
          className={styles.products_coantainer}
          sx={{
            height: "900px",
            overflow: "auto",
          }}
        >
          {allProducts?.data?.products?.edges.length > 0 ? (
            <InfiniteScroll
              className={styles.productInfiniteScroll}
              dataLength={allProducts?.data?.products?.edges.length}
              next={fetchMoreProductsHandler}
              hasMore={hasMoreProduct}
              scrollThreshold={0.8}
              loader={
                <Typography
                  style={{
                    textAlign: "center",
                    paddingTop: "20px",
                    marginTop: "20px",
                  }}
                >
                  <CircularProgress
                    disableShrink
                    size={30}
                    sx={{ color: "palegreen" }}
                  />
                </Typography>
              }
              endMessage={
                <Box>
                  <Typography
                    sx={{
                      textAlign: "center",
                      paddingTop: "20px",
                      marginTop: "30px",
                    }}
                  >
                    You Already Seen All Products
                  </Typography>
                </Box>
              }
            >
              <Grid container rowSpacing={3} columnSpacing={3}>
                {allProducts?.data?.products?.edges.map((product) => {
                  return (
                    <Grid
                      item
                      key={product?.node?.id}
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                      className={styles.products_responsive_coantainer}
                    >
                      <Product
                        product={product}
                        wishList={wishList}
                        cartList={cartList}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </InfiniteScroll>
          ) : (
            <Typography
              sx={{
                textAlign: "center",
                padding: "20px",
                margin: "20px",
              }}
            >
              {/* No Product Found */}
              <img src="/images/loading.gif" alt="No Product Found" />
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Products;
