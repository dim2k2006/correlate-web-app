import { useConfig } from '../config-provider';
import { useGetParametersByUser } from '../parameter-service-provider';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Skeleton } from '@/components/ui/skeleton';

function App() {
  const { userId } = useConfig();

  const parametersFetchingState = useGetParametersByUser(userId);

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
                  {parametersFetchingState.data.map((parameter) => (
                    <CommandItem key={parameter.name}>{parameter.name}</CommandItem>
                  ))}
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
