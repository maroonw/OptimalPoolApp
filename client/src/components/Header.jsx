import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // Use useLocation hook

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?searchTerm=${searchTerm}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search); // Use location.search
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]); // Update dependency to location.search

  // Dynamically render links based on the user's role
  const renderLinksBasedOnRole = () => {
    if (currentUser) {
      switch (currentUser.role) {
        case 'HomeOwner':
          return (
            <>
              <Link to='/homeowner/homeownerdashboard' className="text-slate-700 hover:underline">Dashboard</Link>
              <Link to='/homeowner/chemicaltracker' className="text-slate-700 hover:underline">Chemical Tracker</Link>
              <Link to='/homeowner/cleaningschedule' className="text-slate-700 hover:underline">Cleaning Schedule</Link>
              <Link to='/pool-side-lounge' className="text-slate-700 hover:underline">Poolside Lounge</Link>
              {/* Add more HomeOwner-specific links */}
            </>
          );
        case 'PoolProfessional':
          return (
            <>
              <Link to='/professional/professionaldashboard' className="text-slate-700 hover:underline">Dashboard</Link>
              <Link to='/pool-side-lounge' className="text-slate-700 hover:underline">Poolside Lounge</Link>
              {/* Add more PoolProfessional-specific links */}
            </>
          );
        case 'Admin':
          return (
            <>
              <Link to='/admin/admindashboard' className="text-slate-700 hover:underline">Dashboard</Link>
              <Link to='/pool-side-lounge' className="text-slate-700 hover:underline">Poolside Lounge</Link>
              {/* Add more Admin-specific links */}
            </>
          );
        default:
          return null;
      }
    } else {
      return (
        <>
          <Link to="/" className="text-slate-700 hover:underline">Home</Link>
          <Link to="/about" className="text-slate-700 hover:underline">About</Link>
          <Link to="/sign-in" className="text-slate-700 hover:underline">Sign In</Link>
        </>
      );
    }
  };

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-orange-500">Optimal</span> Pool
          </h1>
        </Link>
        <form onSubmit={handleSubmit} className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">
            <FaSearch className="text-slate-600" />
          </button>
        </form>
        <ul className="flex gap-4 items-center">
          {renderLinksBasedOnRole()}
          {currentUser && (
            <Link to="/profile">
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar || 'https://example.com/default-avatar.png'} // Provide a valid default avatar URL
                alt="profile"
              />
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
}
