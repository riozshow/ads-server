import { useEffect, useState } from 'react';
import Search from '../Search/Search';

function SearchLazy({ onChange = () => {}, setLoading = () => {} }) {
  const [value, setValue] = useState('');
  const [phrase, setPhrase] = useState('');

  const handleChange = (oldValue) => {
    if (oldValue.length === 0) {
      return setPhrase('');
    }
    setLoading(true);
    setTimeout(() => {
      setPhrase(oldValue);
    }, 400);
  };

  useEffect(() => {
    handleChange(value);
  }, [value]);

  useEffect(() => {
    if (phrase === value) {
      onChange(phrase);
    }
    setLoading();
  }, [phrase]);

  return <Search value={value} onChange={(e) => setValue(e.target.value)} />;
}

export default SearchLazy;
