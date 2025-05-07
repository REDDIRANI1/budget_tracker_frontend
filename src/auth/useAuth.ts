export const useAuth = () => {
  const token = localStorage.getItem("accessToken");
  const isAuthenticated = !!token;
  return { token, isAuthenticated };
};
