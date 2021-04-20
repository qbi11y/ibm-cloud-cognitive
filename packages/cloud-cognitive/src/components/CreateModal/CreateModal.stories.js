/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  TextInput,
  NumberInput,
  TextArea,
  Dropdown,
  DatePicker,
  DatePickerInput,
  RadioButton,
  RadioButtonGroup,
} from 'carbon-components-react';

import { pkg } from '../../settings';
import '../../utils/enable-all'; // must come before component is imported (directly or indirectly)
import { getStorybookPrefix } from '../../../config';
import { CreateModal } from '.';
import mdx from './CreateModal.mdx';
const storybookPrefix = getStorybookPrefix(pkg, CreateModal.displayName);

import styles from './_storybook-styles.scss';

export default {
  title: `${storybookPrefix}/${CreateModal.displayName}`,
  component: CreateModal,
  parameters: {
    styles,
    docs: {
      page: mdx,
    },
  },
};

const Template = ({ storyInitiallyOpen = true, story, children, ...args }) => {
  const [open, setOpen] = useState(storyInitiallyOpen);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open {story?.storyName}</Button>

      <style>{`.${pkg.prefix}-about-modal { opacity: 0 }`};</style>
      <CreateModal open={open} onClose={() => setOpen(false)} {...args}>
        {children}
      </CreateModal>
    </>
  );
};

const TemplateWithFormValidation = ({
  storyInitiallyOpen = false,
  story,
  ...args
}) => {
  const [open, setOpen] = useState(storyInitiallyOpen);
  const [textInput, setTextInput] = useState('');
  const [invalid, setInvalid] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open {story?.storyName}</Button>
      <style>{`.${pkg.prefix}-create-modal { opacity: 0 }`};</style>
      <CreateModal
        {...args}
        open={open}
        onClose={() => setOpen(false)}
        disableSubmit={textInput.length === 0 ? true : false}
        primaryFocus=".bx--text-input">
        <TextInput
          id="1"
          key="form-field-1"
          labelText="Text input label"
          placeholder="Placeholder"
          onChange={(e) => {
            setTextInput(e.target.value);
            setInvalid(false);
          }}
          onBlur={() => {
            textInput.length === 0 && setInvalid(true);
          }}
          invalid={invalid}
          invalidText="This is a required field"
        />
        <TextInput
          id="2"
          key="form-field-2"
          labelText="Text input label (optional)"
          placeholder="Placeholder"
        />
        <TextInput
          id="3"
          key="form-field-3"
          labelText="Text input label (optional)"
          placeholder="Placeholder"
        />
        <RadioButtonGroup
          legendText="Radio button legend text goes here"
          name="radio-button-group"
          defaultSelected="radio-1">
          <RadioButton labelText="Radio-1" value="radio-1" id="radio-1" />
          <RadioButton labelText="Radio-2" value="radio-2" id="radio-2" />
          <RadioButton labelText="Radio-3" value="radio-3" id="radio-3" />
        </RadioButtonGroup>
      </CreateModal>
    </>
  );
};

const defaultProps = {
  title: 'Title',
  subtitle: 'Your subtitle text will appear here',
  description:
    'This is example description text that will appear here in your modal ',
  primaryFocus: '.bx--text-input',
};

Template.propTypes = {
  story: PropTypes.object,
  storyInitiallyOpen: PropTypes.bool,
  ...CreateModal.propTypes,
  children: PropTypes.node,
};

TemplateWithFormValidation.propTypes = {
  story: PropTypes.object,
  storyInitiallyOpen: PropTypes.bool,
  ...CreateModal.propTypes,
};

export const Default = Template.bind({});
Default.storyName = 'Create Modal';
Default.args = {
  story: Default,
  ...defaultProps,
  children: (
    <>
      <TextInput
        id="1"
        key="form-field-1"
        labelText="Text input label"
        helperText="Helper text goes here"
        placeholder="Placeholder"
      />
      <NumberInput
        id="2"
        className="create-modal--storybook-input"
        label="Number input label"
        helperText="Optional helper text goes here"
        min={0}
        max={50}
        value={1}
      />
      <RadioButtonGroup
        legendText="Radio button legend text goes here"
        name="radio-button-group"
        defaultSelected="radio-1">
        <RadioButton labelText="Radio-1" value="radio-1" id="radio-1" />
        <RadioButton labelText="Radio-2" value="radio-2" id="radio-2" />
        <RadioButton labelText="Radio-3" value="radio-3" id="radio-3" />
      </RadioButtonGroup>
      <DatePicker datePickerType="single">
        <DatePickerInput
          placeholder="mm/dd/yyyy"
          labelText="Date picker input label"
          id="date-picker-single"
        />
      </DatePicker>
    </>
  ),
};

export const DefaultWithDarkTheme = Template.bind({});
DefaultWithDarkTheme.storyName = 'Create Modal using dark theme';
DefaultWithDarkTheme.args = {
  story: DefaultWithDarkTheme,
  className: 'sb--use-carbon-theme-g90',
  ...defaultProps,
  children: (
    <>
      <TextInput
        id="1"
        key="form-field-1"
        labelText="Text input label"
        helperText="Helper text goes here"
        placeholder="Placeholder"
      />
      <Dropdown
        id="default"
        titleText="Dropdown label"
        helperText="This is some helper text"
        label="Dropdown menu options"
        items={['Option 0', 'Option 1', 'Option 2']}
      />
      <TextArea
        id="2"
        placeholder="Placeholder text"
        labelText="Text area label"
        helperText="Optional helper text"
      />
    </>
  ),
};

export const WithFormValidation = TemplateWithFormValidation.bind({});
WithFormValidation.storyName = 'Create Modal with form validation';
WithFormValidation.args = {
  story: WithFormValidation,
  ...defaultProps,
};
