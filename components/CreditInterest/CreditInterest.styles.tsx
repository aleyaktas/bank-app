import { CreditInterestStyleProps } from "./CreditInterest.types";

const styleFn: CreditInterestStyleProps = () => ({
  fontSizeLg: {
    fontSize: "1.6rem",
  },
  fontSizeMd: {
    fontSize: "1.4rem",
  },
  accordion: {
    marginBottom: "2rem",
    width: "100%",
  },
  accordionDetails: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  typography: {
    color: "secondary",
    fontSize: "1.6rem",
  },
  detailsButton: {
    fontSize: "1rem",
    marginTop: "1rem",
    pointerEvents: "auto",
  },
  closeDetailsButton: {
    fontSize: "1rem",
    marginTop: "1rem",
    pointerEvents: "auto",
  },
});

export default styleFn;
