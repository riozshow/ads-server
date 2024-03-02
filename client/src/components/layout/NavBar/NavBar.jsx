import { useDispatch, useSelector } from 'react-redux';
import { getUser, isLogged, logout } from '../../../store/userSlice';
import { showModal } from '../../common/Modal/showModal';
import AccountModal from './modals/AccountModal';
import { API } from '../../../api/api';
import style from './NavBar.module.scss';
import { useState } from 'react';
import Container from '../../common/Container/Container';
import { imageSrc } from '../../../utils/imgSrc';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const dispatch = useDispatch();
  const isUser = useSelector(isLogged);
  const user = useSelector(getUser);
  const navigate = useNavigate();

  const [isLoggingOut, setIsLoggingOut] = useState();

  const showAccountModal = (tab) => {
    showModal(<AccountModal tab={tab} />, 'Account');
  };

  const handleLogOut = () => {
    setIsLoggingOut(true);
    API.auth.logout().then(() => {
      setIsLoggingOut();
      dispatch(logout());
    });
  };

  return (
    <nav className={style.container}>
      <Container className={`${style.wrapper} px-3`}>
        <i
          onClick={() => navigate('/')}
          style={{
            fontSize: '30px',
            color: 'rgba(0,0,0,.3)',
            cursor: 'pointer',
          }}
          className='bi bi-signpost-2-fill mx-2'
        />
        <div className='d-flex gap-2'>
          {!isUser && (
            <>
              <button onClick={() => showAccountModal('login')}>Login</button>
              <button onClick={() => showAccountModal('register')}>
                Register
              </button>
            </>
          )}
          {isUser && (
            <button
              className='d-flex align-items-center gap-2'
              onClick={handleLogOut}>
              {!isLoggingOut ? 'Logout' : 'Logging out...'}
              <img
                src={imageSrc(user.avatar || 'profile.png')}
                className={`${style.userImg} ${
                  user.avatar ? '' : style.noImage
                }`}
              />
            </button>
          )}
        </div>
      </Container>
    </nav>
  );
}

export default NavBar;
