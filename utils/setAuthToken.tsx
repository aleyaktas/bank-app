import axios from "axios";

interface TokenProps {
  token: string;
}

const setAuthToken = ({ token }: TokenProps) => {
  console.log(token);
  if (token) {
    //   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    // } else {
    //   delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
