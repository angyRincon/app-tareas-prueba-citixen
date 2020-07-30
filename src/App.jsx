import React from 'react';
import Tasks from './Components/Tasks';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <div className="container mt-2">
        <Tasks />
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
