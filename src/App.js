import * as React from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useGetUsersQuery } from './redux/jsonplaceholderApi';
import Users from './pages/users/Users';

function App() {
  const usersResult = useGetUsersQuery();

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Users {...usersResult} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
