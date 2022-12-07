import React from "react";
import styleFn from "./Navbar.styles";
import LoginModal from "../modals/LoginModal/LoginModal";
import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";

type NavbarProps = {};

const Navbar = (props: NavbarProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const modalClose = () => setIsOpen(false);
  const styles = styleFn();

  const login = () => {
    setIsOpen(true);
  };
  return (
    <>
      <LoginModal
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        handleClose={modalClose}
      />

      <Box sx={{ flexGrow: 1 }}>
        <AppBar sx={styles.appBar} position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              BankApp
            </Typography>
            <Button sx={{ fontSize: "1.6rem" }} onClick={login} color="inherit">
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Navbar;
