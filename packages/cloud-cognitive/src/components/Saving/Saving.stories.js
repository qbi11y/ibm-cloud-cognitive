/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useEffect } from 'react';
import styles from './_storybook-styles.scss'; // import index in case more files are added later.
import { pkg } from '../../settings';
import '../../utils/enable-all'; // must come before component is imported (directly or indirectly)
import { getStorybookPrefix } from '../../../config';
import { Saving } from '.';
import mdx from './Saving.mdx';
import wait from '../../global/js/utils/wait';
import { TextArea } from 'carbon-components-react';
const storybookPrefix = getStorybookPrefix(pkg, Saving.displayName);

export default {
  title: `${storybookPrefix}/${Saving.displayName}`,
  component: Saving,
  parameters: {
    styles,
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    successful: {
      defaultValue: true,
      control: {
        type: 'boolean',
      },
    },
  },
};

const defaultProps = {
  className: 'saving-story',
  defaultText: 'Save',
  failText: 'Failed to save',
  inProgressText: 'Saving...',
  successText: 'Saved',
};

const AutoTemplate = (opts) => {
  const { successful, ...args } = opts;
  const [status, setStatus] = useState('default');
  const [text, setText] = useState('');
  const [dirtyInput, setDirtyInput] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (dirtyInput) {
        setStatus('inprogress');
        await wait(1000);
        setStatus(successful ? 'success' : 'fail');
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [text, successful, dirtyInput]);

  const onChangeHandler = async (evt) => {
    const { value } = evt.target;
    if (!dirtyInput) setDirtyInput(true);
    setText(value);
  };

  return (
    <div className="saving-story-container">
      <TextArea
        onChange={onChangeHandler}
        value={text}
        labelText="Enter in the thing you wanted saved"
        className="saving-story-textarea"
      />
      {dirtyInput && status !== 'default' && (
        <Saving {...args} status={status} />
      )}
    </div>
  );
};

const ManualTemplate = (opts) => {
  const { successful, ...args } = opts;
  const [status, setStatus] = useState('default');

  const onSaveHandler = async () => {
    setStatus('inprogress');
    await wait(2000);
    setStatus(successful ? 'success' : 'fail');
  };

  return (
    <div className="saving-story-container">
      <Saving {...args} onSave={onSaveHandler} status={status} />
    </div>
  );
};

export const Auto = AutoTemplate.bind({});
Auto.args = {
  ...defaultProps,
  type: 'auto',
};

export const Manual = ManualTemplate.bind({});
Manual.args = {
  ...defaultProps,
  type: 'manual',
  failText: 'Failed to save. Try again?',
  cancelButtonText: 'Cancel',
};
