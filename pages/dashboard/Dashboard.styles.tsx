import { DashboardStyleProps } from "./Dashboard.types";

const styleFn: DashboardStyleProps = () => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    marginTop: "6rem",
  },
});

export default styleFn;
