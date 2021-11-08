import React, { useState, useEffect, useContext } from 'react';
import ProgressbarContext from './ProgressbarContext';

const PathContext = React.createContext({});

export const PathConsumer = PathContext.Consumer;
export const PathProvider = PathContext.Provider;

export default PathContext;

export function PathContainer({ children }) {
  const progressbarContext = useContext(ProgressbarContext);
  const [workingDir, setWorkingDir] = useState(localStorage.getItem('workingDirectory') || '');
  const [selectedFile, setSelectedFile] = useState('');

  const setIPCListener = () => {
    window.ipcRenderer.on('select-dirs-result', (evt, message) => {
      const path = message.path[0] || workingDir;
      setWorkingDir(path);
      setSelectedFile('');
      localStorage.setItem('workingDirectory', path);

      setTimeout(() => {
        progressbarContext.hideProgressbar();
      });
    });
  };

  useEffect(() => {
    setIPCListener();
  }, []);

  return (
    <PathProvider
      value={{
        workingDir,
        selectedFile,
        setSelectedFile
      }}
    >
      {children}
    </PathProvider>
  );
}
