import React, { useState } from 'react';

const PreviewContext = React.createContext({});

export const PreviewConsumer = PreviewContext.Consumer;
export const PreviewProvider = PreviewContext.Provider;

export default PreviewContext;

export function PreviewContainer({ children }) {
  const [imgUrl, setImgUrl] = useState(null);

  const showPreview = (url) => {
    setImgUrl(url);
  };
  const hidePreview = () => {
    setImgUrl(null);
  };

  return (
    <PreviewProvider
      value={{
        imgUrl,
        showPreview,
        hidePreview
      }}
    >
      {children}
    </PreviewProvider>
  );
}
