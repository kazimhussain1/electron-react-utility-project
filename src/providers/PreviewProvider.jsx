import React, { useState } from 'react';

const PreviewContext = React.createContext({});

export const PreviewConsumer = PreviewContext.Consumer;
export const PreviewProvider = PreviewContext.Provider;

export default PreviewContext;

export function PreviewContainer({ children }) {
  const [imgUrl, setImgUrl] = useState(null);

  const [chart, setChart] = useState(null);

  const showPreview = (url) => {
    setImgUrl(url);
  };
  const hidePreview = () => {
    setImgUrl(null);
  };

  const showChart = (type) => {
    setChart({ type });
  };
  const hideChart = () => {
    setChart(null);
  };
  return (
    <PreviewProvider
      value={{
        imgUrl,
        chart,
        showPreview,
        hidePreview,
        showChart,
        hideChart
      }}
    >
      {children}
    </PreviewProvider>
  );
}
