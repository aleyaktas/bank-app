import React, { useEffect } from "react";
import styleFn from "./Layout.styles";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const styles = styleFn();

  return (
    <div style={styles.container}>
      <main style={{ height: "100vh", overflowY: "auto" }}>{children}</main>
    </div>
  );
};

export default Layout;
