import axios, { AxiosRequestConfig } from "axios";
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

interface Id {
  id: number;
  bank_id?: number;
}

const config: AxiosRequestConfig = {
  headers: {
    "Content-Type": "application/json",
    Authorization: Cookies.get("token") ? `Bearer ${Cookies.get("token")}` : "",
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

export const addBank = async ({ name }: BankProps) => {
  try {
    const token = Cookies.get("token");
    const res = await instance.post("/api/banks", { bank_name: name }, config);
    return res.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const addInterest = async (data: any) => {
  console.log(data);
  try {
    const res = await instance.post("/api/interests", data, config);
    return res.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteBank = async ({ id }: Id) => {
  try {
    const res = await instance.delete("/api/banks", {
      data: { id },
      headers: {
        "Content-Type": "application/json",
        Authorization: Cookies.get("token")
          ? `Bearer ${Cookies.get("token")}`
          : "",
      },
    });

    return res.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteInterest = async ({ id, bank_id }: Id) => {
  try {
    const res = await instance.delete("/api/interests", {
      data: { id, bank_id },
      headers: {
        "Content-Type": "application/json",
        Authorization: Cookies.get("token")
          ? `Bearer ${Cookies.get("token")}`
          : "",
      },
    });

    return res.data.data;
  } catch (error) {
    console.error(error);
  }
};
