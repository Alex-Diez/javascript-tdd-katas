import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import {TodoList, TaskList, CreateTaskPanel} from '../kata';

describe("todo list", () => {
    let todoList;

    beforeEach(() => {
        todoList = ReactTestUtils.renderIntoDocument(
            <TodoList/>
        );
    });

    function findTasks() {
        return ReactTestUtils.scryRenderedDOMComponentsWithTag(
            ReactTestUtils.findRenderedComponentWithType(todoList, TaskList), 'li'
        );
    }

    test("newly created task list is empty", () => {
        expect(findTasks().length).toBe(0);
    });

    test("new task is added to task list when 'accept' button is clicked", () => {
        const button = ReactTestUtils.findRenderedDOMComponentWithTag(
            ReactTestUtils.findRenderedComponentWithType(todoList, CreateTaskPanel), 'button'
        );
        const inputField = ReactTestUtils.findRenderedDOMComponentWithTag(
            ReactTestUtils.findRenderedComponentWithType(todoList, CreateTaskPanel), 'input'
        );

        inputField.value = 'Task #1';
        ReactTestUtils.Simulate.change(inputField);
        ReactTestUtils.Simulate.click(button);

        const tasks = findTasks();

        expect(tasks.length).toBe(1);
        expect(tasks.map((task) => task.textContent)).toEqual(['Task #1']);
    });

    test("add three new tasks to a task list", () => {
        const button = ReactTestUtils.findRenderedDOMComponentWithTag(
            ReactTestUtils.findRenderedComponentWithType(todoList, CreateTaskPanel), 'button'
        );

        const inputField = ReactTestUtils.findRenderedDOMComponentWithTag(
            ReactTestUtils.findRenderedComponentWithType(todoList, CreateTaskPanel), 'input'
        );

        inputField.value = 'Task #1';
        ReactTestUtils.Simulate.change(inputField);
        ReactTestUtils.Simulate.click(button);

        inputField.value = 'Task #2';
        ReactTestUtils.Simulate.change(inputField);
        ReactTestUtils.Simulate.click(button);

        inputField.value = 'Task #3';
        ReactTestUtils.Simulate.change(inputField);
        ReactTestUtils.Simulate.click(button);

        const tasks = findTasks();

        expect(tasks.length).toBe(3);
        expect(tasks.map((task) => task.textContent)).toEqual(['Task #1', 'Task #2', 'Task #3']);
    });
});
