import React, { createContext, useContext, useState, ReactNode } from 'react';

export type AuthMethod = 'cued-click-points' | 'image-sequence';

interface AuthContextType {
  authMethod: AuthMethod;
  setAuthMethod: (method: AuthMethod) => void;
  authenticatedUser: string | null;
  setAuthenticatedUser: (username: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authMethod, setAuthMethod] = useState<AuthMethod>('cued-click-points');
  const [authenticatedUser, setAuthenticatedUser] = useState<string | null>(null);

  return (
    <AuthContext.Provider
      value={{
        authMethod,
        setAuthMethod,
        authenticatedUser,
        setAuthenticatedUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
