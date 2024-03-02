import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function useAsyncObject({ selector = () => {}, reducer, caller, reloader }) {
  const dispatch = useDispatch();
  const data = useSelector(selector);
  const [loading, setLoading] = useState();

  const call = async () => {
    if (loading || !caller) return;
    setLoading(true);
    await caller().then(({ data }) => dispatch(reducer(data)));
    setLoading();
  };

  useEffect(() => {
    if (!data) call();
  }, []);

  useEffect(() => {
    if (reloader && !data) call();
  }, [reloader]);

  return [data, loading];
}

export default useAsyncObject;
