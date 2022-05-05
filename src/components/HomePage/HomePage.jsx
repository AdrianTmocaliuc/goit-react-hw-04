const HomePage = ({ setIsView }) => {
  return (
    <>
      <h1>You welcome !!!</h1>
      <button type="button" onClick={setIsView}>
        Show home works
      </button>
    </>
  );
};

export default HomePage;
