import getDesFromStatusCode from "../utils/getDesFromStatusCode";
import Error from "../components/error/error";
import ThemeProvider from "../contexts/themeContext";
import getTheme from "../utils/getTheme";
import Button from "../components/button/button";
import Link from "next/link";

function ErrorPage({ statusCode, theme }: any) {
  return (
    <ThemeProvider defaultTheme={theme}>
      <Error
        code={statusCode}
        description={getDesFromStatusCode(statusCode)}
        extra={
          <Link href={"/"}>
            <Button>Go To Home</Button>
          </Link>
        }
      />
    </ThemeProvider>
  );
}

ErrorPage.getInitialProps = ({ req, res }: any) => {
  const theme = getTheme(req, res);
  console.log(theme);
  return { statusCode: res.statusCode, theme };
};

export default ErrorPage;
