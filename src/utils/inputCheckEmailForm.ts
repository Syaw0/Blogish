const inputCheckEmailForm = (addr: string) => {
  if (/\b(^[^\W])([\w]+|([\.-]?\w+)*)@[\w]+\.[\w]{2,4}\b/.test(addr)) {
    return true;
  }
  return false;
};

export default inputCheckEmailForm;
