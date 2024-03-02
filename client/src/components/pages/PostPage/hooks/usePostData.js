import { API } from '../../../../api/api';
import useAsyncObject from '../../../../hooks/useAsyncObject';
import { getPost, addPost } from '../../../../store/postsSlice';

function usePostData(id) {
  const [post, loading] = useAsyncObject({
    selector: (state) => getPost(state, id),
    reducer: addPost,
    caller: () => API.posts.getPost(id),
  });

  return [post || {}, loading];
}

export default usePostData;
