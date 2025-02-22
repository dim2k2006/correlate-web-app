import React, { createContext, useContext } from 'react';

const UserIdContext = createContext<string | null>(null);

interface UserIdProviderProps {
  userId: string;
  children: React.ReactNode;
}

export const UserIdProvider: React.FC<UserIdProviderProps> = ({ userId, children }) => {
  return <UserIdContext.Provider value={userId}>{children}</UserIdContext.Provider>;
};

export function useUserId(): string {
  const ctx = useContext(UserIdContext);

  if (!ctx) {
    throw new Error(
      'Error caught while consuming UserIdContext. Make sure you wrap the Component inside the "UserIdProvider" component.',
    );
  }

  return ctx;
}
