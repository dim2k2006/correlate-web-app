import { useState } from 'react';
import { Parameter } from '@/domain/parameter';
import { useUserId } from '@/components/user-id-provider';
import { useGetParametersByUser } from '../parameter-service-provider';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Checkbox } from '@/components/ui/checkbox';
import { LoadingPlaceholder } from '@/components/loading-placeholder';
import { Chart } from '@/components/chart';

function App() {
  const userId = useUserId();

  const parametersFetchingState = useGetParametersByUser(userId);

  const [selectedParameters, setSelectedParameters] = useState<Parameter[]>([]);

  const toggleSelection = (parameter: Parameter) => {
    setSelectedParameters((prev) =>
      prev.find((p) => p.name === parameter.name)
        ? prev.filter((p) => p.name !== parameter.name)
        : [...prev, parameter],
    );
  };

  return (
    <>
      <div className="w-full p-4">
        {parametersFetchingState.isLoading && <LoadingPlaceholder />}

        {parametersFetchingState.isSuccess && (
          <Command>
            <CommandInput placeholder="Type parameter name or search..." />
            <CommandList>
              {parametersFetchingState.data.length === 0 ? (
                <CommandEmpty>No results found.</CommandEmpty>
              ) : (
                <CommandGroup heading="Parameters">
                  {parametersFetchingState.data.map((parameter) => {
                    const isSelected = selectedParameters.some((p) => p.id === parameter.id);

                    return (
                      <CommandItem key={parameter.name} onSelect={() => toggleSelection(parameter)}>
                        <Checkbox checked={isSelected} />

                        {parameter.name}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        )}

        {parametersFetchingState.isError && (
          <div className="w-full p-4">
            <div className="border border-red-400 bg-red-100 text-red-700 px-4 py-3 rounded">
              <strong className="font-bold">Error:</strong>{' '}
              <span>{parametersFetchingState.error?.message || 'An error occurred while fetching parameters.'}</span>
            </div>
          </div>
        )}
      </div>

      {selectedParameters.length > 0 && (
        <div className="w-full p-4">
          <h2 className="text-xl font-bold mb-4">Charts</h2>
          {selectedParameters.map((parameter) => (
            <div key={parameter.id} className="mb-4">
              <Chart
                parameterId={parameter.id}
                title={`${parameter.name}, ${parameter.unit}`}
                description={parameter.description}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default App;
