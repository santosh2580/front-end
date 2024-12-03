import { useEffect, useState } from 'react';

function useGame() {
  const [theData, setTheData] = useState();
  const [loading, setLoading] = useState(false);
  const [errorData, setErrorData] = useState('');

  useEffect(() => {
    async function getMyData() {
      try {
        setLoading(true);
        const res = await fetch('https://marcconrad.com/uob/banana/api.php');
        const data = await res.json();
        setTheData(data);
        setErrorData(null);
        setLoading(false);
      } catch (error) {
        setErrorData('Failed to fetch!');
        setLoading(false);
      }
    }
    getMyData();
  }, []);

  return { theData, loading, errorData };
}

export default useGame;
