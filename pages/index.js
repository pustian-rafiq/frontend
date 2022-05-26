import React, { useState, useContext, useEffect } from "react";

//  components / apollo client
import Title from "../components/Header/Title";
import HeroSection from "../components/HeroSection/HeroSection";
import Products from "../components/Products/Products";
import Map from "../components/Map/Map";
import Reviews from "../components/Reviews/Reviews";
import useAllCategory from "../apolloClient/queries/category/allCategoryQuery";
import useSearchConsumers from "../apolloClient/queries/consumer/searchConsumer_RightSidebar";
import useProducts from "../apolloClient/queries/products/productsQuery";
import useHeroslider from "../apolloClient/queries/heroSlider/heroSlider";
import useEhsanDetails from "../apolloClient/queries/heroSlider/ehsanDetails";
import useComments from "../apolloClient/queries/comments/comments";
import HistoricalSlider from "../components/HistoricalSlider/HistoricalSlider";
import useCartList from "../apolloClient/queries/cart/useCartListQuery";
import { useWishlistsOnClientSide } from "../apolloClient/queries/wishlist/wishlistQuery";
import useSliderNotice from "../apolloClient/queries/sliderNotice/sliderNotice";
import client from "../apolloClient/configuration/apolloConfig";

import {
  useHistoryGallaryOnServerSide,
  GET_GALLARY,
} from "../apolloClient/queries/historicalGallary/historicalGalleryQuery";

// global context
import { GlobalContext } from "./_app";

const Home = ({
  category,
  searchConsumer,
  allProductsFromServerSide,
  heroSliders,
  ehsanDetails,
  comments,
  notice,
}) => {
  const { token, allProductState, setAllProductState } =
    useContext(GlobalContext);
  // const [allProductFromServerSideState, setAllProductFromServerSideState] =
  //   useState(allProductsFromServerSide);

  const [hasMoreProduct, setHasMoreProduct] = useState(true);

  // get cart items
  const { cartListData } = useCartList(token);

  // get wishlist item
  const { wishLists } = useWishlistsOnClientSide(token);

  // get more products on page load
  const fetchMoreProductsHandler = async () => {
    // let refetchEndCursor = allProductState?.data?.products?.pageInfo?.endCursor;
    let refetchEndCursor = allProductState?.data?.products?.pageInfo?.endCursor;

    let allProductsFromClientSide = await useProducts(refetchEndCursor, 6);

    if (allProductsFromClientSide?.data?.products.edges.length <= 0) {
      setHasMoreProduct(false);
    } else {
      let newEdges = allProductsFromClientSide?.data?.products?.edges;

      let newPageInfo = allProductsFromClientSide?.data?.products?.pageInfo;

      setAllProductState((prevState) => {
        return {
          data: {
            products: {
              edges: [...prevState?.data?.products?.edges, ...newEdges],
              pageInfo: newPageInfo,
            },
          },
          loading: allProductsFromClientSide.loading,
          networkStatus: allProductsFromClientSide.networkStatus,
        };
      });
    }
  };

  return (
    <>
      <Title>Ehsan Marketing</Title>
      <HeroSection
        category={category}
        searchConsumer={searchConsumer}
        heroSliders={heroSliders}
        ehsanDetails={ehsanDetails}
        notice={notice}
      />

      <Products
        title="Last Updated Products"
        allProducts={allProductState}
        fetchMoreProductsHandler={fetchMoreProductsHandler}
        hasMoreProduct={hasMoreProduct}
        cartList={cartListData?.me?.consumers?.carts?.edges}
        wishList={wishLists?.me?.consumers?.wishlists?.products?.edges}
      />
      <Reviews comments={comments} />
      {token && <HistoricalSlider />}
      <Map />
    </>
  );
};

export const getStaticProps = async () => {
  const categories = await useAllCategory();
  const searchConsumer = await useSearchConsumers();
  const allProductsFromServerSide = await useProducts(null, 12);
  const heroSliders = await useHeroslider();
  const ehsanDetails = await useEhsanDetails();
  const comments = await useComments(8);
  const notice = await useSliderNotice(5);

  return {
    props: {
      category: categories,
      searchConsumer: searchConsumer,
      allProductsFromServerSide: allProductsFromServerSide,
      heroSliders,
      ehsanDetails,
      comments,
      notice,
    },
  };
};

export default Home;
