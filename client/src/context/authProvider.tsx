import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface AuthContextValue {
  token: string | null;
  userId: number | null;
  isLoading: boolean;
  login: (token: string, userId: number) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const TOKEN_KEY = "accessToken";
const USER_ID_KEY = "userId";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    const storedUserId = localStorage.getItem(USER_ID_KEY);
    if (storedToken && storedUserId) {
      setToken(storedToken);
      setUserId(Number(storedUserId));
    }
    setIsLoading(false);
  }, []);

  const login = useCallback((newToken: string, userId: number) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    localStorage.setItem(USER_ID_KEY, userId.toString());
    setToken(newToken);
    setUserId(userId);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ token, userId, isLoading, login, logout }),
    [token, isLoading, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an <AuthProvider>");
  return ctx;
};
