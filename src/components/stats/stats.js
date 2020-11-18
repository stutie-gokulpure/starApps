import React from 'react';
import './stats.scss';
import PropTypes from 'prop-types';

const stats = [
    {
        id: 'serverCount',
        label: 'Total servers'
    },
    {
        id: 'idleServers',
        label: 'Idle Servers'
    },
    {
        id: 'taskCount',
        label: 'Total tasks'
    },
    {
        id: 'pendingTasks',
        label: 'Pending Tasks'
    }
];

function Stats(props) {

    function getStatItem(stat) {
        return (
            <div className="stat-wrapper">
                <div className="stat-field">{stat.label}</div>
                <div className="stat-value">{':  ' + props[stat.id]}</div>
            </div>
        )
    }

    return (
        <div className="stat-box">
            {stats.map(getStatItem)}
        </div>
    )
}

Stats.propTypes = {
    serverCount: PropTypes.number,
    taskCount: PropTypes.number,
    idleServers: PropTypes.number,
    pendingTasks: PropTypes.number,
};

Stats.defaultProps = {};

export default Stats;
