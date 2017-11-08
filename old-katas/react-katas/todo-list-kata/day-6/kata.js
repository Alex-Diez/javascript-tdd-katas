import React from 'react';

class CreateTaskPanel extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
        this.state = {taskName: ''};

        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({taskName: e.target.value});
        e.preventDefault();
    }

    onClick(e) {
        this.props.createTask(this.state.taskName);
        this.setState({taskName: ''});
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <input
                    type="text"
                    value={this.props.task}
                    onChange={this.onChange}
                />
                <button
                    value="accept"
                    onClick={this.onClick}
                />
            </div>
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
            <ul>{this.props.tasks.map((task) => (<li key={index++}>{task}</li>))}</ul>
        )
    }
}

class TodoList extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
        this.state = {tasks: []};
        this.createTask = this.createTask.bind(this);
    }

    createTask(task) {
        const tasks = this.state.tasks;
        tasks.push(task);
        this.setState({tasks: tasks});
    }

    render() {
        return (
            <form>
                <CreateTaskPanel createTask={this.createTask}/>
                <TaskList tasks={this.state.tasks}/>
            </form>
        )
    }
}

export {TodoList, TaskList, CreateTaskPanel}
