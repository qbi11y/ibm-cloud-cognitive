/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Import portions of React that are needed.
import React from 'react';

// Other standard imports.
import PropTypes from 'prop-types';
import cx from 'classnames';

// load the package settings direct, because Canary is used by settings.js
import pkg from '../../global/js/package-settings';

// Carbon and package components we use.
import { CodeSnippet } from 'carbon-components-react';

// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = `${pkg.prefix}-canary`;

/**
 *  Canary component used when the component requested is not yet production
 */
export const Canary = (
  { className, componentName, ...rest } /*, originalArgs*/
) => {
  const instructions = `
import { pkg } from '@carbon/ibm-cloud-cognitive/es/settings';
// NOTE: must happen before component import
pkg.component.${componentName} = true;
`;
  return (
    <div {...rest} className={cx(blockClass, className)}>
      <h2>
        This component <strong>{componentName}</strong> is not ready yet.
      </h2>
      <p>
        To enable this initialize package flags before any components are
        loaded, passing an override object.
      </p>
      <br />
      <p>e.g. in main.js</p>
      <CodeSnippet type="multi">{instructions}</CodeSnippet>
      <br />
      <p>
        View a live example on{' '}
        <a href="https://codesandbox.io/s/example-component-olif5?file=/src/config.js">
          codesandbox
        </a>
        .
      </p>
    </div>
  );
};

Canary.propTypes = {
  /** Provide an optional class to be applied to the containing node */
  className: PropTypes.string,

  /** Name of the component that is not ready yet */
  componentName: PropTypes.string.isRequired,
};
