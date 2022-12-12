import React, { useContext, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { object, string, number, array, InferType, TypeOf } from "yup";
import { useRouter } from "next/router";
import { showMessage } from "../../../utils/showMessage";

import styleFn from "./LoginModal.styles";

import {
  FormControl,
  Button,
  TextField,
  Grid,
  Typography,
  Box,
  Modal,
} from "@mui/material";
import { handleLogin } from "../../../pages/api";
import { Context } from "../../../pages/_app";

const schema = object({
  username: string().required("Name is required"),
  password: string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type LoginModalProps = {
  modal: string;
  handleClose: () => void;
};

type FormValues = InferType<typeof schema>;
const LoginModal = ({ modal, handleClose }: LoginModalProps) => {
  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const { setUser } = useContext(Context);
  const { errors } = formState;

  useEffect(() => {
    console.log(Object.values(errors));
    Object.values(errors).length > 0 &&
      showMessage({
        msg: Object.values(errors)[0].message || "",
        type: "error",
      });
  }, [errors]);

  const router = useRouter();
  const onSubmit = async (data: FormValues) => {
    const userData = await handleLogin(data);
    setUser(userData);
    showMessage({ msg: "Login successful", type: "success" });
    router.push("/banks");
    handleClose();
  };
  const styles = styleFn();
  return (
    <Modal
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      open={modal === "login"}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Grid container alignItems="center" justifyContent="center" width="37rem">
        <Grid
          container
          item
          xs={3}
          height="30rem"
          sx={{ ...styles.gridContainer, ...styles.gridSize }}
          minWidth="37rem"
        >
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            width="100%"
          >
            <FormControl fullWidth>
              <Grid
                container
                direction="column"
                justifyContent="space-evenly"
                alignItems="center"
                height="25rem"
              >
                <Box sx={styles.box}>
                  <Typography marginBottom="2rem" fontSize="3rem" color="black">
                    Login
                  </Typography>
                  <TextField
                    sx={styles.textField}
                    id="filled-basic"
                    label="Username"
                    variant="filled"
                    fullWidth
                    InputProps={{ style: { fontSize: "1.4rem" } }}
                    InputLabelProps={{ style: { fontSize: "1.4rem" } }}
                    {...register("username")}
                  />
                  <TextField
                    sx={{ ...styles.textField, marginBottom: "2rem" }}
                    id="filled-basic"
                    label="Password"
                    variant="filled"
                    type="password"
                    fullWidth
                    InputProps={{ style: { fontSize: "1.4rem" } }}
                    InputLabelProps={{ style: { fontSize: "1.4rem" } }}
                    {...register("password")}
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    color="success"
                    onClick={handleSubmit(onSubmit)}
                    sx={styles.button}
                  >
                    Login
                  </Button>
                </Box>
              </Grid>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default LoginModal;
