import React, { createContext, useContext } from 'react';
import { ParameterService } from '../../domain/parameter';

const ParameterServiceContext = createContext<ParameterService | null>(null);

interface ParameterServiceProviderProps {
  service: ParameterService;
  children: React.ReactNode;
}

const ParameterServiceProvider: React.FC<ParameterServiceProviderProps> = ({ service, children }) => {
  return <ParameterServiceContext.Provider value={service}>{children}</ParameterServiceContext.Provider>;
};

export function useParameterService(): ParameterService {
  const ctx = useContext(ParameterServiceContext);

  if (!ctx) {
    throw new Error(
      'Error caught while consuming ParameterServiceContext. Make sure you wrap the Component inside the "ParameterServiceProvider" component.',
    );
  }

  return ctx;
}

export default ParameterServiceProvider;
