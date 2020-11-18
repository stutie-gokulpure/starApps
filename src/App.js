import React, { useState } from 'react';
import TaskList from './components/task-list/task-list';
import Stats from './components/stats/stats';
import './App.scss';

function App() {
    const [servers, manageServers] = useState([{
        id: Math.random(),
        task: -1
    }]);
    const [tasks, manageTasks] = useState([]);
    const [removeServerFlag, setRemoveServerFlag] = useState(false);

    /**
     * The system will start with only 1 server and more servers can be added using the "Add a server" button.
     * The system can have a maximum of 10 servers running simultaneously.
     */
    function addAServer() {
        if (servers.length < 10) {
            let index = tasks.findIndex((task) => task.server === -1);
            let newServerId = Math.random();
            tasks[index].server = newServerId;
            manageServers([
                ...servers,
                {
                    id: newServerId,
                    task: index === -1 ? index : tasks[index].id
                }
            ]);
            manageTasks(tasks);
        }
    }

    /**
     * An idle server can be removed from the system by pressing the "Remove a server" button.
     * If a server is not performing any task it will be removed immediately,
     * however, if a server is doing a job it'll be removed after completing the job.
     * The system has a minimum of 1 server running.
     */
    function removeAServer() {
        if (servers.length > 1) {
            let index = servers.findIndex((server) => server.task === -1);
            if (index === -1) {
                setRemoveServerFlag(true);
            } else {
                let serversClone = [...servers];
                serversClone.splice(index, 1);
                manageServers(serversClone);
            }

        }
    }

    /**
     * Adds a task to the task list. If a server is available to carry out the the task,
     * the task execution starts immediately. If not, the task waits for a server to be free.
     */
    function addTasks() {
        let numberOfTasks = document.getElementById("numberOfTasks").value;
        let newTasks = [];
        while (numberOfTasks > 0) {
            let index = servers.findIndex((server) => server.task === -1);
            let newTaskId = Math.random();
            newTasks.push({
                id: newTaskId,
                server: index === -1 ? index : servers[index].id
            });
            if (index !== -1) servers[index].task = newTaskId;
            numberOfTasks--;
        }
        manageTasks([
            ...tasks,
            ...newTasks
        ]);
        manageServers(servers);
    }

    /**
     * Removes tasks after it's finished execution or if the user clicks on delete task button.
     * Also, reassigns the pending tasks to servers.
     *
     * @param id
     */
    function removeTask(id) {
        let tasksClone = [...tasks];
        let serversClone = [...servers];
        let index = tasksClone.findIndex((task) => task.id === id);
        const { id: taskId } = tasksClone.splice(index, 1)[0];
        const associatedServerIndex = serversClone.findIndex((server) => server.task === taskId);
        if (removeServerFlag) {
            serversClone.splice(associatedServerIndex, 1);
        } else if (associatedServerIndex !== -1) {
            index = tasksClone.findIndex((task) => task.server === -1);
            serversClone[associatedServerIndex].task = index !== -1 ? tasksClone[index].id : -1;
            if (index !== -1) tasksClone[index].server = serversClone[associatedServerIndex].id;
        }
        setRemoveServerFlag(false);
        manageTasks(tasksClone);
        manageServers(serversClone);
    }

    /**
     * Shows the system statistics
     *
     * @returns {*}
     */
    function getStatsDom () {
        const serverCount = servers.length;
        const taskCount = tasks.length;
        const idleServers = servers.filter((server) => server.task === -1);
        const idleTasks = tasks.filter((task) => task.server === -1);
        return <Stats serverCount={serverCount} taskCount={taskCount} idleServers={idleServers.length} pendingTasks={idleTasks.length} />
    }

    return (
        <div className="main-container">
            <div className="tasks-wrapper">
                <div className="button-dom">
                    <div className="button filled" onClick={addAServer}>Add a server</div>
                    <div className="button" onClick={removeAServer}>Remove a server</div>
                    <input id="numberOfTasks" type="number" min="1" defaultValue="1">{}</input>
                    <div className="button filled" onClick={addTasks}>Add tasks</div>
                </div>
                <TaskList tasks={tasks} removeTask={removeTask}/>
            </div>
            {getStatsDom()}
        </div>
    );
}

export default App;
