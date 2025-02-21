import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './components/app/app.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ConfigProvider from './components/config-provider';
import { ParameterServiceProvider } from './components/parameter-service-provider';
import TelegramProviderProvider from './components/telegram-provider-provider';
import { buildConfig, buildContainer } from './container';

const queryClient = new QueryClient();

const config = buildConfig();
const container = buildContainer(config);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider config={config}>
        <TelegramProviderProvider provider={container.telegramProvider}>
          <ParameterServiceProvider service={container.parameterService}>
            <App />
          </ParameterServiceProvider>
        </TelegramProviderProvider>
      </ConfigProvider>
    </QueryClientProvider>
  </StrictMode>,
);
