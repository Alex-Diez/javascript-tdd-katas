import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import TodoList from '../kata';

describe("todo list", () => {
    let todoList;

    beforeEach(() => {
        todoList = ReactTestUtils.renderIntoDocument(
            <TodoList/>
        );
    });

    function addMany(size) {
        function clickButton() {
            ReactTestUtils.Simulate.change(
                ReactTestUtils.findRenderedDOMComponentWithClass(todoList, 'accept')
            );
        }
        const taskName = "Task #";
        for (let i = 1; i < size + 1; i++) {
            todoList.state.value = taskName + i;
            clickButton();
        }
    }

    test("todo list should be empty", () => {
        const taskList = ReactTestUtils.scryRenderedDOMComponentsWithTag(todoList, 'li');

        expect(taskList.length).toBe(0);
    });

    test("add one item to task list", () => {
        addMany(1);
        const taskList = ReactTestUtils.scryRenderedDOMComponentsWithTag(todoList, 'li');

        expect(taskList.map((item) => item.textContent)).toEqual(['Task #1']);
    });

    test("add many items to task list", () => {
        addMany(3);

        const taskList = ReactTestUtils.scryRenderedDOMComponentsWithTag(todoList, 'li');

        expect(taskList.map((item) => item.textContent)).toEqual(['Task #1', "Task #2", "Task #3"]);
    });

    test("remove item from task list", () => {
        addMany(3);

        ReactTestUtils.Simulate.change(
            ReactTestUtils.findRenderedDOMComponentWithClass(todoList, 'done')
        );

        const taskList = ReactTestUtils.scryRenderedDOMComponentsWithTag(todoList, 'li');

        expect(taskList.map((item) => item.textContent)).toEqual(['Task #1', "Task #2"]);
    });
});
