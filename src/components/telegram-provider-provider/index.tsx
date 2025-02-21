import React, { createContext, useContext } from 'react';
import { TelegramProvider } from '@/providers/telegram';

const TelegramProviderContext = createContext<TelegramProvider | null>(null);

interface TelegramProviderProviderProps {
  provider: TelegramProvider;
  children: React.ReactNode;
}

const TelegramProviderProvider: React.FC<TelegramProviderProviderProps> = ({ provider, children }) => {
  return <TelegramProviderContext.Provider value={provider}>{children}</TelegramProviderContext.Provider>;
};

export function useConfig(): TelegramProvider {
  const ctx = useContext(TelegramProviderContext);

  if (!ctx) {
    throw new Error(
      'Error caught while consuming TelegramProviderContext. Make sure you wrap the Component inside the "TelegramProviderProvider" component.',
    );
  }

  return ctx;
}

export default TelegramProviderProvider;
