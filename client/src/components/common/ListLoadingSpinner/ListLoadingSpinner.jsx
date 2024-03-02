import Spinner from '../Spinner/Spinner';

function ListLoadingSpinner({ show }) {
  return (
    <div
      className={`${
        show ? 'opacity-100' : 'opacity-0'
      } w-100 d-flex align-items-center justify-content-center p-4`}
      style={{
        pointerEvents: 'none',
        position: 'absolute',
        bottom: '0',
        backgroundImage:
          'linear-gradient(to bottom, transparent 0%, black 200%)',
      }}>
      <Spinner />
    </div>
  );
}

export default ListLoadingSpinner;
