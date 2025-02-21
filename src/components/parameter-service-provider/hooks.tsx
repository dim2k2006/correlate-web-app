import { useQuery } from '@tanstack/react-query';
import { useParameterService } from './parameter-service-provider';

export function useGetParametersByUser(userId: string) {
  const service = useParameterService();

  return useQuery({
    queryKey: ['parameters', 'userId', userId],
    enabled: userId.length > 0,
    queryFn: service.listParametersByUser.bind(service, userId),
  });
}

export function useGetMeasurementsByParameter(parameterId: string) {
  const service = useParameterService();

  return useQuery({
    queryKey: ['measurements', 'parameterId', parameterId],
    enabled: parameterId.length > 0,
    queryFn: service.listMeasurementsByParameter.bind(service, parameterId),
  });
}
