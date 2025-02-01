import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getCurrentUser } from "../lib/appwrite";

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   // Add other user properties as needed
// }

// interface GlobalContextProps {
//   isLogged: boolean;
//   setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
//   user: User | null;
//   setUser: React.Dispatch<React.SetStateAction<User | null>>;
//   loading: boolean;
// }

const GlobalContext = createContext({});

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};


const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLogged(true);
          setUser(res);
        } else {
          setIsLogged(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
      <GlobalContext.Provider
        value={{
          isLogged,
          user,
          loading,
        }}
      >
        {children}
      </GlobalContext.Provider>
    );
};

export default GlobalProvider;
