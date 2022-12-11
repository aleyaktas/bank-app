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

import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { object, string, number, array, InferType, TypeOf } from "yup";
import { CreditProps, TypeProps } from "../../pages/banks";
import { Context } from "../../pages/_app";
import { data } from "../../utils/data";

interface DepositInterestProps {
  type?: TypeProps;
  setType?: React.Dispatch<React.SetStateAction<TypeProps>>;
  credit?: CreditProps;
  setCredit?: React.Dispatch<React.SetStateAction<CreditProps>>;
  bankId?: number;
}

const schema = object({
  time_option: string().required("Time option is required").min(3),
  money_amount: number().required("Money amount is required"),
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

  const { banks, setBanks } = useContext(Context);
  const [formData, setFormData] = React.useState({
    time_option: "",
    money_amount: 0,
  });
  const [expanded, setExpanded] = useState<number>(-1);
  console.log(expanded);

  const handleExpanded = (panel: number) => setExpanded(panel);

  console.log(errors);

  const onSubmit = (data: FormValues) => {
    setFormData(data);

    console.log(data);
    console.log(credit);
  };

  return (
    <Grid container mb={2}>
      <Grid item xs={9} container justifyContent="space-around" direction="row">
        <FormControl sx={{ width: "35%" }}>
          <InputLabel sx={{ fontSize: "1.4rem" }} id="demo-simple-select-label">
            Vade
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={credit?.label}
            sx={{ fontSize: "1.4rem" }}
            {...register("time_option")}
          >
            {data.map((item) => {
              if (item.name === "Mevduat") {
                return item.vade.map((vade: any) => {
                  return (
                    <MenuItem
                      sx={{ fontSize: "1.4rem" }}
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
          sx={{ width: "60%", fontSize: "1.4rem" }}
          InputLabelProps={{
            style: { fontSize: "1.4rem" },
          }}
          InputProps={{
            style: { fontSize: "1.4rem" },
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
                <Accordion
                  expanded={expanded === index}
                  sx={{
                    marginBottom: "2rem",
                    width: "100%",
                  }}
                >
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
                        <Typography
                          sx={{
                            color: "text.secondary",
                            textTransform: "uppercase",
                            fontSize: "1.6rem",
                          }}
                        >
                          {bank.bank_name}
                        </Typography>
                      </Grid>
                      <Grid item xs={8} textAlign="end">
                        <Typography
                          sx={{ color: "text.secondary", fontSize: "1.6rem" }}
                        >
                          Aylık faiz oranı: {interest.interest}%
                        </Typography>
                      </Grid>

                      {expanded !== index && (
                        <Grid sx={{ width: "100%", textAlign: "center" }}>
                          <Button
                            onClick={() => handleExpanded(index)}
                            variant="outlined"
                            sx={{
                              fontSize: "1rem",
                              marginTop: "1rem",
                              pointerEvents: "auto",
                            }}
                          >
                            Detaylar için tıklayın
                          </Button>
                        </Grid>
                      )}
                    </Grid>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
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
