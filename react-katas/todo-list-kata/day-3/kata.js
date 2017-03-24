import React from 'react';

class TodoList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {tasks: [], taskName: ''};
        this.createTask = this.createTask.bind(this);
        this.onTaskNameChange = this.onTaskNameChange.bind(this);
    }

    createTask() {
        const tasks = this.state.tasks;
        tasks.push(this.state.taskName);
        this.setState({tasks: tasks})
    }

    onTaskNameChange(taskName) {
        this.setState({taskName: taskName});
    }

    render() {
        return (
            <form>
                <TaskList tasks={this.state.tasks}/>
                <CreateTaskPanel onChange={this.onTaskNameChange} create={this.createTask} taskName={this.state.taskName}/>
            </form>
        )
    }
}

class TaskList extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
    }

    render() {
        let index = 0;
        let tasks = this.props.tasks.map((task) => {
            return (<Task key={index++} name={task} />)
        });
        return (
            <ul>{tasks}</ul>
        )
    }
}

class Task extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
    }

    render() {
        return (
            <li>{this.props.name}</li>
        )
    }
}

class CreateTaskPanel extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
    }

    render() {
        return (
            <div>
                <TaskName onChange={this.props.onChange}/>
                <AcceptButton createTask={this.props.create} taskName={this.props.taskName}/>
            </div>
        )
    }
}

class TaskName extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.props.onChange(e.target.value);
    }

    render() {
        return (
            <input
                type="text"
                value={this.props.task}
                onChange={this.onChange}
            />
        )
    }
}

class AcceptButton extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        this.props.createTask(this.props.taskName);
    }

    render() {
        return (
            <button onClick={this.onClick}/>
        )
    }
}

export {TodoList, TaskList, Task, CreateTaskPanel, TaskName, AcceptButton}
