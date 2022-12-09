interface TokenProps {
  token: string;
}

const setAuthToken = ({ token }: TokenProps) => {
  if (token) {
    console.log("setting token");
  }
};

export default setAuthToken;
