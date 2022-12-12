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
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { object, string, number, array, InferType, TypeOf } from "yup";
import { CreditProps, TypeProps } from "../../pages/banks";
import { Context } from "../../pages/_app";
import { data } from "../../utils/data";
import { showMessage } from "../../utils/showMessage";
import styleFn from "./CreditInterest.styles";

interface CreditInterestProps {
  type?: TypeProps;
  setType?: React.Dispatch<React.SetStateAction<TypeProps>>;
  credit?: CreditProps;
  setCredit?: React.Dispatch<React.SetStateAction<CreditProps>>;
  bankId?: number;
}

const schema = object({
  credit_type: string().required("Credit type is required"),
  time_option: string().required("Time option is required"),
  credit_amount: number()
    .required("Credit amount is required")
    .typeError("Credit amount must be a number"),
});

const CreditInterest = ({
  type,
  setType,
  credit,
  setCredit,
}: CreditInterestProps) => {
  type FormValues = InferType<typeof schema>;
  const { register, handleSubmit, formState, reset } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const { errors } = formState;
  const styles = styleFn();

  useEffect(() => {
    Object.values(errors).length > 0 &&
      showMessage({
        msg: Object.values(errors)[0].message || "",
        type: "error",
      });
  }, [errors]);

  const { banks, setBanks } = useContext(Context);
  const [formData, setFormData] = React.useState({
    credit_type: "",
    time_option: "",
    credit_amount: 0,
  });
  const [expanded, setExpanded] = useState<number>(-1);

  const handleExpanded = (panel: number) => setExpanded(panel);

  const onSubmit = (data: FormValues) => {
    setFormData(data);
  };

  return (
    <Grid container mb={2}>
      <Grid item xs={9} container justifyContent="space-around" direction="row">
        <FormControl sx={{ width: "30%" }}>
          <InputLabel sx={styles.fontSizeLg} id="demo-simple-select-label">
            Kredi Türü
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type?.name}
            label="Tür"
            sx={styles.fontSizeLg}
            {...register("credit_type")}
          >
            {data.map((item) => {
              return (
                <MenuItem
                  sx={styles.fontSizeMd}
                  key={item.id}
                  value={item.name}
                  disabled={
                    !banks?.some((bank) =>
                      bank?.interests?.some(
                        (interest: any) => interest.credit_type === item.id
                      )
                    )
                  }
                  onClick={() => {
                    setCredit && setCredit({} as CreditProps);
                    reset({
                      credit_type: item.name,
                      time_option: "",
                    });
                    setType &&
                      setType({
                        id: item.id,
                        name: item.name,
                      });
                  }}
                >
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl sx={{ width: "30%" }}>
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
              if (item.name === type?.name) {
                return item.vade.map((vade: any) => {
                  return (
                    <MenuItem
                      sx={styles.fontSizeMd}
                      key={vade.id}
                      value={vade.label}
                      disabled={
                        item.id === type?.id &&
                        !banks?.some((bank) =>
                          bank.interests.some(
                            (interest: any) =>
                              interest.credit_type === item.id &&
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
          sx={{ width: "30%" }}
          InputLabelProps={{
            style: styles.fontSizeMd,
          }}
          InputProps={{
            style: styles.fontSizeMd,
          }}
          id="standard-basic"
          label="Kredi Miktarı"
          variant="outlined"
          {...register("credit_amount")}
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
              interest.credit_type === type?.id &&
              interest.time_option === credit?.id &&
              formData.credit_amount
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
                      textAlign="center"
                    >
                      <Grid item xs={4}>
                        <Typography sx={styles.typography}>
                          {bank.bank_name}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography sx={styles.typography}>
                          Toplam Geri Ödeme
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography sx={styles.typography}>
                          {credit && type?.id === 1
                            ? (formData.credit_amount *
                                interest.interest *
                                credit?.value) /
                                100 +
                              formData.credit_amount
                            : credit && (type?.id === 2 || type?.id === 3)
                            ? (formData.credit_amount *
                                interest.interest *
                                credit?.value) /
                                1200 +
                              formData.credit_amount
                            : 0}
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
                      Hesaba Yatırılacak Tutar: {formData.credit_amount}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "1.6rem",
                      }}
                    >
                      {type && type?.name} Kredisi - {credit && credit?.label}{" "}
                      vade - {credit?.id === 1 ? "Yıllık" : "Aylık"} faiz oranı:
                      %{interest.interest}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "1.6rem",
                      }}
                    >
                      {credit && type?.id === 1 ? "Yıllık" : "Aylık"} geri ödeme
                      tutarı:{" "}
                      {credit && type?.id === 1
                        ? (
                            ((formData.credit_amount *
                              interest.interest *
                              credit?.value) /
                              100 +
                              formData.credit_amount) /
                            credit?.value
                          ).toFixed(2)
                        : credit && (type?.id === 2 || type?.id === 3)
                        ? (
                            ((formData.credit_amount *
                              interest.interest *
                              credit?.value) /
                              1200 +
                              formData.credit_amount) /
                            credit?.value
                          ).toFixed(2)
                        : 0}
                    </Typography>
                    {expanded === index && (
                      <Grid sx={{ width: "100%", textAlign: "center" }}>
                        <Button
                          variant="outlined"
                          sx={styles.closeDetailsButton}
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

export default CreditInterest;
