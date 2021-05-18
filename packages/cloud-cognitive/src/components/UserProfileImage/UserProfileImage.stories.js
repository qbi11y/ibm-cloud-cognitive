//
// Copyright IBM Corp. 2021, 2021
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import React from 'react';
import '../../utils/enable-all'; // must come before component is imported (directly or indirectly)
import { UserProfileImage } from '.';
import { pkg } from '../../settings';
import { getStorybookPrefix } from '../../../config';
import mdx from './UserProfileImage.mdx';
import image from './headshot.png';
import styles from './_storybook.scss'; // import storybook which includes component and additional storybook styles

const storybookPrefix = getStorybookPrefix(pkg, 'UserProfileImage');
const defaultArgs = {
  backgroundColor: 'light-cyan',
  theme: 'light',
  size: 'xlg',
};

export default {
  title: `${storybookPrefix}/UserProfileImage`,
  component: UserProfileImage,
  argTypes: {
    backgroundColor: {
      control: {
        type: 'select',
        options: ['light-cyan', 'dark-cyan'],
      },
    },
    theme: {
      control: {
        type: 'select',
        options: ['light', 'dark'],
      },
    },
    kind: {
      control: {
        type: 'radio',
        options: ['user', 'group'],
      },
    },
    size: {
      control: {
        type: 'radio',
        options: ['xlg', 'lg', 'md'],
      },
    },
  },
  parameters: {
    styles,
    docs: { page: mdx },
  },
};

const Template = (args) => {
  return <UserProfileImage {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
  kind: 'user',
  tooltipText: 'Thomas Watson',
};

export const WithGroupIcon = Template.bind({});
WithGroupIcon.args = {
  ...defaultArgs,
  kind: 'group',
};

export const WithInitials = Template.bind({});
WithInitials.args = {
  ...defaultArgs,
  initials: 'thomas j. watson',
  tooltipText: 'Thomas Watson',
};

export const WithImage = Template.bind({});
WithImage.args = {
  ...defaultArgs,
  image,
  imageDescription: 'image here',
};

export const WithImageWithoutDescription = Template.bind({});
WithImageWithoutDescription.args = {
  ...defaultArgs,
  image,
};

export const WithImageAndTooltip = Template.bind({});
WithImageAndTooltip.args = {
  ...defaultArgs,
  image,
  imageDescription: 'image here',
  tooltipText: 'Display Name',
};
