import { useEffect, useState } from 'react';

function useForm({ caller, onSuccess, filters = [], initialValues }) {
  const [form, setForm] = useState({});
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [loading, setLoading] = useState();

  const submit = async () => {
    if (loading) return;
    const body = prepareBody(form);
    setLoading(true);
    await caller(body)
      .then(({ data }) => setSuccess(data))
      .catch((err) => setError(err.response.data));
    setLoading();
  };

  const field = (name, isFile) => {
    const handlers = {
      onChange: (e) => {
        setForm({
          ...form,
          [name]: !isFile ? e.target.value : e.target.files[0],
        });
        if (error) setError();
      },
      onKeyDown: (e) => {
        if (e.key === 'Enter' && e.target.type !== 'textarea') {
          submit();
        }
      },
    };
    if (!isFile) {
      handlers.value = form[name] || '';
    }
    return handlers;
  };

  const isCorrect = (field) =>
    filters[field] && form[field] && filters[field](form[field], form);

  const isAllCorrect = !Object.keys(filters).some((key) => !isCorrect(key));

  const prepareBody = (form) => {
    if (!initialValues) return form;
    const body = { ...form };
    for (const field in form) {
      if (body[field] === initialValues[field]) {
        delete body[field];
      }
    }
    return body;
  };

  useEffect(() => {
    if (success) {
      onSuccess(success, form);
    }
  }, [success]);

  useEffect(() => {
    if (initialValues) {
      setForm({ ...initialValues });
    }
  }, []);

  return {
    field,
    form,
    submit,
    error,
    success,
    loading,
    isCorrect,
    isAllCorrect,
  };
}

export default useForm;
