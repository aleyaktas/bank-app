import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface showMsgProps {
  msg: string;
  type: "success" | "error" | "info" | "warning" | undefined;
}

export const showMessage = ({ msg, type }: showMsgProps) => {
  console.log("showMessage", msg, type);
  toast(msg, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    type,
    style: {
      fontSize: "1.8rem",
    },
  });
};
