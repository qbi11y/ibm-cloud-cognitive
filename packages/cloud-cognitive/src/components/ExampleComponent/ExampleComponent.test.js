/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen } from '@testing-library/react'; // https://testing-library.com/docs/react-testing-library/intro
import userEvent from '@testing-library/user-event';

import { pkg } from '../../settings';
import '../../utils/enable-all'; // must come before component is imported (directly or indirectly)

import uuidv4 from '../../global/js/utils/uuidv4';

import { ExampleComponent } from '.';

const blockClass = `${pkg.prefix}--example-component`;
const componentName = ExampleComponent.displayName;

const borderColor = '#acefed';
const className = `class-${uuidv4()}`;
const dataTestId = uuidv4();
const primaryButtonLabel = `hello, world (${uuidv4()})`;
const secondaryButtonLabel = `goodbye (${uuidv4()})`;

// render an ExampleComponent with button labels and any other required props
const renderComponent = ({ ...rest }) =>
  render(
    <ExampleComponent
      {...{ primaryButtonLabel, secondaryButtonLabel, ...rest }}
    />
  );

describe(componentName, () => {
  it('renders a component ExampleComponent', () => {
    renderComponent();
    expect(screen.getByRole('main')).toHaveClass(blockClass);
  });

  it('has no accessibility violations', async () => {
    const { container } = renderComponent();
    await expect(container).toBeAccessible(componentName);
    await expect(container).toHaveNoAxeViolations();
  });

  it(`renders the borderColor property`, () => {
    renderComponent({ borderColor });
    const style = window.getComputedStyle(screen.getByRole('main'));
    // We'd prefer to test the actual border color style, but jsdom does not
    // render css custom properties (https://github.com/jsdom/jsdom/issues/1895)
    // so testing the property is the best we can do.
    expect(style.getPropertyValue(`--${pkg.prefix}-border-color`)).toEqual(
      borderColor
    );
  });

  it(`renders the boxedBorder property`, () => {
    renderComponent({ boxedBorder: true });
    expect(screen.getByRole('main')).toHaveClass(`${blockClass}--boxed-set`);
  });

  it('applies className to the containing node', () => {
    renderComponent({ className });
    expect(screen.getByRole('main')).toHaveClass(className);
  });

  it(`renders the disabled property`, () => {
    renderComponent({ disabled: true });
    screen
      .getAllByRole('button')
      .forEach((button) => expect(button).toHaveProperty('disabled', true));
  });

  it('notifies a click on each button', () => {
    const primaryHandler = jest.fn();
    const secondaryHandler = jest.fn();
    renderComponent({
      onPrimaryClick: primaryHandler,
      onSecondaryClick: secondaryHandler,
    });
    screen.getAllByRole('button').forEach(userEvent.click);
    expect(primaryHandler).toBeCalledTimes(1);
    expect(secondaryHandler).toBeCalledTimes(1);
  });

  it('renders the primaryButtonLabel and secondaryButtonLabel properties', () => {
    renderComponent();
    screen.getByText(primaryButtonLabel);
    screen.getByText(secondaryButtonLabel);
  });

  it('renders the primaryKind and secondaryKind properties', () => {
    renderComponent({ primaryKind: 'danger', secondaryKind: 'tertiary' });
    expect(
      screen.getByRole('button', { name: `danger ${primaryButtonLabel}` })
    ).toHaveClass('bx--btn--danger');
    expect(
      screen.getByRole('button', { name: secondaryButtonLabel })
    ).toHaveClass('bx--btn--tertiary');
  });

  it('renders the size property', () => {
    renderComponent({ size: 'small' });
    screen
      .getAllByRole('button')
      .forEach((button) => expect(button).toHaveClass('bx--btn--sm'));
  });

  it('adds additional properties to the containing node', () => {
    renderComponent({ 'data-testid': dataTestId });
    screen.getByTestId(dataTestId);
  });

  it('forwards a ref to an appropriate node', () => {
    const ref = React.createRef();
    renderComponent({ ref });
    expect(ref.current).toEqual(screen.getByRole('main'));
  });
});
