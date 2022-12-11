import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { object, string, number, array, InferType, TypeOf } from "yup";
import { addInterest, deleteInterest } from "../../pages/api";
import { CreditProps, OpenCardProps, TypeProps } from "../../pages/banks";
import { Context } from "../../pages/_app";
import { data } from "../../utils/data";

interface BankCardProps {
  type: TypeProps;
  setType?: React.Dispatch<React.SetStateAction<TypeProps>>;
  credit: CreditProps;
  setCredit?: React.Dispatch<React.SetStateAction<CreditProps>>;
  bankId: number;
  interest?: number;
  interestId?: number;
  openCard?: OpenCardProps;
  setOpenCard?: React.Dispatch<React.SetStateAction<OpenCardProps>>;
  disabled?: boolean;
  isDelete?: boolean;
}

const schema = object({
  type: string().required("Type is required"),
  credit: number().required("Credit is required"),
  interest: number().required("Interest is required"),
});

const BankCardDetail = ({
  type,
  setType,
  credit,
  setCredit,
  bankId,
  interest,
  interestId,
  openCard,
  setOpenCard,
  disabled,
  isDelete,
}: BankCardProps) => {
  type FormValues = InferType<typeof schema>;
  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const { setModal, banks, setBanks } = useContext(Context);
  const bank = banks?.find((item) => item.id === bankId);
  return (
    <Grid container direction="row" mb={2}>
      <Grid item xs={9} container justifyContent="space-around" direction="row">
        <FormControl sx={{ width: "30%" }}>
          <InputLabel sx={{ fontSize: "1.6rem" }} id="demo-simple-select-label">
            Tür
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type.name}
            defaultValue={type.name}
            disabled={disabled}
            label="Tür"
            sx={{ fontSize: "1.6rem" }}
            {...register("type")}

            // onChange={handleChange}
          >
            {data.map((item) => {
              return (
                <MenuItem
                  sx={{ fontSize: "1.4rem" }}
                  key={item.id}
                  value={item.name}
                  disabled={
                    bank?.interests?.filter((interest: any) => {
                      return interest.credit_type === item.id;
                    }).length === item.vade.length
                  }
                  onClick={() =>
                    setType &&
                    setType({
                      id: item.id,
                      name: item.name,
                    })
                  }
                >
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl sx={{ width: "30%" }}>
          <InputLabel sx={{ fontSize: "1.4rem" }} id="demo-simple-select-label">
            Vade
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={credit.value}
            label="Vade"
            defaultValue={credit.value}
            disabled={disabled}
            sx={{ fontSize: "1.4rem" }}
            {...register("credit")}

            // onChange={handleChange}
          >
            {data.map((item) => {
              if (item.name === type.name) {
                return item.vade.map((vade: any) => {
                  return (
                    <MenuItem
                      sx={{ fontSize: "1.4rem" }}
                      key={vade.value}
                      value={vade.value}
                      disabled={
                        bank?.interests?.filter((interest: any) => {
                          return (
                            interest.credit_type === type.id &&
                            interest.time_option === vade.id
                          );
                        }).length === 1
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
          sx={{ width: "30%", fontSize: "1.4rem" }}
          InputLabelProps={{
            style: { fontSize: "1.4rem" },
          }}
          InputProps={{
            style: { fontSize: "1.4rem" },
          }}
          disabled={disabled}
          id="standard-basic"
          label="Aylık Faiz Oranı"
          variant="outlined"
          defaultValue={interest}
          {...register("interest")}
        />
      </Grid>
      <Grid item xs={3} container justifyContent="end" alignItems="center">
        <Button
          onClick={handleSubmit(async (formData: any) => {
            console.log(formData);
            console.log(data);

            const newData = {
              bank_id: bankId,
              credit_type: type.id,
              time_option: credit.id,
              interest: parseFloat(formData.interest.toFixed(2)),
            };

            const res = await addInterest(newData);
            console.log("res ", res);
            setBanks &&
              banks &&
              setBanks(
                banks?.map((bank) => {
                  if (bank.id === bankId) {
                    return {
                      ...bank,
                      interests: bank.interests
                        ? [...bank.interests, res]
                        : [res],
                    };
                  }
                  return bank;
                })
              );

            setType && setType({ id: -1, name: "" });
            setCredit && setCredit({ id: -1, label: "", value: 0 });
            setOpenCard &&
              openCard &&
              setOpenCard({ ...openCard, open: false });

            console.log(banks);
          })}
          variant="contained"
          disabled={disabled}
          color="success"
          sx={{ height: "auto", fontSize: "1rem" }}
        >
          Kaydet
        </Button>
        <Button
          variant="contained"
          color="error"
          disabled={isDelete}
          onClick={() => {
            interestId && deleteInterest({ id: interestId, bank_id: bankId });
            setOpenCard &&
              openCard &&
              setOpenCard({ ...openCard, open: false });
            setBanks &&
              banks &&
              setBanks(
                banks?.map((bank) => {
                  if (bank.id === bankId) {
                    bank.interests = bank.interests.filter(
                      (interest: any) => interest.id !== interestId
                    );
                  }
                  return bank;
                })
              );
          }}
          sx={{
            height: "auto",
            marginLeft: "1rem",
            fontSize: "1rem",
          }}
        >
          Sil
        </Button>
      </Grid>
    </Grid>
  );
};

export default BankCardDetail;
