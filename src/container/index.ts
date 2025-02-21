import { ParameterService, ParameterRepositoryCorrelate, ParameterServiceImpl } from '../domain/parameter';

function getEnvVariable(name: string): string {
  const value = import.meta.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export function buildConfig(): Config {
  const apiBaseUrl = getEnvVariable('VITE_API_BASE_URL');
  const userId = getEnvVariable('VITE_USER_ID');
  const correlateApiKey = getEnvVariable('VITE_CORRELATE_API_KEY');

  return {
    apiBaseUrl,
    userId,
    correlateApiKey,
  };
}

export type Config = {
  apiBaseUrl: string;
  userId: string;
  correlateApiKey: string;
};

export function buildContainer(config: Config): Container {
  const parameterRepository = new ParameterRepositoryCorrelate({
    apiKey: config.correlateApiKey,
    baseUrl: config.apiBaseUrl,
  });

  const parameterService = new ParameterServiceImpl({ parameterRepository });

  return {
    config,
    parameterService,
  };
}

export type Container = {
  config: Config;
  parameterService: ParameterService;
};
