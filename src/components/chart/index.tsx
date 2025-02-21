import { useGetMeasurementsByParameter } from '@/components/parameter-service-provider';
import { LoadingPlaceholder } from '@/components/loading-placeholder';
import { LineChart } from '@/components/line-chart';

export function Chart({ parameterId, title, description }: ChartProps) {
  const measurementsFetchingState = useGetMeasurementsByParameter(parameterId);

  return (
    <div>
      {measurementsFetchingState.isLoading && <LoadingPlaceholder />}

      {measurementsFetchingState.isSuccess && (
        <LineChart title={title} description={description} data={measurementsFetchingState.data} />
      )}

      {measurementsFetchingState.isError && (
        <div className="w-full p-4">
          <div className="border border-red-400 bg-red-100 text-red-700 px-4 py-3 rounded">
            <strong className="font-bold">Error:</strong>{' '}
            <span>{measurementsFetchingState.error?.message || 'An error occurred while fetching measurements.'}</span>
          </div>
        </div>
      )}
    </div>
  );
}

type ChartProps = {
  parameterId: string;
  title: string;
  description?: string;
};
