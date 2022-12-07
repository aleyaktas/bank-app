import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { object, string, number, array, InferType, TypeOf } from "yup";
import { useRouter } from "next/router";
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

const schema = object({
  username: string().required("Name is required"),
  password: string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type LoginModalProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  handleClose: () => void;
};

type FormValues = InferType<typeof schema>;
const LoginModal = ({ setIsOpen, isOpen, handleClose }: LoginModalProps) => {
  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const { errors } = formState;
  const router = useRouter();
  const onSubmit = (data: FormValues) => {
    console.log(data);
    handleClose();
  };
  const styles = styleFn();
  return (
    <Modal
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      open={isOpen}
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
