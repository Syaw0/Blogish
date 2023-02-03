import { IncomingMessage, ServerResponse } from "http";

type Req = IncomingMessage & {
  cookies: Partial<{
    [key: string]: string;
  }>;
};
const getTheme = (req: Req, res: ServerResponse<IncomingMessage>) => {
  if (req.cookies && req.cookies.theme == null) {
    res.setHeader("Set-Cookie", "theme=light;SameSite=strict");
    return "light";
  }
  return req.cookies.theme;
};

export default getTheme;
