import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import {TodoList, TaskList, Task, CreateTaskPanel, TaskName, AcceptButton} from '../kata';

describe("todo list kata", () => {
    let todoList;
    let inputField;
    let acceptButton;

    beforeEach(() => {
        todoList = ReactTestUtils.renderIntoDocument(
            <TodoList/>
        );

        const createTaskPanel = ReactTestUtils.findRenderedComponentWithType(todoList, CreateTaskPanel);

        inputField = ReactTestUtils.findRenderedDOMComponentWithTag(createTaskPanel, 'input');
        acceptButton = ReactTestUtils.findRenderedDOMComponentWithTag(createTaskPanel, 'button');
    });

    test("task list is empty", () => {
        const taskList = ReactTestUtils.findRenderedComponentWithType(todoList, TaskList);
        const tasks = ReactTestUtils.scryRenderedComponentsWithType(taskList, Task);

        expect(tasks.length).toBe(0);
    });

    function createTask(taskName) {
        inputField.value = taskName;
        ReactTestUtils.Simulate.change(inputField);
        ReactTestUtils.Simulate.click(acceptButton);
    }

    test("task is add to task list by clicking 'accept' button", () => {
        createTask('Task #1');

        const tasks = ReactTestUtils.scryRenderedDOMComponentsWithTag(
            ReactTestUtils.findRenderedComponentWithType(todoList, TaskList), 'li'
        );

        expect(tasks.length).toBe(1);
        expect(tasks.map((task) => task.textContent)).toEqual(['Task #1']);
    });

    test("add three tasks to a todo list", () => {
        createTask('Task #1');
        createTask('Task #2');
        createTask('Task #3');

        const tasks = ReactTestUtils.scryRenderedDOMComponentsWithTag(
            ReactTestUtils.findRenderedComponentWithType(todoList, TaskList), 'li'
        );

        expect(tasks.length).toBe(3);
        expect(tasks.map((task) => task.textContent)).toEqual(['Task #1', 'Task #2', 'Task #3']);
    });
});
