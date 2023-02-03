import { useRouter } from "next/router";
import Button from "../components/button/button";
import Error from "../components/error/error";

const Error404 = () => {
  const router = useRouter();
  return (
    <Error
      code={404}
      description="if you see this page its mean that the post or user is not exits"
      extra={
        <Button
          onClick={() => {
            router.replace("/");
          }}
        >
          Go To Home
        </Button>
      }
    />
  );
};

export default Error404;
