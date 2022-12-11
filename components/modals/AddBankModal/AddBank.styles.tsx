import { LoginStyleProps } from "./AddBank.types";

const styleFn: LoginStyleProps = () => ({
  container: {
    display: "flex",
    flexDirection: "column",
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40rem",
    bgcolor: "background.paper",
    boxShadow: "2.4rem",
  },
  textInputs: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  gridContainer: {
    backgroundColor: "white",
    borderRadius: "0.5rem",
  },
  gridSize: {
    width: "100%",
  },
  box: {
    textAlign: "center",
    width: "80%",
  },
  textField: {
    marginBottom: "1rem",
    display: "block",
    width: "100%",
  },
  button: {
    fontSize: "1.2rem",
    marginTop: "1.8rem",
  },
});

export default styleFn;
