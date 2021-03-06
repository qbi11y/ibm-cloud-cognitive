//
// Copyright IBM Corp. 2020, 2020
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import React from 'react';
import PropTypes from 'prop-types';

import { pkg } from '../../settings';
const componentName = 'ContextHeader';

export let ContextHeader = ({ namespace, name, task }) => {
  return (
    <div className={`${pkg.prefix}-context-header`}>
      <span className={`${pkg.prefix}-context-header--task`}>{task}</span>
      <span className={`${pkg.prefix}-context-header--name`}>{name}</span>
      <span className={`${pkg.prefix}-context-header--separator`}>|</span>
      <span className={`${pkg.prefix}-context-header--namespace`}>
        {namespace}
      </span>
    </div>
  );
};

// Return a placeholder if not released and not enabled by feature flag
ContextHeader = pkg.checkComponentEnabled(ContextHeader, componentName);

ContextHeader.displayName = componentName;

ContextHeader.propTypes = {
  /**
   * The name of the current instance.
   */
  name: PropTypes.string.isRequired,
  /**
   * The namespace in which the current instance is deployed.
   */
  namespace: PropTypes.string.isRequired,
  /**
   * The high level task the user is using the embedding UI to carry out.
   */
  task: PropTypes.string.isRequired,
};

export default ContextHeader;
