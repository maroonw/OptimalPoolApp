import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?searchTerm=${searchTerm}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [window.location.search]);

  // Dynamically render links based on the user's role
  const renderLinksBasedOnRole = () => {
    switch (currentUser?.role) {
      case 'HomeOwner':
        return (
          <>
            <Link to='/pages/homeowner/homeownerdashboard' className="text-slate-700 hover:underline">Dashboard</Link>
            <Link to='/pages/homeowner/maintenancelog' className="text-slate-700 hover:underline">Maintenance Log</Link>
            <Link to='/pages/homeowner/chemicaltracker' className="text-slate-700 hover:underline">Chemical Tracker</Link>
            <Link to='/pages/homeowner/cleaningschedule' className="text-slate-700 hover:underline">Cleaning Schedule</Link>
            <Link to='/pages/homeowner/equipment' className="text-slate-700 hover:underline">Equipment</Link>
            <Link to='/pages/homeowner/servicerequests' className="text-slate-700 hover:underline">Service Requests</Link>
          </>
        );
      case 'PoolProfessional':
        return (
          <>
            <Link to='/professional/professionaldashboard' className="text-slate-700 hover:underline">Dashboard</Link>
            <Link to='/professional/serviceschedule' className="text-slate-700 hover:underline">Service Schedule</Link>
            <Link to='/professional/clientpools' className="text-slate-700 hover:underline">Client Pools</Link>
            <Link to='/professional/inventory' className="text-slate-700 hover:underline">Inventory</Link>
            <Link to='/professional/maintenancerecords' className="text-slate-700 hover:underline">Maintenance Records</Link>
            <Link to='/professional/billing' className="text-slate-700 hover:underline">Billing</Link>
          </>
        );
      case 'Admin':
        return (
          <>
            <Link to='/admin/admindashboard' className="text-slate-700 hover:underline">Dashboard</Link>
            <Link to='/admin/users' className="text-slate-700 hover:underline">Manage Users</Link>
            <Link to='/admin/settings' className="text-slate-700 hover:underline">Settings</Link>
            <Link to='/admin/reports' className="text-slate-700 hover:underline">Reports</Link>
            <Link to='/admin/notifications' className="text-slate-700 hover:underline">Notifications</Link>
            <Link to='/admin/support' className="text-slate-700 hover:underline">Support</Link>
            <Link to='/admin/content' className="text-slate-700 hover:underline">Content</Link>
          </>
        );
      default:
        return (
          <>
            <Link to="/" className="text-slate-700 hover:underline">Home</Link>
            <Link to="/about" className="text-slate-700 hover:underline">About</Link>
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
          <Link to={currentUser ? "/profile" : "/sign-in"}>
            <img
              className="rounded-full h-7 w-7 object-cover"
              src={currentUser?.avatar || 'defaultAvatarUrl'}
              alt="profile"
            />
          </Link>
        </ul>
      </div>
    </header>
  );
  
  
  
}  