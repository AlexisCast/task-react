import { useMemo } from 'react';

import Task from './Task';
import { ButtonT } from '../TailwindComponents';

const TaskList = (props) => {
  console.log('TaskList', props.tasks);
  const memoizedTasks = useMemo(() => {
    return props.tasks.map((task, index) => {
      const { _id, description, completed, owner } = task;
      return (
        <Task key={index} _id={_id} description={description} completed={completed} owner={owner} />
      );
    });
  }, [props.tasks]);

  // const memoizedTasks = props.tasks.map((task, index) => {
  //   const { _id, description, completed, owner } = task;
  //   return (
  //     <Task key={index} _id={_id} description={description} completed={completed} owner={owner} />
  //   );
  // });

  return (
    <>
      {/* <ButtonT onClick={props.updateHandler}>{props.change ? 'true' : 'false'}</ButtonT> */}
      <ul className="flex flex-wrap justify-evenly">{memoizedTasks}</ul>
    </>
  );
};

export default TaskList;
