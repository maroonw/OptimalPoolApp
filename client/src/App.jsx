import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreatePool from './pages/CreatePool'; // Renamed from CreateListing
import UpdatePool from './pages/UpdatePool'; // Renamed from UpdateListing
import Pool from './pages/Pool'; // Renamed from Listing
import Search from './pages/Search';

import Unauthorized from './pages/Unathorized'; // Fixed typo

import PoolSideLounge from './pages/PoolSideLounge';
import LinkPage from './pages/LinkPage';

import HomeownerDashboard from './pages/homeowner/HomeownerDashboard';
import ChemicalTracker from './pages/homeowner/ChemicalTracker';
import CleaningSchedule from './pages/homeowner/CleaningSchedule';

import ProfessionalDashboard from './pages/professional/ProfessionalDashboard';

import AdminDashboard from './pages/admin/AdminDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Public routes */}
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/about' element={<About />} />
        <Route path='/search' element={<Search />} />
        <Route path='/pool/:poolId' element={<Pool />} /> // Updated from /listing/:listingId
        <Route path='/link-page' element={<LinkPage />} />
        <Route path='/unauthorized' element={<Unauthorized />} /> // Updated path

        {/* Private routes common for all logged-in users */}
        <Route element={<PrivateRoute allowedRoles={['HomeOwner', 'PoolProfessional', 'Admin']} />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/create-pool' element={<CreatePool />} /> // Renamed from /create-listing
          <Route path='/update-pool/:poolId' element={<UpdatePool />} /> // Renamed from /update-listing/:listingId
          <Route path='/pool-side-lounge' element={<PoolSideLounge />} />
        </Route>

        {/* Private routes for specific roles */}
        {/* HomeOwner-specific routes */}
        <Route element={<PrivateRoute allowedRoles={['HomeOwner']} />}>
          <Route path='/homeowner/homeownerdashboard' element={<HomeownerDashboard />} />
          <Route path='/homeowner/chemicaltracker' element={<ChemicalTracker />} />
          <Route path='/homeowner/cleaningschedule' element={<CleaningSchedule />} />
        </Route>

        {/* PoolProfessional-specific routes */}
        <Route element={<PrivateRoute allowedRoles={['PoolProfessional']} />}>
          <Route path='/professional/professionaldashboard' element={<ProfessionalDashboard />} />
        </Route>

        {/* Admin-specific routes */}
        <Route element={<PrivateRoute allowedRoles={['Admin']} />}>
          <Route path='/admin/admindashboard' element={<AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
