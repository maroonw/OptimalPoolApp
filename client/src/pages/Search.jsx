import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PoolItem from '../components/PoolItem'; // Updated import

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    // Update or remove filters based on your pool attributes
    sort: 'created_at',
    order: 'desc',
  });

  const [loading, setLoading] = useState(false);
  const [pools, setPools] = useState([]); // Updated from listings
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    // Update the state based on URL parameters

    const fetchPools = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/pool/get?${searchQuery}`); // Updated endpoint
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setPools(data); // Updated from setListings
      setLoading(false);
    };

    fetchPools();
  }, [location.search]);

  const handleChange = (e) => {
    // Update the sidebardata state based on form inputs
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Construct the search query and navigate to the updated URL
  };

  const onShowMoreClick = async () => {
    // Fetch additional pools when "Show more" is clicked
  };

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7  border-b-2 md:border-r-2 md:min-h-screen'>
        {/* Sidebar search form */}
      </div>
      <div className='flex-1'>
        <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>
          Pool results:
        </h1>
        <div className='p-7 flex flex-wrap gap-4'>
          {/* Display search results using PoolItem components */}
        </div>
      </div>
    </div>
  );
}
