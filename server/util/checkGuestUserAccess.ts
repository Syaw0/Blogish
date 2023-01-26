const guestRegex = /\/write|\/publish|\/logout/;

const checkGuestUserAccess = (url: string) => {
  return guestRegex.test(url);
};

export default checkGuestUserAccess;
