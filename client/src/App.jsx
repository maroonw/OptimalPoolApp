import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';
import UpdateListing from './pages/UpdateListing';
import Listing from './pages/Listing';
import Search from './pages/Search';


import Unathorized from './pages/Unathorized';

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
        <Route path='/listing/:listingId' element={<Listing />} />
        <Route path='/link-page' element={<LinkPage />} />
        <Route path='/unathorized' element={<Unathorized />} />

        {/* Private routes common for all logged-in users */}
        <Route element={<PrivateRoute allowedRoles={['HomeOwner', 'PoolProfessional', 'Admin']} />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/create-listing' element={<CreateListing />} />
          <Route path='/update-listing/:listingId' element={<UpdateListing />} />
          <Route path='/pool-side-lounge' element={<PoolSideLounge />} />
        </Route>

        {/* Private routes for specific roles */}
        {/* HomeOwner-specific routes */}
        <Route element={<PrivateRoute allowedRoles={['HomeOwner']} />}>
          {/* HomeOwner-specific components here */}
          <Route path='/homeowner/homeownerdashboard' element={<HomeownerDashboard />} />
          <Route path='/homeowner/chemicaltracker' element={<ChemicalTracker />} />
          <Route path='/homeowner/cleaningschedule' element={<CleaningSchedule />} />

        </Route>

        {/* PoolProfessional-specific routes */}
        <Route element={<PrivateRoute allowedRoles={['PoolProfessional']} />}>
          {/* PoolProfessional-specific components here */}
          <Route path='/professional/professionaldashboard' element={<ProfessionalDashboard />} />
        </Route>

        {/* Admin-specific routes */}
        <Route element={<PrivateRoute allowedRoles={['Admin']} />}>
          {/* Admin-specific components here */}
          <Route path='/admin/admindashboard' element={<AdminDashboard />} />
        </Route>

      </Routes>


    </BrowserRouter>
  );
}