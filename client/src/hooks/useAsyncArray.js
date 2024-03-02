import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function useAsyncArray({
  selector = () => {},
  caller,
  reducer,
  limit = 3,
  cleaner,
  keyString,
}) {
  const dispatch = useDispatch();
  const data = useSelector(selector);
  const [loading, setLoading] = useState();
  const [end, setEnd] = useState();

  const call = async () => {
    if (end) return;
    const page = Math.floor(data.length / limit);
    setLoading(true);
    await caller({ limit, page }).then(({ data }) => {
      if (data.length < limit) setEnd(true);
      dispatch(reducer(data));
    });
    setLoading();
  };

  useEffect(() => {
    if (keyString && keyString.length > 0) {
      dispatch(cleaner());
      setEnd();
    }
  }, [keyString]);

  return [data, loading, !end ? call : null];
}

export default useAsyncArray;
