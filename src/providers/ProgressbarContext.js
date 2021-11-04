import React, { useState } from 'react';

const ProgressbarContext = React.createContext({});

export const ProgressbarConsumer = ProgressbarContext.Consumer;
export const ProgressbarProvider = ProgressbarContext.Provider;

export default ProgressbarContext;

export function ProgressbarContainer({ children }) {
  const [isProgressbarVisible, setProgressbarVisible] = useState(false);
  const [progressMessage, setProgressMessage] = useState('');

  const showProgressbar = (message) => {
    setProgressMessage(message || '');
    setProgressbarVisible(true);
  };
  const hideProgressbar = () => {
    setProgressMessage('');
    setProgressbarVisible(false);
  };
  return (
    <ProgressbarProvider
      value={{
        isProgressbarVisible,
        progressMessage,
        showProgressbar,
        hideProgressbar
      }}
    >
      {children}
    </ProgressbarProvider>
  );
}
