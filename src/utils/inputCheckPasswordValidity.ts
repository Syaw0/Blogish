const inputCheckPasswordValidity = (password: string) => {
  if (password.length < 5) {
    return false;
  }
  return true;
};

export default inputCheckPasswordValidity;
