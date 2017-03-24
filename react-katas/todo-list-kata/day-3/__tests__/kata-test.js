import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {TodoList, TaskList, Task, CreateTaskPanel, TaskName, AcceptButton} from '../kata';

describe("todo list kata", () => {
    let todoList;
    let inputField;
    let acceptButton;

    beforeEach(() => {
        todoList = TestUtils.renderIntoDocument(
            <TodoList/>
        );

        const createTaskPanel = TestUtils.findRenderedComponentWithType(todoList, CreateTaskPanel);

        inputField = TestUtils.findRenderedDOMComponentWithTag(createTaskPanel, 'input');
        acceptButton = TestUtils.findRenderedDOMComponentWithTag(createTaskPanel, 'button');
    });

    test("task list is empty", () => {
        const taskList = TestUtils.findRenderedComponentWithType(todoList, TaskList);
        const tasks = TestUtils.scryRenderedComponentsWithType(taskList, Task);

        expect(tasks.length).toBe(0);
    });

    function createTask(taskName) {
        inputField.value = taskName;
        TestUtils.Simulate.change(inputField);
        TestUtils.Simulate.click(acceptButton);
    }

    test("task is add to task list by clicking 'accept' button", () => {
        createTask('Task #1');

        const tasks = TestUtils.scryRenderedDOMComponentsWithTag(
            TestUtils.findRenderedComponentWithType(todoList, TaskList), 'li'
        );

        expect(tasks.length).toBe(1);
        expect(tasks.map((task) => task.textContent)).toEqual(['Task #1']);
    });

    test("add three tasks to a todo list", () => {
        createTask('Task #1');
        createTask('Task #2');
        createTask('Task #3');

        const tasks = TestUtils.scryRenderedDOMComponentsWithTag(
            TestUtils.findRenderedComponentWithType(todoList, TaskList), 'li'
        );

        expect(tasks.length).toBe(3);
        expect(tasks.map((task) => task.textContent)).toEqual(['Task #1', 'Task #2', 'Task #3']);
    });
});
