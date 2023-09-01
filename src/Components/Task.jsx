import classNames from 'classnames';
const Task = ({ _id, description, completed, owner }) => {
  console.log(_id);
  console.log(completed);
  return (
    <li className="p-5 m-6 max-w-[250px] rounded bg-slate-300	">
      <h2>ID: {_id}</h2>
      <h2>Description: {description}</h2>
      <h3
        className={classNames({
          '!text-[#00FF00] bg-[#1ea7fd]': completed,
          '!text-[#FF0000] bg-[#1ea7fd]': !completed
        })}>
        Status: {!completed ? 'Not Complete' : 'Completed'}
      </h3>
      <h3>Owner: {owner}</h3>
    </li>
  );
};

export default Task;
