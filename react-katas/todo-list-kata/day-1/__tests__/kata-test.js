import React from 'react';
import TestUtils from 'react-addons-test-utils';
import TodoList from '../kata';

describe("todo list", () => {
    let todoList;

    beforeEach(() => {
        todoList = TestUtils.renderIntoDocument(
            <TodoList/>
        );
    });

    function addMany(size) {
        function clickButton() {
            TestUtils.Simulate.change(
                TestUtils.findRenderedDOMComponentWithClass(todoList, 'accept')
            );
        }
        const taskName = "Task #";
        for (let i = 1; i < size + 1; i++) {
            todoList.state.value = taskName + i;
            clickButton();
        }
    }

    test("todo list should be empty", () => {
        const taskList = TestUtils.scryRenderedDOMComponentsWithTag(todoList, 'li');

        expect(taskList.length).toBe(0);
    });

    test("add one item to task list", () => {
        addMany(1);
        const taskList = TestUtils.scryRenderedDOMComponentsWithTag(todoList, 'li');

        expect(taskList.map((item) => item.textContent)).toEqual(['Task #1']);
    });

    test("add many items to task list", () => {
        addMany(3);

        const taskList = TestUtils.scryRenderedDOMComponentsWithTag(todoList, 'li');

        expect(taskList.map((item) => item.textContent)).toEqual(['Task #1', "Task #2", "Task #3"]);
    });

    test("remove item from task list", () => {
        addMany(3);

        TestUtils.Simulate.change(
            TestUtils.findRenderedDOMComponentWithClass(todoList, 'done')
        );

        const taskList = TestUtils.scryRenderedDOMComponentsWithTag(todoList, 'li');

        expect(taskList.map((item) => item.textContent)).toEqual(['Task #1', "Task #2"]);
    });
});
