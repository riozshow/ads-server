import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage/HomePage';
import PostPage from './components/pages/PostPage/PostPage';
import NavBar from './components/layout/NavBar/NavBar';
import Modal from './components/common/Modal/Modal';
import { useEffect } from 'react';
import { API } from './api/api';
import { useDispatch } from 'react-redux';
import { login } from './store/userSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    API.auth
      .getUser()
      .then(({ data }) => dispatch(login(data)))
      .catch(() => {});
  });

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/posts/:id' element={<PostPage />} />
      </Routes>
      <Modal />
    </BrowserRouter>
  );
}

export default App;
