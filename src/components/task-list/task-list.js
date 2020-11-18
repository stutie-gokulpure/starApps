import React from 'react';
import PropTypes from 'prop-types';
import TaskItem from '../task-item/task-item';
import "./task-list.scss";

function TaskList({tasks, removeTask}) {

    function getTaskListItemDOM(task) {
        return (
            <div key={task.id}>
                <TaskItem task={task} removeTask={removeTask}/>
            </div>
        )
    }

    return (
        <div className="task-list-wrapper">
            {tasks.map(getTaskListItemDOM)}
        </div>

    )
}

TaskList.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.shape({
        ...TaskItem.propTypes
    }))
};

TaskList.defaultProps = {
    tasks: []
};

export default TaskList;
