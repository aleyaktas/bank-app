import { Alert } from "@mui/material";
import React, { useContext } from "react";
import { InterestProps, OpenCardProps } from "../../pages/banks";
import { Context } from "../../pages/_app";
import BankCardDetail from "../BankCardDetail/BankCardDetail";
import styleFn from "./BankCardDetailList.styles";

interface BankCardDetailListProps {
  bankId: number;
  openCard: OpenCardProps;
}

const BankCardDetailList = ({ bankId, openCard }: BankCardDetailListProps) => {
  const { banks, setBanks } = useContext(Context);
  const styles = styleFn();

  return (
    <>
      {banks?.map((bank) => {
        if (bank?.id === bankId) {
          if (bank?.interests?.length === 0) {
            return (
              bank?.interests?.length === 0 &&
              !openCard.open && (
                <Alert severity="info" sx={styles.alert}>
                  Bu bankaya ait faiz oranı bulunmamaktadır. Eklemek için ' + '
                  butonuna tıklayın.
                </Alert>
              )
            );
          }

          return bank?.interests?.map((interest: InterestProps) => {
            return (
              <BankCardDetail
                disabled
                interestId={interest?.id}
                bankId={interest?.bank_id}
                type={{
                  id: interest?.credit_type,
                  name:
                    interest?.credit_type === 1
                      ? "Konut"
                      : interest?.credit_type === 2
                      ? "Tüketici"
                      : interest?.credit_type === 3
                      ? "Mevduat"
                      : "",
                }}
                credit={{
                  id: interest?.time_option,
                  label:
                    interest &&
                    (interest.time_option === 1
                      ? "3 ay"
                      : interest.time_option === 2
                      ? "6 ay"
                      : interest.time_option === 3
                      ? "12 ay"
                      : interest.time_option === 4
                      ? "24 ay"
                      : interest.time_option === 5
                      ? "36 ay"
                      : interest.time_option === 6
                      ? "5 yıl"
                      : interest.time_option === 7
                      ? "10 yıl"
                      : ""),

                  value:
                    interest && interest.time_option === 1
                      ? 3
                      : interest.time_option === 2
                      ? 6
                      : interest.time_option === 3
                      ? 12
                      : interest.time_option === 4
                      ? 24
                      : interest.time_option === 5
                      ? 36
                      : interest.time_option === 6
                      ? 5
                      : interest.time_option === 7
                      ? 10
                      : 0,
                }}
                interest={interest.interest}
              />
            );
          });
        }
      })}
    </>
  );
};

export default BankCardDetailList;
