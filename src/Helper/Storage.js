export const setAuthUser = (data) => {
  localStorage.setItem("user", JSON.stringify(data));
};

export const getAuthUser = () => {
  const userString = localStorage.getItem("user");
  return userString ? JSON.parse(userString) : null;
};

export const removeAuthUser = () => {
  localStorage.removeItem("user");
};
