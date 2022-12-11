import React, { useContext } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { object, string, number, array, InferType, TypeOf } from "yup";
import { useRouter } from "next/router";
import styleFn from "./AddBank.styles";
import {
  FormControl,
  Button,
  TextField,
  Grid,
  Typography,
  Box,
  Modal,
} from "@mui/material";

import { Context } from "../../../pages/_app";
import { addBank } from "../../../pages/api";

const schema = object({
  name: string().required("Name is required"),
});

type AddBankProps = {
  handleClose: () => void;
};

type FormValues = InferType<typeof schema>;
const AddBankModal = ({ handleClose }: AddBankProps) => {
  const { register, handleSubmit, formState, reset } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const { setUser, modal, setBanks, banks } = useContext(Context);
  const { errors } = formState;

  const onSubmit = async (data: FormValues) => {
    const bankData = await addBank(data);
    banks?.push(bankData);
    banks && setBanks(banks);
    reset({
      name: "",
    });
    handleClose();
  };
  const styles = styleFn();
  return (
    <Modal
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      open={modal === "addBank"}
      onClose={() => {
        handleClose();
        reset({ name: "" });
      }}
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
                height="16rem"
              >
                <Box sx={styles.box}>
                  <Typography
                    marginBottom="2rem"
                    fontSize="2.4rem"
                    color="black"
                  >
                    BANK NAME
                  </Typography>
                  <TextField
                    sx={styles.textField}
                    id="filled-basic"
                    label="Bank Name"
                    variant="filled"
                    fullWidth
                    InputProps={{ style: { fontSize: "1.4rem" } }}
                    InputLabelProps={{ style: { fontSize: "1.4rem" } }}
                    {...register("name")}
                  />

                  <Button
                    fullWidth
                    variant="contained"
                    color="success"
                    onClick={handleSubmit(onSubmit)}
                    sx={styles.button}
                  >
                    Ekle
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

export default AddBankModal;
