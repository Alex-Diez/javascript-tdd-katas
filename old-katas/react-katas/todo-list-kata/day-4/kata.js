import React from 'react';

class TodoList extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
        this.state = {tasks: []};
        this.onTaskCreate = this.onTaskCreate.bind(this);
    }

    onTaskCreate(task) {
        const tasks = this.state.tasks;
        tasks.push(task);
        this.setState({tasks: tasks});
    }

    render() {
        return (
            <form>
                <CreateTaskPanel createTask={this.onTaskCreate}/>
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
            <ul>{this.props.tasks.map((task) => (<li key={index++}>{task.toString()}</li>))}</ul>
        )
    }
}

class CreateTaskPanel extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
        this.state = {taskName: ''};

        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onChange(e) {
        this.setState({taskName: e.target.value});
    }

    onClick() {
        this.props.createTask(this.state.taskName);
    }

    render() {
        return (
            <div>
                <input
                    type="text"
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

export {TodoList, TaskList, CreateTaskPanel}
