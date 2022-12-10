import React, { useContext } from "react";
import styleFn from "./Navbar.styles";
import { AppBar, Toolbar, Typography, Button, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { Context } from "../../pages/_app";
import { handleLogout } from "../../pages/api";

const Navbar = () => {
  const styles = styleFn();
  const router = useRouter();
  const { setModal, user, setUser } = useContext(Context);

  const login = () => {
    setModal("login");
  };
  const logout = () => {
    setUser("");
    handleLogout();
    router.push("/");
  };
  return (
    <>
      <AppBar sx={styles.appBar} position="static">
        <Grid container sx={{ width: "inherit" }}>
          <Toolbar sx={{ width: "inherit" }}>
            <Typography
              fontStyle="italic"
              variant="h6"
              component="div"
              sx={{ mr: 2, fontSize: "1.8rem" }}
            >
              BANKAPP
            </Typography>
            {user ? (
              <>
                <Grid container justifyContent="start" alignItems="center">
                  <Button color="inherit" sx={{ fontSize: "1.4rem" }}>
                    Hesaplama
                  </Button>
                  <Button
                    color="inherit"
                    sx={{ fontSize: "1.4rem" }}
                    onClick={() => router.push("/dashboard/banks")}
                  >
                    Banka Ekle
                  </Button>
                </Grid>
                <Button
                  onClick={logout}
                  variant="contained"
                  sx={{
                    ml: "auto",
                    fontSize: "1.4rem",
                    backgroundColor: "#264653",
                    ":hover": {
                      backgroundColor: "#264653",
                    },
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                onClick={login}
                sx={{
                  ml: "auto",
                  fontSize: "1.4rem",
                  backgroundColor: "#264653",
                  ":hover": {
                    backgroundColor: "#264653",
                  },
                }}
                variant="contained"
              >
                Login
              </Button>
            )}
          </Toolbar>
        </Grid>
      </AppBar>
    </>
  );
};

export default Navbar;
