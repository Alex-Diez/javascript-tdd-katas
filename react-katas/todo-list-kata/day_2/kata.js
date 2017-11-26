import React, {Component} from 'react';

export default class TaskList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            taskName: '',
            tasks: []
        };

        this.onChange = this.onChange.bind(this);
        this.createTask = this.createTask.bind(this);
        this.createTasks = this.createTasks.bind(this);
    }

    onChange(e) {
        e.preventDefault();

        this.setState((prevState, props) => ({taskName: e.target.value}))
    }

    createTask(e) {
        e.preventDefault();

        this.setState((prevState, props) => ({tasks: prevState.tasks.concat(prevState.taskName)}));
    }

    createTasks() {
        const tasks = this.state.tasks;
        return tasks.map((task, index) => <Task index={index} name={task}/>);
    }

    render() {
        return (
            <form>
                <input onChange={this.onChange}/>
                <button onClick={this.createTask}/>
                <ul>
                    {this.createTasks()}
                </ul>
            </form>
        )
    }
}

const TASK_STATUS = {
    IN_PROGRESS: 'in-progress',
    CANCELED: 'canceled',
    COMPLETED: 'completed'
};

class Task extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status: TASK_STATUS.IN_PROGRESS
        };

        this.props = props;

        this.cancel = this.cancel.bind(this);
        this.complete = this.complete.bind(this);
    }

    cancel(e) {
        e.preventDefault();

        this.setState((prevState, props) => ({status: TASK_STATUS.CANCELED}));
    }

    complete(e) {
        e.preventDefault();

        this.setState((prevState, props) => ({status: TASK_STATUS.COMPLETED}));
    }

    render() {
        return (
            <li
                key={this.props.index}
                className={this.state.status}
            >
                {this.props.name}
                <button
                    className='cancel'
                    onClick={this.cancel}
                    disabled={this.state.status !== TASK_STATUS.IN_PROGRESS}
                />
                <button
                    className='complete'
                    onClick={this.complete}
                    disabled={this.state.status !== TASK_STATUS.IN_PROGRESS}
                />
            </li>
        )
    }
}
