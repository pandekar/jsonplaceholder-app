import * as React from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useGetUsersQuery } from './redux/jsonplaceholderApi';
import Users from './pages/users/Users';
import UserDetail from './pages/users/UserDetail';
import UserDetailPost from './pages/users/UserDetailPost';
import UserDetailAlbum from './pages/users/UserDetailAlbum';
import UserDetailAlbumPhoto from './pages/users/UserDetailAlbumPhoto';

function App() {
  const usersResult = useGetUsersQuery();

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Users {...usersResult} />} />
        <Route path='users/:id' element={<UserDetail />} />
        <Route path='users/:id/post/:postId' element={<UserDetailPost />} />
        <Route path='users/:id/album/:albumId' element={<UserDetailAlbum />} />
        <Route path='users/:id/album/:albumId/photo/:photoId' element={<UserDetailAlbumPhoto />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
