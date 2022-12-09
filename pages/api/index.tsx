import axios from "axios";
import instance, { serverSideConfig } from "../../utils/axios";
import setAuthToken from "../../utils/setAuthToken";
import Cookies from "js-cookie";

interface LoginProps {
  username: string;
  password: string;
}

interface BankProps {
  name: string;
}

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const handleLogin = async ({ username, password }: LoginProps) => {
  try {
    const res = await instance.post(
      "/api/login",
      { username, password },
      config
    );
    Cookies.set("token", res.data.data);
    return res.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const handleLogout = () => {
  Cookies.remove("token");
};

//addBank
export const addBank = async ({ name }: BankProps) => {
  try {
    const res = await instance.post("/api/banks", { name }, config);
    return res.data.data;
  } catch (error) {
    console.error(error);
  }
};
