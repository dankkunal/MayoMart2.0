import { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    user: null,
    token: "",
  });
  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      const parsedData = JSON.parse(data);
      setUser({
        ...user,
        user: parsedData.user,
        token: parsedData.token,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={[user, setUser]}>
      {children}
    </AuthContext.Provider>
  );
};

//create a custom hook to use the AuthContext
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
