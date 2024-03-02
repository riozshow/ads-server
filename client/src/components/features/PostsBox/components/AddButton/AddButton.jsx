import { isLogged } from '../../../../../store/userSlice';
import { useSelector } from 'react-redux';
import { showModal } from '../../../../common/Modal/showModal';
import NewPostModal from '../../modals/NewPostModal';

function AddButton() {
  const isUser = useSelector(isLogged);
  const handleNewPost = () => showModal(<NewPostModal />, 'New post');

  if (!isUser) return;
  return (
    <button
      style={{ width: '12rem' }}
      className={'primary'}
      onClick={handleNewPost}>
      <p style={{ textWrap: 'nowrap', padding: '.1rem 1rem' }}>+ New Post</p>
    </button>
  );
}

export default AddButton;
