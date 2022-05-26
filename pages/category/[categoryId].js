import React, { useContext, useEffect } from 'react'
import { Box, Container, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import Product from '../../components/Products/Product';

//clint query
import useSearchProduct from '../../apolloClient/queries/searchProduct/searchProduct';

//icons 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faIndent
} from "@fortawesome/free-solid-svg-icons";



//css
import styles from "../../styles/Products/Products.module.css";
import { GlobalContext } from '../_app';
import Title from '../../components/Header/Title';


const  categoryDetails= () => {
    const router = useRouter()
    const categoryName = router.query.categoryId;
    

      // from context api 

  const { 
    token, 
    setAllProductState, 
    allProductState,
    continentname,
    CountryName,
    StateName,
    LocationName,
    productName} =
useContext(GlobalContext);

// console.log('product name test:',productName)
   

    const {data,loading,error} = useSearchProduct({
    category_Name_Icontains:categoryName,
    originCountry_Continent_Name_Icontains: continentname,
    originCountry_Name_Icontains: CountryName,
    shop_DivisionOrState_Name_Icontains: StateName,
    shop_Municipality_Name_Icontains: LocationName,
    name_Icontains: productName,
    });

    useEffect(() => {
    if (!loading && data) {
      setAllProductState(data);
    }
  }, [data])

    //loading
    if(loading) return <Typography component="div" style ={{color:'green',fontSize:'25px',textAlign:'center',padding:'15px'}}>
    
     <img src="/images/loadingcat.gif" alt='categoryloading Data' />
     </Typography>

    
    return (
        
 <>
    <Title>Category product</Title>
     <Box className={styles.products_section}>
      <Container>
        {/* product section title  */}
        <Box className={styles.products_section_title}>
          <Typography variant="body1" sx={{ fontSize: "24px" }}>
           <FontAwesomeIcon icon={faIndent}  style={{color:'var(--primary)',fontSize:'24px'}}/> Category : {categoryName} 
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
          {data?.products?.edges.length > 0 ? (
            // <InfiniteScroll
            //   className={styles.productInfiniteScroll}
            //   dataLength={allProducts?.data?.products?.edges.length}
            //   next={fetchMoreProductsHandler}
            //   hasMore={hasMoreProduct}
            //   scrollThreshold={0.8}
            //   loader={
            //     <Typography
            //       style={{
            //         textAlign: "center",
            //         paddingTop: "20px",
            //         marginTop: "20px",
            //       }}
            //     >
            //       <CircularProgress
            //         disableShrink
            //         size={30}
            //         sx={{ color: "palegreen" }}
            //       />
            //     </Typography>
            //   }
            //   endMessage={
            //     <Box>
            //       <Typography
            //         sx={{
            //           textAlign: "center",
            //           paddingTop: "20px",
            //           marginTop: "30px",
            //         }}
            //       >
            //         You Already Seen All Products
            //       </Typography>
            //     </Box>
            //   }
            // >
              <Grid container rowSpacing={3} columnSpacing={3}>
                {data?.products?.edges.map((product) => {
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
                        // wishList={wishList}
                        // cartList={cartList}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            // </InfiniteScroll>
          ) : (
            <Typography
              sx={{
                textAlign: "center",
                padding: "20px",
                margin: "20px",
              }}
            >
              <img src="/images/no-product-found.png" alt="no-product-found" />
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
 </>



    );
};

export default categoryDetails;



