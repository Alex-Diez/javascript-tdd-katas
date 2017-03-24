import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {TodoList, TaskList, CreateTaskPanel} from '../kata';

describe("todo list", () => {
    let todoList;
    let button;
    let inputField;

    function createTask(taskName) {
        inputField.value = taskName;

        TestUtils.Simulate.change(inputField);
        TestUtils.Simulate.click(button);
    }

    beforeEach(() => {
        todoList = TestUtils.renderIntoDocument(
            <TodoList/>
        );

        button = TestUtils.findRenderedDOMComponentWithTag(
            TestUtils.findRenderedComponentWithType(todoList, CreateTaskPanel), 'button'
        );

        inputField = TestUtils.findRenderedDOMComponentWithTag(
            TestUtils.findRenderedComponentWithType(todoList, CreateTaskPanel), 'input'
        );
    });

    test("task list is empty when rendered", () => {
        const tasks = TestUtils.scryRenderedDOMComponentsWithTag(
            TestUtils.findRenderedComponentWithType(todoList, TaskList), 'li'
        );

        expect(tasks.length).toBe(0);
    });

    test("task is added to task list when 'accept' button clicked", () => {
        createTask('Task #1');

        const tasks = TestUtils.scryRenderedDOMComponentsWithTag(
            TestUtils.findRenderedComponentWithType(todoList, TaskList), 'li'
        );

        expect(tasks.length).toBe(1);
        expect(tasks.map((task) => task.textContent)).toEqual(['Task #1']);
    });

    test("add three tasks to task list", () => {
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
