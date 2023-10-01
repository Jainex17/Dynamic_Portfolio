import React, { useState, createContext, useEffect, ReactNode } from "react";
import axios from "axios";

export interface AuthContextType {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}
// Update your AuthContext definition:
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the props for AuthProvider
interface AuthProviderProps {
    children: ReactNode;
  }

// Update your AuthProvider component to handle undefined values:
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const verifyToken = async () => {
        try {
          const tokenRes = await axios.post(
            `http://localhost:5000/api/v1/verifyuser`,
            null,
            { headers: { "x-auth-token": token } }
          );
          console.log(tokenRes.data);
        } catch (error) {
          console.error(error);
        }
      };
      verifyToken();
    }
  }, []);

  const AuthValue: AuthContextType = {
    isLogin,
    setIsLogin,
  };

  return (
    <AuthContext.Provider value={AuthValue}>
      {children}
    </AuthContext.Provider>
  );
};


export default AuthContext;
