import './App.css';
import Home from './Components/Home';
import SltStorage from './SltStorage';



import SignupAs from './SignupComponents/SignupAs';
import LoginAs from './LoginComponents/LoginAs';

import LoginCldStr from './LoginComponents/LoginCldStr';
import LoginFarmer from './LoginComponents/LoginFarmer';

import SignupColdStore from './SignupComponents/SignupColdStore';
import SignupFarmer from './SignupComponents/SignupFarmer';



import SlotBookingPage from './ColdStorageComponents/SlotBookingPage';

import CldStrAdminDashboard from './ColdStorageComponents/CldStrAdminDashboard';

import ViewSlots from './Components/ViewSlots';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FarmerDashboard from './FarmerComponents/FarmerDashboard';
function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/slt_storage' element={<SltStorage />} />

          <Route path='/loginas' element={<LoginAs />} />
          <Route path='/signup_as' element={<SignupAs />} />

          <Route path='/cld_str_login' element={<LoginCldStr />} />
          <Route path='/farmer_login' element={<LoginFarmer />} />

          <Route path='/cld_str_signup' element={<SignupColdStore  />} />
          <Route path='/farmer_signup' element={<SignupFarmer />} />

          <Route path='/choose_slots' element={<SlotBookingPage />} />
          <Route path='/cld_str_admin_dashboard' element={<CldStrAdminDashboard />} />

          <Route path="/view_slots/:owner_id" element={<ViewSlots />} />
          <Route path="/mydashboard" element={<FarmerDashboard />} />
        </Routes>
      </BrowserRouter>


      
      
    </div>
  );
}

export default App;
