import { BankCardDetailListStyleProps } from "./BankCardDetailList.types";

const styleFn: BankCardDetailListStyleProps = () => ({
  fontSizeLg: {
    fontSize: "1.6rem",
  },
  fontSizeMd: {
    fontSize: "1.4rem",
  },
  deleteButton: { height: "auto", marginLeft: "1rem", fontSize: "1rem" },
  alert: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
    fontSize: "1.2rem",
    placeContent: "center",
    marginTop: "1rem",
  },
});

export default styleFn;
