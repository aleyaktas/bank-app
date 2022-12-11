import React, { useState, useMemo, useEffect, useContext } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Alert, Grid } from "@mui/material";
import CreditInterest from "../../components/CreditInterest/CreditInterest";
import instance, { serverSideConfig } from "../../utils/axios";
import { Context } from "../_app";
import DepositInterest from "../../components/DepositInterest/DepositInterest";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface CalculateProps {
  allBanks: any[];
  error?: string;
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

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Calculate({ allBanks, error }: CalculateProps) {
  const router = useRouter();
  const { banks, setBanks, setUser } = useContext(Context);

  useEffect(() => {
    if (error) {
      setUser("");
      Cookies.remove("token");
      router.push("/");
    }
  }, []);

  const [value, setValue] = useState(0);
  const [type, setType] = useState({
    id: 0,
    name: "",
  });
  const [credit, setCredit] = useState({
    id: 0,
    label: "",
    value: 0,
  });

  useEffect(() => {
    setBanks(allBanks);
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            sx={{ fontSize: "1.4rem" }}
            label="Kredi Faizi"
            {...a11yProps(0)}
          />
          <Tab
            sx={{ fontSize: "1.4rem" }}
            label="Mevduat Faizi"
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <Grid container justifyContent="center" direction="row">
        <TabPanel value={value} index={0}>
          <Alert
            severity="info"
            sx={{ fontSize: "1.4rem", placeContent: "center" }}
          >
            Kredi faizi hesaplaması yapabilmek için kredi türü ve vade seçmeniz
            gerekmektedir.
          </Alert>
          <br />
          <br />
          <CreditInterest
            type={type}
            setType={setType}
            credit={credit}
            setCredit={setCredit}
          />
        </TabPanel>
      </Grid>

      <Grid container justifyContent="center" direction="row">
        <TabPanel value={value} index={1}>
          <Alert
            severity="info"
            sx={{ fontSize: "1.4rem", placeContent: "center" }}
          >
            Mevduat faizi hesaplaması yapabilmek vade seçmeniz gerekmektedir.
          </Alert>
          <br />
          <br />
          <DepositInterest credit={credit} setCredit={setCredit} />
        </TabPanel>
      </Grid>
    </Box>
  );
}
