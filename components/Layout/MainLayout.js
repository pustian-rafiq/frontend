import React from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ChatGroup from "../Chat/ChatGroup";
import ScrollTop from "../ScrollTop/ScrollTop";

const Layout = ({ children, category }) => {
  return (
    <>
      <Header category={category} />
      <main>{children}</main>
      <Footer />
      <ScrollTop />
      <ChatGroup />
    </>
  );
};

export default Layout;
