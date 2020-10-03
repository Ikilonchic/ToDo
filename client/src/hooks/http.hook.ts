import { useCallback, useState } from 'react';

function convertData(data: any, type: string) {
  switch (type) {
    case 'application/json':
      return JSON.stringify(data);
  
    default:
      return data;
  }
}

export const useHttp = () => {
  const [ loading, setLoading ] = useState();
  const [ error, setError ] = useState();

  const request = useCallback(async (url: string, method: string = 'GET', body = null, headers: Record<string, string> = {'Content-type': 'application/json'}) => {
    try {
      body = convertData(body, headers['Content-type']);

      const response = await fetch(url, { method, body, headers });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || 'Something wrong');
      }
      
      setLoading(false);

      return data;
    } catch (error) {
      setLoading(false);
      setError(error.message);
      throw error;
    }
  }, []);

  const clearError = () => setError(null);

  return { loading, request, error, clearError };
}