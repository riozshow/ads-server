import { useState } from 'react';
import useForm from '../../../../hooks/useForm';
import { API } from '../../../../api/api';
import { closeModal } from '../../../common/Modal/closeModal';
import { useDispatch } from 'react-redux';
import { login } from '../../../../store/userSlice';
import FileInput from '../../../common/FileInput/FileInput';
import FormLabel from '../../../common/FormLabel/FormLabel';

function AccountModal({ tab }) {
  const [activeTab, setActiveTab] = useState(tab);

  return (
    <div className='w-100'>
      <ul className='mb-3'>
        <li
          className={activeTab === 'login' ? 'active' : ''}
          onClick={() => setActiveTab('login')}>
          Login
        </li>
        <li
          className={activeTab === 'register' ? 'active' : ''}
          onClick={() => setActiveTab('register')}>
          Register
        </li>
      </ul>
      {activeTab === 'login' && <LoginForm />}
      {activeTab === 'register' && <RegisterForm />}
    </div>
  );
}

const LoginForm = () => {
  const dispatch = useDispatch();
  const { field, submit, isCorrect, error, isAllCorrect, loading } = useForm({
    caller: API.auth.login,
    onSuccess: () => {
      API.auth.getUser().then(({ data }) => dispatch(login(data)));
      closeModal();
    },
    filters: {
      login: (val) => new RegExp(/(?=.{3,16}$)(?=[a-zA-Z0-9_-]*$)/).test(val),
      password: (val) => new RegExp(/.{8}$/).test(val),
    },
  });

  return (
    <div className='d-flex flex-column gap-2 position-relative w-100'>
      <FormLabel title={'Login'} isCorrect={isCorrect('login')} />
      <input {...field('login')} placeholder='Login' />
      <FormLabel title={'Password'} isCorrect={isCorrect('password')} />
      <input {...field('password')} placeholder='Password' type='password' />
      {error && (
        <label style={{ color: 'red' }}>
          Login or password are incorrect...
        </label>
      )}
      <button
        className={`mt-3 primary ${isAllCorrect && !loading ? '' : 'disabled'}`}
        onClick={submit}>
        {loading ? 'Wait...' : 'Login'}
      </button>
    </div>
  );
};

const RegisterForm = () => {
  const [done, setDone] = useState();

  const { field, submit, isCorrect, error, loading, isAllCorrect } = useForm({
    caller: API.auth.register,
    onSuccess: () => setDone(true),
    filters: {
      login: (val) => new RegExp(/(?=.{3,16}$)(?=[a-zA-Z0-9_-]*$)/).test(val),
      password: (val) => new RegExp(/.{8}$/).test(val),
      passwordRep: (val, form) => val.length > 0 && form.password === val,
      phone: (val) => val.length >= 6 && val.length <= 16,
    },
  });

  if (done) return <RegisterDone />;

  return (
    <div className='d-flex flex-column gap-2 position-relative w-100'>
      <FormLabel isCorrect={isCorrect('login')} title={'Login'} />
      <input {...field('login')} placeholder='Login' />
      <FormLabel isCorrect={isCorrect('password')} title={'Password'} />
      <input {...field('password')} placeholder='Password' type='password' />
      <FormLabel
        isCorrect={isCorrect('passwordRep')}
        title={'Repeat password'}
      />
      <input {...field('passwordRep')} placeholder='Password' type='password' />
      <FormLabel isCorrect={isCorrect('phone')} title={'Phone'} />
      <input {...field('phone')} placeholder='Phone' />
      <FileInput {...field('avatar', true)} title={'Add avatar...'} />
      {error && <label>{error.message}</label>}
      <button
        className={`mt-3 primary ${isAllCorrect && !loading ? '' : 'disabled'}`}
        onClick={submit}>
        {loading ? 'Wait...' : 'Register'}
      </button>
    </div>
  );
};

const RegisterDone = () => (
  <div className='d-flex flex-column gap-3 align-items-center p-4'>
    <h4>You are registered!</h4>
    <i
      style={{ color: '#00bb00', fontSize: '48px' }}
      className='bi bi-check-circle-fill'></i>
    <p>Now You can log in</p>
  </div>
);

export default AccountModal;
