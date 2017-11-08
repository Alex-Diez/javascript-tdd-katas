import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import {TodoList, TaskList, Task, AcceptTask} from '../kata';

describe("todo list", () => {
    let todoList;

    beforeEach(() => {
        todoList = ReactTestUtils.renderIntoDocument(
            <TodoList/>
        );
    });

    test("new todo list is empty", () => {
        const taskList = ReactTestUtils.scryRenderedComponentsWithType(todoList, Task);

        expect(taskList.length).toBe(0);
    });

    test.skip("add new item to todo list when click 'accept' button", () => {
        const acceptTask = ReactTestUtils.findRenderedComponentWithType(todoList, AcceptTask);

        const inputField = ReactTestUtils.findRenderedDOMComponentWithTag(acceptTask, 'input');
        inputField.value = 'Task #1';

        ReactTestUtils.Simulate.change(inputField);
        ReactTestUtils.Simulate.click(
            ReactTestUtils.findRenderedDOMComponentWithTag(acceptTask, 'button')
        );

        const taskList = ReactTestUtils.findRenderedComponentWithType(todoList, TaskList);
        const tasks = ReactTestUtils.scryRenderedComponentsWithType(taskList, Task);

        expect(tasks.length).toBe(1);
        expect(tasks.map((item) => item.textContent)).toEqual(['Task #1']);
    });
});
