import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './task-item.scss';

function TaskItem({ task, removeTask }) {
  const [time, setTimer] = useState(20);

  useEffect(() => {
    if (task.server !== -1 && time >= 0) {
      setTimeout(() => setTimer(time - 1), 1000);
    } else if (task.server !== -1 && time < 0) {
      removeTask(task.id);
    }
  }, [task, removeTask, setTimer, time]);

  function getTaskInProgressDom() {
    let style = {
      width: `${(time/20) * 100}%`
    };

    return (
      <div className="list-item">
        <div className="list-item-filled" style={style}>
            <div className="list-item-text">{'00:' + time}</div>
        </div>
      </div>
    )
  }

  function getTaskWaitingDom() {
    return (
      <>
        <div className="list-item">
            <div className="list-item-text dark">waiting...</div></div>
        <div className="list-item-delete" onClick={() => removeTask(task.id)}>Delete</div>
      </>
    )
  }

  return (
    <div className="list-item-wrapper">
      {task.server !== -1 ? getTaskInProgressDom() : getTaskWaitingDom()}
    </div>
  )
}

TaskItem.propTypes = {
    task: PropTypes.shape({
        id: PropTypes.number,
        server: PropTypes.number
    })
};

TaskItem.defaultProps = {
    task: {}
};

export default TaskItem;
