import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {TodoList, TaskList, CreateTaskPanel} from '../kata';

describe("todo list", () => {
    let todoList;

    beforeEach(() => {
        todoList = TestUtils.renderIntoDocument(
            <TodoList/>
        );
    });

    function findTasks() {
        return TestUtils.scryRenderedDOMComponentsWithTag(
            TestUtils.findRenderedComponentWithType(todoList, TaskList), 'li'
        );
    }

    test("newly created task list is empty", () => {
        const tasks = findTasks();

        expect(tasks.length).toBe(0);
    });

    test("add one task to task list when click 'accept' button", () => {
        const button = TestUtils.findRenderedDOMComponentWithTag(
            TestUtils.findRenderedComponentWithType(todoList, CreateTaskPanel), 'button'
        );
        const inputField = TestUtils.findRenderedDOMComponentWithTag(
            TestUtils.findRenderedComponentWithType(todoList, CreateTaskPanel), 'input'
        );

        inputField.value = 'Task #1';
        TestUtils.Simulate.change(inputField);
        TestUtils.Simulate.click(button);

        const tasks = findTasks();

        expect(tasks.length).toBe(1);
        expect(tasks.map((task) => task.textContent)).toEqual(['Task #1']);
    });

    test("add many tasks to task list", () => {
        const button = TestUtils.findRenderedDOMComponentWithTag(
            TestUtils.findRenderedComponentWithType(todoList, CreateTaskPanel), 'button'
        );
        const inputField = TestUtils.findRenderedDOMComponentWithTag(
            TestUtils.findRenderedComponentWithType(todoList, CreateTaskPanel), 'input'
        );

        inputField.value = 'Task #1';
        TestUtils.Simulate.change(inputField);
        TestUtils.Simulate.click(button);

        inputField.value = 'Task #2';
        TestUtils.Simulate.change(inputField);
        TestUtils.Simulate.click(button);

        inputField.value = 'Task #3';
        TestUtils.Simulate.change(inputField);
        TestUtils.Simulate.click(button);

        const tasks = findTasks();

        expect(tasks.length).toBe(3);
        expect(tasks.map((task) => task.textContent)).toEqual(['Task #1', 'Task #2', 'Task #3']);
    });
});
