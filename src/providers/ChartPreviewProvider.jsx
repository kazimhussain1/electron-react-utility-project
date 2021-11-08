import React, { useState } from 'react';

const ChartPreviewContext = React.createContext({});

export const ChartPreviewConsumer = ChartPreviewContext.Consumer;
export const ChartPreviewProvider = ChartPreviewContext.Provider;

export default ChartPreviewContext;

export function ChartPreviewContainer({ children }) {
  const [chart, setChart] = useState(null);

  const showChart = (type) => {
    setChart({ type });
  };
  const hideChart = () => {
    setChart(null);
  };
  return (
    <ChartPreviewProvider
      value={{
        chart,
        showChart,
        hideChart
      }}
    >
      {children}
    </ChartPreviewProvider>
  );
}
