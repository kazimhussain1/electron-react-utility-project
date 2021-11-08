import React, { useState, useEffect, useContext } from 'react';
import ProgressbarContext from './ProgressbarContext';

const DataContext = React.createContext({});

export const DataConsumer = DataContext.Consumer;
export const DataProvider = DataContext.Provider;

export default DataContext;

export function DataContainer({ children }) {
  const progressbarContext = useContext(ProgressbarContext);
  const [data, setData] = useState(null);

  const setIPCListener = () => {
    window.ipcRenderer.on('load-data-result', (evt, message) => {
      const { sd, mean, median, mode, values, max, min } = message;

      setData({ sd, mean, median, mode, values, max, min });

      progressbarContext.hideProgressbar();
    });
  };

  useEffect(() => {
    setIPCListener();
  }, []);

  return (
    <DataProvider
      value={{
        data
      }}
    >
      {children}
    </DataProvider>
  );
}
