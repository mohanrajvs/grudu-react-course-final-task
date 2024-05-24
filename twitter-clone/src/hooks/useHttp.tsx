import { useState, useEffect, useCallback } from "react";

interface UseHttpOptions {
  url: string;
  method?: string;
  payload?: any;
  action?: (data: any) => void;
}

interface UseHttpResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useHttp<T>({
  url,
  method = "GET",
  payload = null,
  action,
}: UseHttpOptions): UseHttpResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const options: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (payload) {
        options.body = JSON.stringify(payload);
      }

      console.log("Fetching data from URL:", url); // Debugging log

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: T = await response.json();
      console.log("Fetch result:", result); // Debugging log
      setData(result);

      if (action) {
        action(result);
      }
    } catch (err) {
      console.error("Failed to fetch data:", err); // Debugging log
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [url, method, payload, action]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error };
}

export default useHttp;
