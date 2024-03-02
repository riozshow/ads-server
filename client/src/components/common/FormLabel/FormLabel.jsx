function FormLabel({ title, isCorrect }) {
  return (
    <div className='d-flex align-items-center gap-2'>
      {isCorrect && (
        <i
          style={{ color: '#00bb00', fontSize: '12px' }}
          className='bi bi-check-circle-fill'></i>
      )}
      <label style={{ color: isCorrect ? 'green' : '' }}>{title}</label>
    </div>
  );
}

export default FormLabel;
