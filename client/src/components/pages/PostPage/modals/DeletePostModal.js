import { closeModal } from '../../../common/Modal/closeModal';
import { API } from '../../../../api/api';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../../../store/postsSlice';
import { useNavigate } from 'react-router-dom';

function DeletePostModal({ id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    API.posts.deletePost(id).then(() => {
      closeModal();
      navigate('/');
      dispatch(deletePost(id));
    });
  };

  return (
    <div className='d-flex flex-column gap-3'>
      <p>Are You sure You want to delete this post?</p>
      <div className='d-flex gap-3'>
        <button onClick={handleDelete} className={`primary w-100`}>
          Delete
        </button>
        <button onClick={closeModal} className='w-100'>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeletePostModal;
