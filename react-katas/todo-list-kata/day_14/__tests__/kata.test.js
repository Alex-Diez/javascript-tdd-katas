import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import TaskList from '../kata';

configure({adapter: new Adapter()});

describe('todo list', () => {
    let taskList;
    let taskName;
    let createTaskButton;

    beforeEach(() => {
        taskList = mount(<TaskList/>);
        taskName = taskList.find('input');
        createTaskButton = taskList.find('button');
    });

    const createTask = (name) => {
        taskName.simulate('change', {target: {value: name}});
        createTaskButton.simulate('click');
    };

    const createNumberOfTask = (number) =>
        Array.from(new Array(number))
            .map((_, index) => index + 1)
            .forEach(index => createTask('task #' + index));

    const cancelTaskAt = (index) =>
        taskList.find('li')
            .at(index).find('.cancel')
            .simulate('click');

    const completeTaskAt = (index) =>
        taskList.find('li')
            .at(index).find('.complete')
            .simulate('click');

    test('create list', () => {
        expect(taskList.find('li').length).toBe(0);
    });

    test('add many tasks', () => {
        createNumberOfTask(3);

        expect(taskList.find('li').map(task => task.text())).toEqual(['task #1', 'task #2', 'task #3']);
    });

    test('cancel many tasks one by one', () => {
        createNumberOfTask(3);

        cancelTaskAt(0);
        expect(taskList.find('.canceled').map(task => task.text())).toEqual(['task #1']);
        cancelTaskAt(1);
        expect(taskList.find('.canceled').map(task => task.text())).toEqual(['task #1', 'task #2']);
        cancelTaskAt(2);
        expect(taskList.find('.canceled').map(task => task.text())).toEqual(['task #1', 'task #2', 'task #3']);
    });

    test('complete many tasks one by one', () => {
        createNumberOfTask(3);

        completeTaskAt(0);
        expect(taskList.find('.completed').map(task => task.text())).toEqual(['task #1']);
        completeTaskAt(1);
        expect(taskList.find('.completed').map(task => task.text())).toEqual(['task #1', 'task #2']);
        completeTaskAt(2);
        expect(taskList.find('.completed').map(task => task.text())).toEqual(['task #1', 'task #2', 'task #3']);
    });

    test('canceled task has disabled cancel and complete button', () => {
        createNumberOfTask(3);

        cancelTaskAt(1);
        const task = taskList.find('.canceled');
        const cancelTask = task.find('.cancel');
        const completeTask = task.find('.complete');

        expect(cancelTask.props().disabled).toBe(true);
        expect(completeTask.props().disabled).toBe(true);
    });

    test('completed task has disabled cancel and complete button', () => {
        createNumberOfTask(3);

        completeTaskAt(1);
        const task = taskList.find('.completed');
        const cancelTask = task.find('.cancel');
        const completeTask = task.find('.complete');

        expect(cancelTask.props().disabled).toBe(true);
        expect(completeTask.props().disabled).toBe(true);
    });
});
