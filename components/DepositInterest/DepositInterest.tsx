import { yupResolver } from "@hookform/resolvers/yup";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { object, string, number, array, InferType, TypeOf } from "yup";
import { CreditProps, TypeProps } from "../../pages/banks";
import { Context } from "../../pages/_app";
import { data } from "../../utils/data";
import styleFn from "./DepositInterest.styles";
import { showMessage } from "../../utils/showMessage";

interface DepositInterestProps {
  type?: TypeProps;
  setType?: React.Dispatch<React.SetStateAction<TypeProps>>;
  credit?: CreditProps;
  setCredit?: React.Dispatch<React.SetStateAction<CreditProps>>;
  bankId?: number;
}

const schema = object({
  time_option: string().required("Time option is required"),
  money_amount: number()
    .required("Money amount is required")
    .typeError("Money amount must be a number"),
});

const DepositInterest = ({
  type,
  setType,
  credit,
  setCredit,
  bankId,
}: DepositInterestProps) => {
  type FormValues = InferType<typeof schema>;
  const { register, handleSubmit, formState, reset } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const { errors } = formState;

  useEffect(() => {
    Object.values(errors).length > 0 &&
      showMessage({
        msg: Object.values(errors)[0].message || "",
        type: "error",
      });
  }, [errors]);

  const styles = styleFn();

  const { banks, setBanks } = useContext(Context);
  const [formData, setFormData] = React.useState({
    time_option: "",
    money_amount: 0,
  });
  const [expanded, setExpanded] = useState<number>(-1);

  const handleExpanded = (panel: number) => setExpanded(panel);

  const onSubmit = (data: FormValues) => {
    setFormData(data);
  };

  return (
    <Grid container mb={2}>
      <Grid item xs={9} container justifyContent="space-around" direction="row">
        <FormControl sx={{ width: "35%" }}>
          <InputLabel sx={styles.fontSizeMd} id="demo-simple-select-label">
            Vade
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={credit?.label}
            sx={styles.fontSizeMd}
            {...register("time_option")}
          >
            {data.map((item) => {
              if (item.name === "Mevduat") {
                return item.vade.map((vade: any) => {
                  return (
                    <MenuItem
                      sx={styles.fontSizeMd}
                      key={vade.id}
                      value={vade.label}
                      disabled={
                        !banks?.some((bank) =>
                          bank.interests.some(
                            (interest: any) =>
                              interest.credit_type === 3 &&
                              interest.time_option === vade.id
                          )
                        )
                      }
                      onClick={() =>
                        setCredit &&
                        setCredit({
                          id: vade.id,
                          label: vade.label,
                          value: vade.value,
                        })
                      }
                    >
                      {vade.label}
                    </MenuItem>
                  );
                });
              }
            })}
          </Select>
        </FormControl>
        <TextField
          sx={{ width: "60%" }}
          InputLabelProps={{
            style: styles.fontSizeMd,
          }}
          InputProps={{
            style: styles.fontSizeMd,
          }}
          id="standard-basic"
          label="Yatırılacak Tutar"
          variant="outlined"
          {...register("money_amount")}
        />
      </Grid>
      <Grid item xs={3} container justifyContent="center" alignItems="center">
        <Button
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          sx={{ fontSize: "1.4rem", width: "75%" }}
        >
          Bul
        </Button>
      </Grid>
      <Grid item xs={12} mt={2}>
        {banks?.map((bank, index: number) => {
          return bank.interests.map((interest: any) => {
            if (
              interest.time_option === credit?.id &&
              formData.money_amount &&
              interest.credit_type === 3
            ) {
              return (
                <Accordion expanded={expanded === index} sx={styles.accordion}>
                  <AccordionSummary
                    sx={{
                      pointerEvents: "none",
                    }}
                    aria-controls="panel1bh-content"
                    id={`panel${index}bh-header`}
                  >
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item xs={4}>
                        <Typography sx={styles.typography}>
                          {bank.bank_name}
                        </Typography>
                      </Grid>
                      <Grid item xs={8} textAlign="end">
                        <Typography sx={styles.typography}>
                          Aylık faiz oranı: {interest.interest}%
                        </Typography>
                      </Grid>

                      {expanded !== index && (
                        <Grid sx={{ width: "100%", textAlign: "center" }}>
                          <Button
                            onClick={() => handleExpanded(index)}
                            variant="outlined"
                            sx={styles.detailsButton}
                          >
                            Detaylar için tıklayın
                          </Button>
                        </Grid>
                      )}
                    </Grid>
                  </AccordionSummary>
                  <AccordionDetails sx={styles.accordionDetails}>
                    <Typography
                      sx={{
                        fontSize: "1.6rem",
                      }}
                    >
                      Mevduat Tutarı: {formData.money_amount}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "1.6rem",
                      }}
                    >
                      {credit?.label} vade sonunda alınacak faiz:{" "}
                      {credit &&
                        (formData.money_amount *
                          interest.interest *
                          credit?.value) /
                          1200}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "1.6rem",
                      }}
                    >
                      {credit?.label} vade sonunda toplam mevduat:{" "}
                      {credit &&
                        (formData.money_amount *
                          interest.interest *
                          credit?.value) /
                          1200 +
                          formData.money_amount}
                    </Typography>
                    {expanded === index && (
                      <Grid sx={{ width: "100%", textAlign: "center" }}>
                        <Button
                          variant="outlined"
                          sx={{
                            fontSize: "1rem",
                            marginTop: "1rem",
                            pointerEvents: "auto",
                          }}
                          onClick={() => handleExpanded(-1)}
                        >
                          Detayları Kapat
                        </Button>
                      </Grid>
                    )}
                  </AccordionDetails>
                </Accordion>
              );
            }
          });
        })}
      </Grid>
    </Grid>
  );
};

export default DepositInterest;
