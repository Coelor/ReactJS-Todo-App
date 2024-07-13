import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TodoList from '../components/TodoList';

describe('TodoList', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('it renders', () => {
        render(<TodoList />);
        expect(screen.getByText('Todo List')).toBeInTheDocument();
    });

    test('addTask adds a new task', () => {
        render(<TodoList />);
        const input = screen.getByPlaceholderText('New task');
        const button = screen.getByText('Add');

        fireEvent.change(input, { target: { value: 'Learn Reacts Testing Library' } });
        fireEvent.click(button);

        expect(screen.getByText('Learn Reacts Testing Library')).toBeInTheDocument();
    });

    test('deleteTask removes a task', () => {
        render(<TodoList />);
        const input = screen.getByPlaceholderText('New task');
        const button = screen.getByText('Add');

        fireEvent.change(input, { target: { value: 'Learn Reacts Testing Library' } });
        fireEvent.click(button);
        fireEvent.click(screen.getByText('X'));

        expect(screen.queryByText('Learn Reacts Testing Library')).not.toBeInTheDocument();
    });

    test('toggleCompleted toggles task completion', () => {
        render(<TodoList />);
        const input = screen.getByPlaceholderText('New task');
        const button = screen.getByText('Add');

        fireEvent.change(input, { target: { value: 'Learn Reacts Testing Library' } });
        fireEvent.click(button);
        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox);

        const taskText = screen.getByText('Learn Reacts Testing Library');
        expect(taskText).toHaveStyle('text-decoration: line-through');
    });
});
