import MainNavigation from '../Components/MainNavigation';

const ErrorPage = () => {
  return (
    <>
      <MainNavigation />
      <div className="text-center">
        <h1>An error occurred!</h1>
        <p>Could not find this page</p>
      </div>
    </>
  );
};

export default ErrorPage;
