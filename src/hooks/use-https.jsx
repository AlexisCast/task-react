import { useState } from 'react';

const useHttps = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);

  const sendRequest = async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body || null
      });
      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(
          await `
              Message: ${errorMessage.error || 'Error on Creating User'}
              Status: ${response.status}
              URL: ${response.url}`
        );
      }
      if (requestConfig.url.includes('users/logout')) {
        applyData();
      } else {
        const data = await response.json();
        applyData(data);
      }
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  return {
    isLoading,
    error,
    sendRequest
  };
};

export default useHttps;
