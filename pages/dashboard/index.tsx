import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import styleFn from "./Dashboard.styles";
import { Button, Alert } from "@mui/material";
import AddBankModal from "../../components/modals/AddBankModal/AddBank";
import setAuthToken from "../../utils/setAuthToken";
import instance, { serverSideConfig } from "../../utils/axios";
import { Context } from "../../pages/_app";

interface DashboardProps {
  allBanks: any[];
}

export const getServerSideProps = async (context: any) => {
  const res = await instance.get("/api/banks", serverSideConfig(context));
  console.log(res.data);
  return {
    props: {
      allBanks: res.data,
    },
  };
};

export default function Dashboard({ allBanks }: DashboardProps) {
  const styles = styleFn();
  const { user, banks, setBanks, setModal } = useContext(Context);
  console.log(allBanks);
  const router = useRouter();

  const modalClose = () => setModal("");

  useEffect(() => {
    if (!user) {
      router.push("/dashboard");
    } else {
      setAuthToken({ token: user });
    }
  }, []);

  const addBank = () => {
    setModal("addBank");
  };

  return (
    <div style={styles.container}>
      <AddBankModal handleClose={modalClose} />
      <Button
        onClick={addBank}
        variant="contained"
        sx={{ backgroundColor: "#E76F51", fontSize: "1.4rem" }}
      >
        Banka Ekle
      </Button>
      {allBanks?.length === 0 && (
        <Alert sx={{ fontSize: "1.8rem", marginTop: "2rem" }} severity="info">
          Herhangi bir banka bulunmamaktadır. Lütfen banka ekleyiniz.
        </Alert>
      )}
    </div>
  );
}
