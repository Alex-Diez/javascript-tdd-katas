import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import TaskList from '../kata';

configure({adapter: new Adapter()});

describe('todo list', () => {
    let taskList;
    let taskName;
    let createButton;

    const createTasks = (number) =>
        Array.from(new Array(number))
            .map((_, index) => index + 1)
            .forEach(index => createTask('Task #' + index));

    const createTask = (name) => {
        taskName.simulate('change', {target: {value: name}});
        createButton.simulate('click');
    };

    const cancelTaskAt = (taskList, index) => {
        const task = taskList.find('li').at(index);
        const cancelButton = task.find('.cancel');

        cancelButton.simulate('click');
    };

    beforeEach(() => {
        taskList = mount(<TaskList/>);
        taskName = taskList.find('input');
        createButton = taskList.find('#createTask');
    });

    test('create empty list', () => {
        const tasks = taskList.find('li');

        expect(tasks.length).toBe(0);
    });

    test('create a task in task list', () => {
        createTask('Task #1');

        const tasks = taskList.find('li');

        expect(tasks.map(task => task.text())).toEqual(['Task #1']);
    });

    test('create many tasks', () => {
        createTasks(3);

        const tasks = taskList.find('li');

        expect(tasks.map(task => task.text())).toEqual(['Task #1', 'Task #2', 'Task #3']);
    });

    test('cancel a task', () => {
        createTasks(3);

        cancelTaskAt(taskList, 1);

        const tasks = taskList.find('.in-progress');

        expect(tasks.map(task => task.text())).toEqual(['Task #1', 'Task #3']);
    });

    test('cancel tasks one by one', () => {
        createTasks(3);

        cancelTaskAt(taskList, 0);

        expect(taskList.find('.in-progress').map(task => task.text())).toEqual(['Task #2', 'Task #3']);
        expect(taskList.find('.canceled').map(task => task.text())).toEqual(['Task #1']);

        cancelTaskAt(taskList, 1);

        expect(taskList.find('.in-progress').map(task => task.text())).toEqual(['Task #3']);
        expect(taskList.find('.canceled').map(task => task.text())).toEqual(['Task #1', 'Task #2']);

        cancelTaskAt(taskList, 2);

        expect(taskList.find('.in-progress').map(task => task.text())).toEqual([]);
        expect(taskList.find('.canceled').map(task => task.text())).toEqual(['Task #1', 'Task #2', 'Task #3']);
    });

    test('mark task as done', () => {
        createTasks(3);

        const task = taskList.find('li').at(1);
        const completeButton = task.find('.complete');

        completeButton.simulate('click');

        expect(taskList.find('.in-progress').map(task => task.text())).toEqual(['Task #1', 'Task #3']);
        expect(taskList.find('.completed').map(task => task.text())).toEqual(['Task #2']);
    });

    test('canceled task can\'t be marked as done', () => {
        createTasks(3);

        const task = taskList.find('li').at(1);
        const cancelButton = task.find('.cancel');
        cancelButton.simulate('click');

        const sameTask = taskList.find('li').at(1);
        const completeButton = sameTask.find('.complete');

        expect(completeButton.props().disabled).toBe(true);
    });

    test('completed task can\'t be canceled', () => {
        createTasks(3);

        const task = taskList.find('li').at(1);
        const completeButton = task.find('.complete');
        completeButton.simulate('click');

        const sameTask = taskList.find('li').at(1);
        const cancelButton = sameTask.find('.cancel');

        expect(cancelButton.props().disabled).toBe(true);
    })
});
