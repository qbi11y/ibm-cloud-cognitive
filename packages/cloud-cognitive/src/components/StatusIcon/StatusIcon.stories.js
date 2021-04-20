//
// Copyright IBM Corp. 2021, 2021
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import React from 'react';

import { StatusIcon } from '.';
import { pkg } from '../../settings';
import mdx from './StatusIcon.mdx';
import styles from './_storybook-styles.scss'; // import storybook which includes component and additional storybook styles
import { getStorybookPrefix } from '../../../config';
const storybookPrefix = getStorybookPrefix(pkg, 'StatusIcon');

export default {
  title: `${storybookPrefix}/StatusIcon`,
  component: StatusIcon,
  argTypes: {
    kind: {
      control: {
        type: 'select',
        options: [
          'fatal',
          'critical',
          'major-warning',
          'minor-warning',
          'undefined',
          'unknown',
          'normal',
          'info',
          'in-progress',
          'running',
          'pending',
        ],
      },
    },
    size: {
      control: {
        type: 'select',
        options: ['sm', 'md', 'lg', 'xlg'],
      },
    },
    theme: {
      control: {
        type: 'radio',
        options: ['light', 'dark'],
      },
    },
  },
  parameters: {
    styles,
    docs: {
      page: mdx,
    },
  },
};

const defaultProps = {
  kind: 'fatal',
  size: 'sm',
  theme: 'light',
  iconDescription: 'Fatal',
};

const Template = (args) => {
  return <StatusIcon {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
};
