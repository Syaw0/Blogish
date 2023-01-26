const guestRegex = /\/write|\/publish/;

const checkGuestUserAccess = (url: string) => {
  return guestRegex.test(url);
};

export default checkGuestUserAccess;
