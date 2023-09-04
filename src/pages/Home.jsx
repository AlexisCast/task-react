import { useNavigate } from 'react-router-dom';
import { ButtonT } from '../TailwindComponents';

const HomePage = () => {
  //navigate programmatic imperative navigation code to move a different page, it is better a Link
  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate('/requests');
  };

  return (
    <div className="text-center">
      <h1>This is my Home Page</h1>
      <ButtonT onClick={navigateHandler}>Navigate to Requests section </ButtonT>
    </div>
  );
};

export default HomePage;
