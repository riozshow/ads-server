import { showModal } from '../../../common/Modal/showModal';
import NewPostModal from '../../../features/PostsBox/modals/NewPostModal';
import DeletePostModal from '../modals/DeletePostModal';

function OptionButtons({ post }) {
  return (
    <div className='d-flex gap-2 py-2'>
      <button
        onClick={() =>
          showModal(<NewPostModal editedPost={post} />, 'Edit post')
        }>
        <i className='bi bi-pencil-fill me-2'></i>Edit
      </button>
      <button
        onClick={() =>
          showModal(<DeletePostModal id={post._id} />, 'Delete post')
        }>
        <i className='bi bi-trash-fill me-2'></i>Delete
      </button>
    </div>
  );
}

export default OptionButtons;
