import errorAndDes from "../shared/errorCodeAndDes";

type statusCodes = "404" | "500";

const getDesFromStatusCode = (statusCode: statusCodes) => {
  if (errorAndDes[statusCode] == null) {
    return errorAndDes["404"];
  } else {
    return errorAndDes[statusCode];
  }
};

export default getDesFromStatusCode;
