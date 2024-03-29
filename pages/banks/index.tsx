import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import styleFn from "./Banks.styles";
import {
  Button,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Grid,
  Alert,
} from "@mui/material";
import AddBankModal from "../../components/modals/AddBankModal/AddBank";
import instance, { serverSideConfig } from "../../utils/axios";
import { Context } from "../_app";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Cookies from "js-cookie";
import AddIcon from "@mui/icons-material/Add";
import BankCard from "../../components/BankCardDetail/BankCardDetail";
import BankCardDetailList from "../../components/BankCardDetailList/BankCardDetailList";
import { deleteBank } from "../api";

interface DashboardProps {
  allBanks: any[];
  error?: string;
}

export interface TypeProps {
  id: number;
  name: string;
}

export interface CreditProps {
  id: number;
  label: string;
  value: number;
}

export interface OpenCardProps {
  id: number;
  open: boolean;
}

export interface InterestProps {
  id: number;
  bank_id: number;
  interest: number;
  time_option: number;
  credit_type: number;
}

export interface BankProps {
  id: number;
  bank_name: string;
  interests: InterestProps[];
}
export const getServerSideProps = async (context: any) => {
  try {
    const res = await instance.get("/api/banks", serverSideConfig(context));
    console.log(res?.data);
    return {
      props: {
        allBanks: res.data.data,
      },
    };
  } catch (error) {
    return {
      props: {
        error: "Token is not valid",
      },
    };
  }
};

export default function Dashboard({ allBanks, error }: DashboardProps) {
  const styles = styleFn();
  const { user, banks, setBanks, setModal, setUser, modal } =
    useContext(Context);
  const [openCard, setOpenCard] = useState<OpenCardProps>({
    id: 0,
    open: false,
  });
  const [expanded, setExpanded] = useState<number>(-1);
  useEffect(() => {
    setBanks && setBanks(allBanks);
    error && setUser("");
    error && Cookies.remove("token");
    error && router.push("/");
  }, []);

  console.log(allBanks);
  console.log(user);

  const [type, setType] = useState<TypeProps>({
    id: 0,
    name: "",
  });
  const [credit, setCredit] = useState<CreditProps>({
    id: 0,
    label: "",
    value: 0,
  });

  const onClickDeleteBank = async (e: any, id: number) => {
    e.preventDefault();
    await deleteBank({ id });
    setBanks && banks && setBanks(banks?.filter((bank) => bank.id !== id));
  };
  const handleExpanded = (panel: number) => setExpanded(panel);

  const router = useRouter();

  const modalClose = () => setModal("");

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setUser(token);
    } else {
      router.push("/");
    }
  }, []);

  const addBank = () => {
    setModal("addBank");
  };

  return (
    <div style={styles.container}>
      <>
        <AddBankModal handleClose={modalClose} />
        <Button
          onClick={addBank}
          variant="contained"
          sx={{
            backgroundColor: "#E76F51",
            fontSize: "1.4rem",
            ":hover": {
              backgroundColor: "#E76F51",
            },
          }}
        >
          Banka Ekle
        </Button>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          direction="column"
          marginTop="3rem"
        >
          {banks?.map((bank: BankProps, index: number) => {
            return (
              <Accordion
                expanded={expanded === index}
                id="accordion"
                onChange={() =>
                  expanded === index
                    ? handleExpanded(-1)
                    : handleExpanded(index)
                }
                sx={{
                  width: "50%",
                  marginBottom: "1.6rem",
                  backgroundColor: "white",
                  boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
                }}
                key={bank?.id}
                defaultValue={bank?.bank_name}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon fontSize="large" />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography mr={1} fontSize="1.6rem">
                    {bank?.bank_name}
                  </Typography>
                  <Button
                    sx={{ display: "none", fontSize: "1rem" }}
                    className="showDeleteBtn"
                    variant="contained"
                    color="error"
                    onClick={(e) => onClickDeleteBank(e, bank?.id)}
                  >
                    Sil
                  </Button>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container direction="column">
                    <Button
                      color="success"
                      variant="contained"
                      sx={{
                        width: "min-content",
                        marginLeft: "auto",
                        fontSize: "1rem",
                      }}
                      onClick={() =>
                        setOpenCard({
                          id: bank?.id,
                          open: !openCard.open,
                        })
                      }
                    >
                      <AddIcon />
                    </Button>

                    <BankCardDetailList openCard={openCard} bankId={bank?.id} />
                    {openCard.id === bank?.id &&
                      openCard.open &&
                      setOpenCard && (
                        <BankCard
                          credit={credit}
                          setCredit={setCredit}
                          type={type}
                          setType={setType}
                          bankId={bank?.id}
                          setOpenCard={setOpenCard}
                          openCard={openCard}
                          isDelete
                        />
                      )}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            );
          })}
          {banks?.length === 0 && (
            <Alert
              severity="info"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "1.2rem",
              }}
            >
              Henüz banka eklenmemiş. Lütfen banka ekleyiniz.
            </Alert>
          )}
        </Grid>
        ;
      </>
    </div>
  );
}
