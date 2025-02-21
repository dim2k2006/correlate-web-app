import './App.css';
import { useConfig } from '../config-provider';
import { useGetParametersByUser } from '../parameter-service-provider';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';

function App() {
  const { userId } = useConfig();

  const parametersFetchingState = useGetParametersByUser(userId);

  console.log('parametersFetchingState', parametersFetchingState.data);

  const parameters = parametersFetchingState.data ?? [];

  return (
    <>
      <div className="w-full">
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

            <CommandGroup heading="Parameters">
              {parameters.map((parameter) => (
                <CommandItem>{parameter.name}</CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </div>

      <div>
        {parametersFetchingState.isSuccess && <div className="status status-ok" />}

        {parametersFetchingState.isError && <div className="status status-error" />}
      </div>
    </>
  );
}

export default App;
