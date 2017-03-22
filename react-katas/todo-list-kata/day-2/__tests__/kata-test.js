import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {TodoList, TaskList, Task, AcceptTask} from '../kata';

describe("todo list", () => {
    let todoList;

    beforeEach(() => {
        todoList = TestUtils.renderIntoDocument(
            <TodoList/>
        );
    });

    test("new todo list is empty", () => {
        const taskList = TestUtils.scryRenderedComponentsWithType(todoList, Task);

        expect(taskList.length).toBe(0);
    });

    test.skip("add new item to todo list when click 'accept' button", () => {
        const acceptTask = TestUtils.findRenderedComponentWithType(todoList, AcceptTask);

        const inputField = TestUtils.findRenderedDOMComponentWithTag(acceptTask, 'input');
        inputField.value = 'Task #1';

        TestUtils.Simulate.change(inputField);
        TestUtils.Simulate.click(
            TestUtils.findRenderedDOMComponentWithTag(acceptTask, 'button')
        );

        const taskList = TestUtils.findRenderedComponentWithType(todoList, TaskList);
        const tasks = TestUtils.scryRenderedComponentsWithType(taskList, Task);

        expect(tasks.length).toBe(1);
        expect(tasks.map((item) => item.textContent)).toEqual(['Task #1']);
    });
});
