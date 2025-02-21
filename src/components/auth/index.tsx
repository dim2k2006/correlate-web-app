import React from 'react';
import { useTelegramUser } from '@/components/telegram-provider-provider';
import { LoadingPlaceholder } from '@/components/loading-placeholder';

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        initData: string;
        // Other properties/methods can be added if needed.
      };
    };
  }
}

export function Auth({ children }: AuthProps) {
  const initData = window.Telegram?.WebApp?.initData ?? '';

  alert('initData: ' + initData);

  const userFetchingState = useTelegramUser(initData);

  return (
    <div>
      {userFetchingState.isLoading && <LoadingPlaceholder />}

      {userFetchingState.isError && (
        <div className="w-full p-4">
          <div className="border border-red-400 bg-red-100 text-red-700 px-4 py-3 rounded">
            <strong className="font-bold">Error:</strong>{' '}
            <span>{userFetchingState.error?.message || 'An error occurred while fetching user info.'}</span>
          </div>
        </div>
      )}

      {userFetchingState.isSuccess && children}
    </div>
  );
}

type AuthProps = {
  children: React.ReactNode;
};
