import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

// mui components
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

// icons
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";

// components/apollo client
import HeaderTop from "./HeaderTop";
import UserOptions from "./UserOptions";
import CartItemsList from "./CartItemsList";
import WishList from "./WishList";
import Notification from "./Notification";
import ResponsiveSubCategory from "./ResponsiveSubCategory";

//apollo clint

import {
  Use_City_Division,
  use_continent_withCountry,
  Use_Country_Division,
} from "../../apolloClient/queries/mainHeader/categoryproduct";
import useCartList from "../../apolloClient/queries/cart/useCartListQuery";
import useSearchProduct from "../../apolloClient/queries/searchProduct/searchProduct";

// global context
import { GlobalContext } from "../../pages/_app";

// css
import styles from "../../styles/Header/Header.module.css";

const Header = ({ category }) => {
  const [toggleMenuIcon, setToggleMenuIcon] = useState(true);

  // context
  const {
    token,
    setAllProductState,
    allProductState,
    globalProductHandler,
    setContinent,
    continent,
    productName,
    setProductName,
    continentname,
    setContinentname,
    countryid,
    setCountryid,
    CountryName,
    setCountryName,
    StateName,
    setStateName,
    city,
    setCity,
    LocationName,
    setLocationName,
  } = useContext(GlobalContext);

  // get cart items
  const { cartListLoading, cartListError, cartListData } = useCartList(token);

  // get continent
  const { loading, error, data } = useQuery(use_continent_withCountry);

  // get devision
  const { loading: divisionLoading, data: divisionData } = useQuery(
    Use_Country_Division,
    {
      variables: {
        id: countryid,
      },
    }
  );

  // get city division
  const { loading: cityLoading, data: cityData } = useQuery(Use_City_Division, {
    variables: {
      id: city,
    },
  });

  if (loading) {
    //  return <p>loading the data </p>
  } else {
    const selectedContinent = data?.continents?.edges?.filter(
      (cty) => cty?.node?.name === continent
    );
    const countriess =
      selectedContinent && selectedContinent[0]?.node?.countries?.edges;
  }

  const {
    data: searchProductData,
    loading: searchProductLoading,
    error: searchProductError,
  } = useSearchProduct({
    originCountry_Continent_Name_Icontains: continentname,
    originCountry_Name_Icontains: CountryName,
    shop_DivisionOrState_Name_Icontains: StateName,
    shop_Municipality_Name_Icontains: LocationName,
    name_Icontains: productName,
  });

  const ssdata = { data: searchProductData };
  // console.log('search products::',ssdata);

  useEffect(() => {
    if (!searchProductLoading && ssdata) {
      setAllProductState(ssdata);
    }
  }, [searchProductData]);

  // catch for continent
  const handleChange = (event) => {
    setContinent(event.target.value);

    // let continent = data?.continents?.edges?.find(item=>item?.node?.id==event.target.value);

    // console.log('continent',continent?.node?.name);
    setContinentname(event.target.value);
  };

  const handleCountry = (e) => {
    setCountryid(e.target.value);
    let countryvalue = countriess?.find(
      (item) => item?.node?.id == e.target.value
    );

    // let countryId = data?.continents?.edges?.find(item=>item?.node?.id==event.target.value);

    setCountryName(countryvalue?.node?.name);
  };

  //handle division or state name

  const handleDivision = (e) => {
    setCity(e.target.value);

    const divisionAll = divisionData?.country?.divisionOrStates?.edges?.find(
      (item) => item?.node?.id == e.target.value
    );
    // console.log('countryvalue',divisionAll?.node?.name);
    setStateName(divisionAll?.node?.name);
  };

  // city or townwise product search
  const handleCityTown = (e) => {
    const cityTownAll =
      cityData?.divisionOrState?.districtOrCities?.edges?.find(
        (item) => item?.node?.id == e.target.value
      );
  };

  // sticky header handler
  if (typeof window !== "undefined") {
    const stickyHeaderHandler = () => {
      let mainStickyHeader = document.getElementById("main_header");

      if (mainStickyHeader) {
        if (window.scrollY > 50) {
          mainStickyHeader.style.top = "-1px";
        } else {
          mainStickyHeader.style.top = "-60px";
        }
      }
    };

    window.addEventListener("scroll", stickyHeaderHandler);
  }

  // scroll handler in responsive search
  const scrollResSearchHeaderHandler = () => {
    let mainSearchStickHeader = document.getElementById("main_header");

    if (window.scrollY > 100) {
      mainSearchStickHeader.style.display = "block";
    } else {
      mainSearchStickHeader.style.display = "none";
    }
  };

  // open search content
  const openSearchHandler = () => {
    let target = document.getElementById("content");
    target.style.height = "100vh";
    let openMainSearchHeader = document.getElementById("main_header");

    openMainSearchHeader.style.cssText = `
      display: none;
    `;

    // add window scroll
    window.addEventListener("scroll", scrollResSearchHeaderHandler);
  };

  // close search content
  const closeSearchHandler = () => {
    let target = document.getElementById("content");
    let closeMainHeader = document.getElementById("main_header");
    target.style.height = "0px";

    closeMainHeader.style.cssText = `
      display: block;
    `;

    // remove window scroll
    window.removeEventListener("scroll", scrollResSearchHeaderHandler);
  };

  // open subcategory menu content
  const openSubCategoryHandler = () => {
    let subCategory = document.getElementById("subcategory");
    subCategory.style.height = "300px";
    setToggleMenuIcon(false);
  };

  // subcategory menu content
  const closeSubCategoryHandler = () => {
    let subCategory = document.getElementById("subcategory");
    subCategory.style.height = "0px";
    setToggleMenuIcon(true);
  };

  const handleSearchProducts = () => {};

  const handleSearchLocationName = (e) => {
    // console.log("loation name :", e.target.value);
    setLocationName(e.target.value);
  };

  const handleSearchProductName = (e) => {
    setProductName(e.target.value);
  };

  return (
    <>
      {/* header top  */}
      <HeaderTop />

      {/* main header  */}
      <Box className={styles.header_container} id="main_header">
        <Box className={styles.header}>
          <Container>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {/* EM logo  */}
              <Box
                sx={{
                  flexGrow: { xs: 1, md: 0 },
                  margin: "0px 10px",
                  display: "flex",
                  padding: { xs: "0px", md: "5px" },
                  justifyContent: { xs: "flex-start", md: "center" },
                  alignItems: "center",
                }}
              >
                <Link href="/">
                  <Typography component="div">
                    <StarBorderPurple500Icon
                      fontSize="medium"
                      sx={{
                        cursor: "pointer",
                        marginRight: "7px",
                        marginTop: "4px",
                      }}
                    />{" "}
                  </Typography>
                </Link>

                <Link href="/">
                  <Typography
                    sx={{
                      marginLeft: "5px",

                      cursor: "pointer",
                      fontSize: { xs: "14px", md: "16px", lg: "24px" },
                      display: { xs: "none", sm: "block" },
                      color: "#fff",
                    }}
                    component="div"
                    className={styles.eshan_header}
                  >
                    Ehsan Marketing
                  </Typography>
                </Link>
              </Box>

              {/* dropdown search options  */}
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                  margin: { xs: "0px", md: "4px" },
                  backgroundColor: "var(--white)",
                  padding: { xs: "0px", md: "4px" },
                  borderRadius: "40px",
                  width: { xs: "none", md: "60%" },
                }}
              >
                <Box>
                  <select id="contient" name="continet" onChange={handleChange}>
                    <option value="">Continent</option>
                    {!loading &&
                      data?.continents?.edges?.map((cname) => (
                        <option value={cname?.node?.name} key={cname?.node?.id}>
                          {cname?.node?.name}
                        </option>
                      ))}
                  </select>
                </Box>
                <Box className={styles.varticle_divider}></Box>

                <Box>
                  <select id="contient" name="country" onChange={handleCountry}>
                    <option value="">Country</option>

                    {!loading &&
                      countriess?.map((ct) => (
                        <option value={ct?.node?.id} key={ct?.node?.id}>
                          {ct?.node?.name.slice(0, 15)}{" "}
                        </option>
                      ))}
                  </select>
                </Box>
                <Box className={styles.varticle_divider}></Box>

                <Box>
                  <select id="contient" name="State" onChange={handleDivision}>
                    <option value="">State/Divsion</option>
                    {!loading &&
                      divisionData?.country?.divisionOrStates?.edges?.map(
                        (dname) => (
                          <option value={dname?.node?.id} key={dname?.node?.id}>
                            {dname?.node?.name}
                          </option>
                        )
                      )}
                  </select>
                </Box>
                <Box className={styles.varticle_divider}></Box>

                <Box>
                  <select id="contient" name="city" onChange={handleCityTown}>
                    <option value="">City/Town</option>
                    {!loading &&
                      cityData?.divisionOrState?.districtOrCities?.edges?.map(
                        (cityname) => (
                          <option
                            value={cityname?.node?.id}
                            id={cityname?.node?.id}
                          >
                            {cityname?.node?.name}
                          </option>
                        )
                      )}
                  </select>
                </Box>
                <Box className={styles.varticle_divider}></Box>

                <Box
                  sx={{
                    width: { xs: "5px", md: "80px", lg: "120px" },
                  }}
                >
                  <input
                    type="text"
                    placeholder="location"
                    size="8"
                    onChange={(e) => handleSearchLocationName(e)}
                    className={styles.location_search_on_header}
                  />
                </Box>
                <Box className={styles.varticle_divider}></Box>

                <Box>
                  <input
                    type="text"
                    placeholder="products"
                    size="10"
                    className={styles.location_search_on_header}
                    onChange={(e) => handleSearchProductName(e)}
                  />
                </Box>
                <Box className={styles.varticle_divider}></Box>

                <Box>
                  <Link href="/">
                    <SearchIcon
                      sx={{
                        marginTop: "5px",
                        marginLeft: { xs: "0px", md: "0px", lg: "12px" },
                        cursor: "pointer",
                        height: "20px",
                        color: "var(--primary)",
                        textAlign: "center",
                      }}
                      onClick={handleSearchProducts}
                    />
                  </Link>
                </Box>
              </Box>

              {/* responsive search button  */}
              <Box
                sx={{
                  display: { xs: "flex", md: "none" },
                }}
                onClick={openSearchHandler}
              >
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <SearchIcon />
                </IconButton>
              </Box>

              {/* wishlist, notification cart and user section  */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  cursor: "pointer",
                }}
              >
                {/* wishlist  */}
                <WishList />

                {/* notification  */}
                <Notification />

                {/* cart items list  */}
                {token !== null && (
                  <CartItemsList
                    cartItemList={cartListData}
                    cartListLoading={cartListLoading}
                  />
                )}

                {/* user options  */}
                <UserOptions />
              </Box>

              {/* responsive subcategory menu button  */}
              <Box
                sx={{
                  display: { xs: "flex", md: "none" },
                }}
              >
                {toggleMenuIcon ? (
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={openSubCategoryHandler}
                  >
                    <MenuIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={closeSubCategoryHandler}
                  >
                    <CloseIcon />
                  </IconButton>
                )}
              </Box>
            </Box>
          </Container>
        </Box>

        {/* responsive subcategory  after click on menu button  */}
        <Box
          sx={{
            display: { md: "none" },
            width: "100%",
            height: { xs: "0px", md: "0px" },
            position: "sticky",
            zIndex: "1000",
            top: "50px",
            left: "0",
            color: "white",
            overflowX: "hidden",
            overflowY: "auto",
            transition: "0.5s",
          }}
          id="subcategory"
        >
          <ResponsiveSubCategory category={category} />
        </Box>
      </Box>

      {/* responsive dropdown after click on search button */}
      <Box
        sx={{
          width: "100%",
          height: "0px",
          position: "fixed",
          zIndex: "1000",
          top: "0px",
          left: "0",
          backgroundColor: "rgba(0,0,0, 0.9)",
          color: "white",
          overflowX: "hidden",
          transition: "0.5s",
        }}
        id="content"
      >
        {/* close button  */}
        <Box
          sx={{
            position: "absolute",
            top: "20px",
            right: "45px",
            fontSize: "60px",
            cursor: "pointer",
          }}
          onClick={closeSearchHandler}
        >
          <CloseIcon />
        </Box>

        {/* main content  */}
        <Container
          sx={{
            position: "relative",
            top: "20%",
            width: "80%",
            textAlign: "center",
          }}
        >
          <Grid container columnSpacing={2}>
            <Grid item xs={6} sx={{ margin: "10px 0px" }}>
              <select
                className="responsiveSearch"
                name="continet"
                onChange={handleChange}
              >
                <option value="">Continent</option>
                {!loading &&
                  data?.continents?.edges?.map((cname) => (
                    <option value={cname?.node?.name} key={cname?.node?.id}>
                      {cname?.node?.name}
                    </option>
                  ))}
              </select>
            </Grid>

            <Grid item xs={6} sx={{ margin: "10px 0px" }}>
              <select
                className="responsiveSearch"
                name="country"
                onChange={handleCountry}
              >
                <option value="">Country</option>

                {!loading &&
                  countriess?.map((ct) => (
                    <option value={ct?.node?.id} key={ct?.node?.id}>
                      {ct?.node?.name.slice(0, 15)}{" "}
                    </option>
                  ))}
              </select>
            </Grid>

            <Grid item xs={6} sx={{ margin: "10px 0px" }}>
              <select
                className="responsiveSearch"
                name="State"
                onChange={handleDivision}
              >
                <option value="">State/Divsion</option>
                {!loading &&
                  divisionData?.country?.divisionOrStates?.edges?.map(
                    (dname) => (
                      <option value={dname?.node?.id} key={dname?.node?.id}>
                        {dname?.node?.name}
                      </option>
                    )
                  )}
              </select>
            </Grid>

            <Grid item xs={6} sx={{ margin: "10px 0px" }}>
              <select
                className="responsiveSearch"
                name="city"
                onChange={handleCityTown}
              >
                <option value="resion">City/Town</option>
                {!loading &&
                  cityData?.divisionOrState?.districtOrCities?.edges?.map(
                    (cityname) => (
                      <option
                        value={cityname?.node?.id}
                        key={cityname?.node?.id}
                      >
                        {cityname?.node?.name}
                      </option>
                    )
                  )}
              </select>
            </Grid>

            <Grid item xs={6} sx={{ margin: "10px 0px" }}>
              <input
                type="text"
                placeholder="Location"
                className="responsiveSearch"
                // id="responsiveSearchlocation"
                onChange={(e) => handleSearchLocationName(e)}
              />
            </Grid>

            <Grid item xs={6} sx={{ margin: "10px 0px" }}>
              <input
                type="text"
                placeholder="product name"
                className="responsiveSearch"
                // id="responsiveSearchproduct"
                onChange={(e) => handleSearchProductName(e)}
              />
            </Grid>

            <Grid item xs={12} md={12} sx={{ margin: "10px 0px" }}>
              <Button
                variant="contained"
                sx={{ backgroundColor: "var(--primary)", color: "black" }}
                onClick={closeSearchHandler}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Header;
