import React, {Component} from 'react';

export default class TaskList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            taskName: '',
            tasks: [],
            canceledTasks: [],
            completedTasks: []
        };

        this.onChange = this.onChange.bind(this);
        this.createTask = this.createTask.bind(this);
        this.createTasks = this.createTasks.bind(this);
        this.cancelTask = this.cancelTask.bind(this);
        this.completeTask = this.completeTask.bind(this);
    }

    onChange(e) {
        e.preventDefault();
        this.setState((prevState, props) => ({taskName: e.target.value}));
    }

    createTask(e) {
        e.preventDefault();

        this.setState((prevState, props) => ({
            tasks: prevState.tasks.concat({
                taskName: prevState.taskName,
                taskState: TASK_STATE.IN_PROGRESS
            })
        }))
    }

    createTasks() {
        const tasks = [];
        this.state.tasks.map(
            (task, index) =>
                tasks.push(
                    <Task
                        index={index}
                        name={task.taskName}
                        onCancel={this.cancelTask}
                        onComplete={this.completeTask}
                        state={task.taskState}
                    />
                )
        );
        return tasks;
    }

    cancelTask(index) {
        this.setState((prevState, props) => {
            const tasks = prevState.tasks;
            const prevTask = tasks[index];
            tasks[index] = {taskName: prevTask.taskName, taskState: TASK_STATE.CANCELED};
            return {tasks: tasks};
        })
    }

    completeTask(index) {
        this.setState((prevState, props) => {
            const tasks = prevState.tasks;
            const prevTask = tasks[index];
            tasks[index] = {taskName: prevTask.taskName, taskState: TASK_STATE.COMPLETED};
            return {tasks: tasks};
        })
    }

    render() {
        return (
            <form>
                <input onChange={this.onChange}/>
                <button
                    id='createTask'
                    onClick={this.createTask}
                />
                <ul>
                    {this.createTasks()}
                </ul>
            </form>
        )
    }
}

const TASK_STATE = {
    IN_PROGRESS: 'in-progress',
    CANCELED: 'canceled',
    COMPLETED: 'completed'
};

class Task extends Component {
    constructor(props) {
        super(props);

        this.props = props;

        this.cancel = this.cancel.bind(this);
        this.done = this.done.bind(this);
    }

    cancel(e) {
        e.preventDefault();

        this.props.onCancel(this.props.index);
    }

    done(e) {
        e.preventDefault();

        this.props.onComplete(this.props.index);
    }

    render() {
        return (
            <li
                key={this.props.index}
                className={this.props.state}
            >
                {this.props.name}
                <button
                    className='cancel'
                    onClick={this.cancel}
                    disabled={this.props.state === TASK_STATE.COMPLETED}
                />
                <button
                    className='complete'
                    onClick={this.done}
                    disabled={this.props.state === TASK_STATE.CANCELED}
                />
            </li>
        )
    }
}
