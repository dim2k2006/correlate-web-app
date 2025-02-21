import React, { createContext, useContext } from 'react';
import { TelegramProvider } from '@/providers/telegram';
import { useQuery } from '@tanstack/react-query';

const TelegramProviderContext = createContext<TelegramProvider | null>(null);

interface TelegramProviderProviderProps {
  provider: TelegramProvider;
  children: React.ReactNode;
}

const TelegramProviderProvider: React.FC<TelegramProviderProviderProps> = ({ provider, children }) => {
  return <TelegramProviderContext.Provider value={provider}>{children}</TelegramProviderContext.Provider>;
};

export function useTelegramProvider(): TelegramProvider {
  const ctx = useContext(TelegramProviderContext);

  if (!ctx) {
    throw new Error(
      'Error caught while consuming TelegramProviderContext. Make sure you wrap the Component inside the "TelegramProviderProvider" component.',
    );
  }

  return ctx;
}

export function useTelegramUser(initData: string) {
  const telegramProvider = useTelegramProvider();

  return useQuery({
    queryKey: ['telegramUser', initData],
    queryFn: () => telegramProvider.validateInitData(initData),
    refetchOnWindowFocus: false,
  });
}

export default TelegramProviderProvider;
