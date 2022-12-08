import axios from "axios";

interface LoginProps {
  username: string;
  password: string;
}

export const handleLogin = async ({ username, password }: LoginProps) => {
  try {
    const res = await axios.post("/api/login", { username, password });
    console.log(res.data);
    return res.data.data;
  } catch (error) {
    console.error(error);
  }
};
