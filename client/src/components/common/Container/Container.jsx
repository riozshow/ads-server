function Container({ children, className }) {
  return (
    <div
      className={className}
      style={{
        maxWidth: '1200px',
        width: '100%',
        height: '100%',
        margin: 'auto',
        position: 'relative',
      }}>
      {children}
    </div>
  );
}

export default Container;
