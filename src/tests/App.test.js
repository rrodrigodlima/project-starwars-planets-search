import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App'

describe('Table Tests',  () => {

  test('Name Filter', async () => {
    render(
        <App />
    );

    await waitFor(() => { 
      const inputName = screen.getByTestId('name-filter');
      userEvent.type(inputName, 't')
    }, {timeout: 4000})
    expect(screen.getAllByRole('row')).toHaveLength(4);
    
  //   await waitFor(() => {
  // }, {timeout: 4000})
  });

  test('Testing multiple filters', async () => {
    render(
        <App />
    );
    await waitFor(() => {
      const inputColumn = screen.getByTestId('column-filter');
      const inputCondition = screen.getByTestId('comparison-filter');
      const inputValue = screen.getByTestId('value-filter');
      const filterBtn = screen.getByTestId('button-filter')
      userEvent.selectOptions(inputColumn, screen.getByRole('option', { name: 'population' }))
      userEvent.selectOptions(inputCondition, screen.getByRole('option', { name: 'maior que' }))
      userEvent.type(inputValue, '200000');
      userEvent.click(filterBtn);
    }, {timeout: 4000})
    expect(screen.queryAllByRole('row')).toHaveLength(7);
  });

  test('multiple filters', async () => {
    render(
        <App />
    );
    await waitFor(() => {
      const inputColumn = screen.getByTestId('column-filter');
      const inputCondition = screen.getByTestId('comparison-filter');
      const inputValue = screen.getByTestId('value-filter');
      const filterBtn = screen.getByTestId('button-filter')

      userEvent.selectOptions(inputColumn, screen.getByRole('option', { name: 'rotation_period' }))
      userEvent.selectOptions(inputCondition, screen.getByRole('option', { name: 'menor que' }))
      userEvent.type(inputValue, '24');
      userEvent.click(filterBtn);
    }, {timeout: 4000})
    // await waitFor(() => {
    expect(screen.queryAllByRole('row')).toHaveLength(6);
  // }, {timeout: 4000})
  })

  test('Multiple filters', async () => {
    render(
        <App />
    );
    
    await waitFor(() => {
      const inputColumn = screen.getByTestId('column-filter');
      const inputCondition = screen.getByTestId('comparison-filter');
      const inputValue = screen.getByTestId('value-filter');
      const filterBtn = screen.getByTestId('button-filter')

      userEvent.selectOptions(inputColumn, screen.getByRole('option', { name: 'orbital_period' }))
      userEvent.selectOptions(inputCondition, screen.getByRole('option', { name: 'igual a' }))
      userEvent.type(inputValue, '304');
      userEvent.click(filterBtn);
    }, {timeout: 4000})
    expect(screen.queryAllByRole('row')).toHaveLength(2);
  })

  test('Remove Filters', async () => {
    render(
        <App />
    );
    await waitFor(() => {
      const filterBtn = screen.getByTestId('button-filter')
      userEvent.click(filterBtn);
    }, {timeout: 4000})
    expect(screen.queryAllByRole('row')).toHaveLength(9);
    const removeAllBtn = screen.getByTestId("button-remove-filters")
    userEvent.click(removeAllBtn);
    expect(screen.queryAllByRole('row')).toHaveLength(11);
    })

  test('remove filters test', async () => {
    render(
        <App />
    );

    await waitFor(() => {
      const inputColumn = screen.getByTestId('column-filter');
      const inputCondition = screen.getByTestId('comparison-filter');
      const inputValue = screen.getByTestId('value-filter');
      const filterBtn = screen.getByTestId('button-filter')
      userEvent.selectOptions(inputColumn, screen.getByRole('option', { name: 'population' }))
      userEvent.selectOptions(inputCondition, screen.getByRole('option', { name: 'maior que' }))
      userEvent.type(inputValue, '200000');
      userEvent.click(filterBtn);
    }, {timeout: 4000})

    expect(screen.queryAllByRole('row')).toHaveLength(7);
    const deleteBtn = screen.getByTestId('button-remove')
    userEvent.click(deleteBtn);
    expect(screen.queryAllByRole('row')).toHaveLength(11);
  })
});