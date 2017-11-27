import React, {Component} from 'react';

export default class TodoList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            taskName: '',
            tasks: []
        };

        this.createTaskList = this.createTaskList.bind(this);
        this.submitTaskName = this.submitTaskName.bind(this);
        this.createTask = this.createTask.bind(this);
    }

    submitTaskName(e) {
        e.preventDefault();

        this.setState((prevState, props) => ({taskName: e.target.value}));
    }

    createTask(e) {
        e.preventDefault();

        this.setState((prevState, props) => ({tasks: prevState.tasks.concat(prevState.taskName)}));
    }

    createTaskList() {
        const tasks = this.state.tasks;
        return tasks.map((name, index) => <Task index={index} name={name}/>);
    }

    render() {
        return (
            <form>
                <input onChange={this.submitTaskName}/>
                <button onClick={this.createTask}/>
                <ul>
                    {this.createTaskList()}
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

        this.props = props;
        this.state = {status: TASK_STATUS.IN_PROGRESS};

        this.cancel = this.cancel.bind(this);
        this.complete = this.complete.bind(this);
    }

    cancel(e) {
        e.preventDefault();

        this.setState((prevState, props) => ({status: TASK_STATUS.CANCELED}))
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
