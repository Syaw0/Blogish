import getTheme from "../utils/getTheme";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import { useRouter } from "next/router";
import Button from "../components/button/button";
import Error from "../components/error/error";

const Error500 = () => {
  const router = useRouter();
  return (
    <Error
      code={500}
      description="if you see this page its mean that server has internal Error!"
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

export default Error500;
