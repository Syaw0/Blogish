const loggedUserRegex = /\/login|\/auth|\/register/;

const checkLoggedUserAccess = (url: string) => {
  return loggedUserRegex.test(url);
};

export default checkLoggedUserAccess;
