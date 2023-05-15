import { createContext } from 'react';

interface AuthContextProps {
  authState: boolean;
  setAuthState: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextProps>({
  authState: false,
  setAuthState: () => {},
});