import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Contact from '../components/Contact';

export default function Pool() {
  const [pool, setPool] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPool = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/pool/get/${params.poolId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setPool(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPool();
  }, [params.poolId]);

  return (
    <main>
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && <p className='text-center my-7 text-2xl'>Something went wrong!</p>}
      {pool && !loading && !error && (
        <div>
          {/* Pool details and UI elements here */}
          <h1 className='text-3xl font-semibold'>{pool.name}</h1>
          <p>Type: {pool.type}</p> {/* Inground or Above Ground */}
          <p>Saltwater: {pool.saltwater ? 'Yes' : 'No'}</p>
          <p>Shape: {pool.shape}</p>
          <p>Volume: {pool.gallons} gallons</p>
          <p>Covered: {pool.covered ? 'Yes' : 'No'}</p>
          <p>Material: {pool.material}</p>
          {/* Add more details as needed */}
        </div>
      )}
    </main>
  );
}
