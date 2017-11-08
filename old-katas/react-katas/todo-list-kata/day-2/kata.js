import React from 'react';

class TodoList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {tasks: []};
        this.onTaskAccept = this.onTaskAccept.bind(this);
    }

    onTaskAccept(task) {
        let tasks = this.state.tasks;
        tasks.push(task);
        this.setState({tasks: tasks});
    }

    render() {
        return (
            <form>
                <AcceptTask onTaskAdd={this.onTaskAccept}/>
                <TaskList tasks={this.state.tasks}/>
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
        return (
            <ul>
                {
                    this.props.tasks.map((task) => <Task key={index++} name={task.toString()}/>)
                }
            </ul>
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

class AcceptTask extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
        this.state = {task: ''};
        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onClick() {
        this.props.onTaskAdd(this.state.task);
        this.setState({task: ''});
    }

    onChange(e) {
        this.setState({task: e.target.value});
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <input
                    type="text"
                    value={this.state.task}
                    onChange={this.onChange}
                />
                <button onClick={this.onClick}/>
            </div>
        )
    }
}

export {TodoList, TaskList, Task, AcceptTask}
