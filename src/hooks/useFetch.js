import { useEffect, useState } from "react";
import axios from "axios";

function useFetch(url) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let unmounted = false;

    (async function () {
      try {
        setIsLoading(true);
        let { data } = await axios.get(url);
        if (unmounted) return;

        setIsLoading(false);
        setData(data);
        setError(null);
      } catch (error) {
        if (unmounted) return;

        setIsLoading(false);
        setError(error);
      }
    })();

    return () => {
      unmounted = true;
    };
  }, []);

  return { isLoading, error, data };
}

export default useFetch;
