import ErrorMessage from "./errorMessage";
import SuccessMessage from "./successMessage";
import WaitMessage from "./waitMessage";

const Message = ({ msg, type }: any) => {
  return (
    <>
      {type == "success" && <SuccessMessage msg={msg} />}
      {type == "error" && <ErrorMessage msg={msg} />}
      {type == "loader" && <WaitMessage msg={msg} />}
    </>
  );
};

export default Message;
