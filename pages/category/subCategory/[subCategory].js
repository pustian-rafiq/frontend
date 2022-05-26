import { Box, Container, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import useSearchProduct from '../../../apolloClient/queries/searchProduct/searchProduct';
import Product from '../../../components/Products/Product';

import styles from "../../../styles/Products/Products.module.css";

//icons 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faList,
  faNetworkWired
} from "@fortawesome/free-solid-svg-icons";
import Title from '../../../components/Header/Title';
import { GlobalContext } from '../../_app';

const  SubcategoryDetails= () => {
    const router = useRouter()
    const subcategoryName = router.query.subCategory;

    // console.log('subcategoryName',subcategoryName);

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
    subcategory_Name_Icontains:subcategoryName,
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

    // console.log('subcategoryProducts::',data);
    
    return (

      <>   
       <Title>Sub-Category Products</Title> 
         <Box> 
          
            <Box className={styles.products_section}>
      <Container>
        {/* product section title  */}
        <Box className={styles.products_section_title}>
          <Typography variant="body1" sx={{ fontSize: "20px" }}>
             <FontAwesomeIcon icon={faNetworkWired}  style={{color:'var(--primary)',fontSize:'20px'}}/>  SubCategory : {subcategoryName} 
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
        </Box>
      </>
    );
};

export default SubcategoryDetails;



