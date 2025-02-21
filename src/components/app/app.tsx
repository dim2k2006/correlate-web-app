import { useState } from 'react';
import { Parameter } from '@/domain/parameter';
import { useConfig } from '../config-provider';
import { useGetParametersByUser } from '../parameter-service-provider';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Skeleton } from '@/components/ui/skeleton';
import { Checkbox } from '@/components/ui/checkbox';

function App() {
  const { userId } = useConfig();

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
      </div>
    </>
  );
}

function LoadingPlaceholder() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}

export default App;
