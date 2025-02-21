import React from 'react';
import get from 'lodash/get';
import { useTelegramUser } from '@/components/telegram-provider-provider';
import { LoadingPlaceholder } from '@/components/loading-placeholder';

export function Auth({ children }: AuthProps) {
  const initData = get(window, 'Telegram.WebApp.initData', '');
  const initDataUnsafe = get(window, 'Telegram.WebApp.initDataUnsafe', {});

  const userFetchingState = useTelegramUser(initData);

  return (
    <div>
      initData: {initData}
      <br />
      initDataUnsafe: {JSON.stringify(initDataUnsafe)}
      <br />
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
