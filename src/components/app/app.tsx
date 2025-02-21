import { useState } from 'react';
import reactLogo from '../../assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { useConfig } from '../config-provider';
import { useGetParametersByUser } from '../parameter-service-provider';
import { Button } from '@/components/ui/button';

function App() {
  const [count, setCount] = useState(0);

  const { userId } = useConfig();

  const parametersFetchingState = useGetParametersByUser(userId);

  console.log('parametersFetchingState', parametersFetchingState.data);

  return (
    <>
      <div>
        {parametersFetchingState.isSuccess && <div className="status status-ok" />}

        {parametersFetchingState.isError && <div className="status status-error" />}

        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <Button>Here goes button</Button>

      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
