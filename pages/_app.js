import React, { useEffect, useState, createContext } from "react";
import { useRouter } from "next/router";
import "core-js/features/promise";
import axios from "axios";
import { ApolloProvider } from "@apollo/client";
//toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// components/apollo client
import client from "../apolloClient/configuration/apolloConfig";
import MainLayout from "../components/Layout/MainLayout";
import App from "next/app";
import useAllCategory from "../apolloClient/queries/category/allCategoryQuery";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import AdminDashboardLayout from "../components/Dashboard/AdminDashboard/AdminDashboardLayout";
import useVarifyTokenMutation from "../apolloClient/mutation/token/verifyTokenMutation";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
// utils
import getCookie from "../utils/getCookie";
import { setGlobalCookie } from "../utils/globalCookie";
import getCurrentUser from "../utils/getCurrentUser";

// css
import "../styles/globals.css";

// Global context provider
export const GlobalContext = createContext();

// Ehsan marketing root component
const EhsanMarketing = ({
  Component,
  pageProps,
  token,
  category,
  currentUser,
}) => {
  const router = useRouter();
  const pathUrl = router.pathname;
  const [clientSideCookieState, setClientSideCookieState] = useState(null);
  const [serverSideCookieState, setServerSideCookieState] = useState(token);
  const [currentUserState, setCurrentUserState] = useState(null);
  const [allProductState, setAllProductState] = useState(null);

  const [continent, setContinent] = useState("");
  const [productName, setProductName] = useState("");
  const [continentname, setContinentname] = useState("");
  const [countryid, setCountryid] = useState("");
  const [CountryName, setCountryName] = useState("");
  const [StateName, setStateName] = useState("");
  const [city, setCity] = useState("");
  const [LocationName, setLocationName] = useState("");

  // cart item list state
  const [cartItemListState, setCartItemListState] = useState(null);

  // private route config
  const privateRoutes = ["/shopPage", "/shoppingCart", "/checkout", "/invoice"];

  useEffect(() => {
    if (serverSideCookieState == null || currentUserState == null) {
      axios
        .get("/api/auth/consumer/consumerCookie")
        .then((res) => {
          if (res && res.data && res.data.EMAccessToken) {
            setClientSideCookieState(res.data.EMAccessToken);
            setCurrentUserState(JSON.parse(JSON.parse(res.data.EMUI)));
          } else {
            setClientSideCookieState(null);
            setCurrentUserState(null);
          }
        })
        .catch((err) => {
          setClientSideCookieState(null);
          setCurrentUserState(null);
        });
    }
  }, [router.pathname]);

  return (
    <ApolloProvider client={client}>
      <GlobalContext.Provider
        value={{
          token:
            serverSideCookieState == null
              ? clientSideCookieState
              : serverSideCookieState,
          currentUser: currentUser !== null ? currentUser : currentUserState,
          globalContextHandler: (data) => {
            setServerSideCookieState(data);
            setClientSideCookieState(data);
          },
          allProductState,
          setAllProductState,
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

          globalProductHandler: (productData) => {
            setAllProductState({ ...allProductState, data: productData });
          },
        }}
      >
        {/* Conditionally Render Different Pages  */}
        <>
          {pathUrl.includes("admin-dashboard") ? (
            <AdminDashboardLayout>
              <Component {...pageProps} />
              <ToastContainer
                toastStyle={{ backgroundColor: "black", color: "#fff" }}
              />
            </AdminDashboardLayout>
          ) : pathUrl.includes("consumer-dashboard") ? (
            <DashboardLayout>
              <Component {...pageProps} />
              <ToastContainer
                toastStyle={{ backgroundColor: "black", color: "#fff" }}
              />
            </DashboardLayout>
          ) : Component.getLayout ? (
            <PrivateRoute privateRoutes={privateRoutes}>
              <Component {...pageProps} />
            </PrivateRoute>
          ) : (
            <PrivateRoute privateRoutes={privateRoutes}>
              <MainLayout category={category}>
                <Component {...pageProps} category={category} />
                <ToastContainer
                  toastStyle={{ backgroundColor: "white", color: "black" }}
                />
              </MainLayout>
            </PrivateRoute>
          )}
        </>
      </GlobalContext.Provider>
    </ApolloProvider>
  );
};

EhsanMarketing.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const isInitial = "isInitial";

  // get token
  const getSessionCookie = getCookie(appContext.ctx, isInitial);

  // get current user
  const currentUser = JSON.parse(getCurrentUser(appContext.ctx, isInitial));

  // get all category
  const allCategory = await useAllCategory();

  // varify token
  if (getSessionCookie !== null) {
    // varify token mutation
    const validToken = await useVarifyTokenMutation(getSessionCookie);

    if (
      validToken.data.verifyToken.payload !== null &&
      validToken.data.verifyToken.success
    ) {
      // set global token
      setGlobalCookie(getSessionCookie);

      return {
        ...appProps,
        token: getSessionCookie,
        category: allCategory,
        currentUser: currentUser,
      };
    } else {
      // set global token
      setGlobalCookie(null);

      return {
        ...appProps,
        token: null,
        category: allCategory,
        currentUser: null,
      };
    }
  }

  // set global token
  setGlobalCookie(getSessionCookie);

  return {
    ...appProps,
    token: getSessionCookie,
    category: allCategory,
    currentUser: currentUser,
  };
};

export default EhsanMarketing;
