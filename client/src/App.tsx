import "./App.css";
import { Routes, Route } from "react-router-dom";
import Axios from 'axios';
import { useEffect, useState } from "react";
import { AuthContext } from './helpers/AuthContext'

import Login from "./modules/EventManager/Login";
import Register from "./modules/Register";
import SignedInLayout from "./components/SignedInLayout";
import SignedOutLayout from "./components/SignedOutLayout";
import Dashboard from "./modules/Dashboard";
import Landing from "./modules/Landing";
import Borrowing from "./modules/Borrowing";
import MeetingScheduler from "./modules/MeetingScheduler";
import BulletinBoard from "./modules/BulletinBoard";
import Chatbot from "./modules/Chatbot";
import EventManager from "./modules/EventManager";
import Inventory from "./modules/Inventory";
import Grievances from "./modules/Grievances";
import RoomIssues from "./modules/RoomIssues";
import SeatingAssignment from "./modules/SeatingAssignment";

import Approve from './modules/EventManager/Approve';
import ApproveList from './modules/EventManager/ApproveList'
import Events from "./modules/EventManager/Events";
import Event from "./modules/EventManager/Event";


function App() {

  const [authState, setAuthState] = useState({
    email: '',
    id: 0,
    roles: [],
    status: false
  });

  useEffect(() => {
    Axios.get('http://localhost:8080/auth/validate', {
      headers: {
        accessToken: localStorage.getItem('accessToken')
      }
    }).then((response) => {
      if (response.data.error) {
        setAuthState({
          email: '',
          id: 0,
          roles: [],
          status: false
        })
      } else {
        // response.data = {email: 'admin@admin.com', id: 1, roles: Array(1), iat:}
        setAuthState({
          email: response.data.email,
          id: response.data.id,
          roles: response.data.roles,
          status: true
        })
      }
    });
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Routes>
          <Route element={<SignedInLayout />} >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/borrowing" element={<Borrowing />} />
            <Route path="/seating-assignment" element={<SeatingAssignment />} />
            <Route path="/meeting-scheduler" element={<MeetingScheduler />} />
            <Route path="/bulletin-board" element={<BulletinBoard />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/event-manager" element={<EventManager />}>
              <Route path="events" element={<Events />} />
              <Route path="event/:id" element={<Event />} />
              <Route path="approve/" element={<ApproveList />} />
              <Route path="approve/:id" element={<Approve />} />
            </Route>
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/grievances" element={<Grievances />} />
            <Route path="/room-issues" element={<RoomIssues />} />
          </Route>
          <Route element={<SignedOutLayout />} >
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </AuthContext.Provider>

    </div>

  );
}

export default App;
