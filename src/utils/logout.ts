const logoutAndRemoveSession = async (id: string) => {
  const resp = await fetch(`/logout?id=${id}`);
  const data = await resp.json();
  return data;
};

export default logoutAndRemoveSession;
