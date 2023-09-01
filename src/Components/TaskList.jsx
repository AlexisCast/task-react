import Task from './Task';

const TaskList = (props) => {
  return (
    <ul className="flex flex-wrap justify-evenly ">
      {props.tasks.map((task, index) => {
        const { _id, description, completed, owner } = task;
        return (
          <Task
            key={index}
            _id={_id}
            description={description}
            completed={completed}
            owner={owner}
          />
        );
      })}
    </ul>
  );
};

export default TaskList;
