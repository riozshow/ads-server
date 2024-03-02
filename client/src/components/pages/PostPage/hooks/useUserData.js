import { API } from '../../../../api/api';
import useAsyncObject from '../../../../hooks/useAsyncObject';
import { getUser, addUser } from '../../../../store/usersSlice';

function useUserData(id) {
  const [user, loading] = useAsyncObject({
    selector: (state) => getUser(state, id),
    reducer: addUser,
    caller: id ? () => API.users.getUser(id) : null,
    reloader: id,
  });

  return [user || {}, loading];
}

export default useUserData;
