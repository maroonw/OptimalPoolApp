import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreatePool from './pages/CreatePool';
import UpdatePool from './pages/UpdatePool';
import Pool from './pages/Pool';
import Search from './pages/Search';

import PoolSideLounge from './pages/PoolSideLounge';
import CategoryPage from './pages/CategoryPage';
import ThreadPage from './pages/ThreadPage';
import NewThreadPage from './pages/NewThreadPage';

import Unauthorized from './pages/Unathorized';
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
        <Route path='/pool/:poolId' element={<Pool />} />
        <Route path='/link/:linkId' element={<LinkPage />} />
        <Route path='/unauthorized' element={<Unauthorized />} />

        {/* Private routes common for all logged-in users */}
        <Route element={<PrivateRoute allowedRoles={['HomeOwner', 'PoolProfessional', 'Admin']} />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/create-pool' element={<CreatePool />} />
          <Route path='/update-pool/:poolId' element={<UpdatePool />} />
          <Route path='/pool-side-lounge' element={<PoolSideLounge />} />
          <Route path='/pool-side-lounge/category/:categoryId' element={<CategoryPage />} />
          <Route path= 'pool-side-lounge/thread/:threadId' element={<ThreadPage />} />
          <Route path='/pool-side-lounge/category/:categoryId/new-thread' element={<NewThreadPage />} />
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

