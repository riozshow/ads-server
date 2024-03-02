import useForm from '../../../../hooks/useForm';
import { API } from '../../../../api/api';
import { closeModal } from '../../../common/Modal/closeModal';
import { useDispatch } from 'react-redux';
import { addPost, editPost } from '../../../../store/postsSlice';
import FileInput from '../../../common/FileInput/FileInput';
import FormLabel from '../../../common/FormLabel/FormLabel';

const NewPostModal = ({ editedPost }) => {
  const dispatch = useDispatch();

  const { field, submit, isCorrect, loading, isAllCorrect } = useForm({
    caller: !editedPost
      ? API.posts.addPost
      : (form) => API.posts.editPost(editedPost._id, form),
    onSuccess: ({ post }, form) => {
      !editedPost
        ? dispatch(addPost(post))
        : dispatch(
            editPost({
              ...editedPost,
              ...form,
              image: post.image ? post.image : form.image,
            })
          );
      closeModal();
    },
    filters: {
      title: (val) => val.length >= 10 && val.length <= 50,
      location: (val) => val.length >= 5 && val.length <= 100,
      content: (val) => val.length >= 20 && val.length <= 1000,
      price: (val) => val.length > 0 && new RegExp(/^\d+$/).test(val),
    },
    initialValues: editedPost,
  });

  return (
    <div
      style={{ minWidth: '100%', width: '400px' }}
      className='d-flex flex-column gap-2'>
      <FileInput
        {...field('image', true)}
        title={
          editedPost && editedPost.image ? 'Change image...' : 'Add image...'
        }
      />
      <FormLabel title={'Title'} isCorrect={isCorrect('title')} />
      <input {...field('title')} placeholder='10-50 characters...' />
      <FormLabel title={'Content'} isCorrect={isCorrect('content')} />
      <textarea
        style={{ height: '200px' }}
        {...field('content')}
        placeholder='20-1000 characters...'
      />
      <FormLabel title={'Price'} isCorrect={isCorrect('price')} />
      <input {...field('price')} placeholder='Price...' />
      <FormLabel title={'Location'} isCorrect={isCorrect('location')} />
      <input {...field('location')} placeholder='5-100 characters' />
      <button
        className={`primary ${isAllCorrect && !loading ? '' : 'disabled'}`}
        onClick={submit}>
        {!loading ? (!editedPost ? 'Add post' : 'Save post') : 'Wait...'}
      </button>
    </div>
  );
};

export default NewPostModal;
