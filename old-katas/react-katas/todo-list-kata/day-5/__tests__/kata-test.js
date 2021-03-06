import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import {TodoList, TaskList, CreateTaskPanel} from '../kata';

describe("todo list", () => {
    let todoList;
    let button;
    let inputField;

    beforeEach(() => {
        todoList = ReactTestUtils.renderIntoDocument(
            <TodoList/>
        );
        button = ReactTestUtils.findRenderedDOMComponentWithTag(
            ReactTestUtils.findRenderedComponentWithType(todoList, CreateTaskPanel), 'button'
        );
        inputField = ReactTestUtils.findRenderedDOMComponentWithTag(
            ReactTestUtils.findRenderedComponentWithType(todoList, CreateTaskPanel), 'input'
        );
    });

    function findAllTasks() {
        return ReactTestUtils.scryRenderedDOMComponentsWithTag(
            ReactTestUtils.findRenderedComponentWithType(todoList, TaskList), 'li'
        );
    }

    function createTask(taskName) {
        inputField.value = taskName;
        ReactTestUtils.Simulate.change(inputField);
        ReactTestUtils.Simulate.click(button);
    }

    test("newly created task list is empty", () => {
        const tasks = findAllTasks();

        expect(tasks.length).toBe(0);
    });

    test("add task to task list when click 'accept' button", () => {
        createTask('Task #1');

        const tasks = findAllTasks();

        expect(tasks.length).toBe(1);
        expect(tasks.map((task) => task.textContent)).toEqual(['Task #1']);
    });

    test("adds three tasks to todo list", () => {
        createTask('Task #1');
        createTask('Task #2');
        createTask('Task #3');

        const tasks = findAllTasks();

        expect(tasks.length).toBe(3);
        expect(tasks.map((task) => task.textContent)).toEqual(['Task #1', 'Task #2', 'Task #3']);
    });
});
