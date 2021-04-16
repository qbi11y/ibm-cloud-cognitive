//
// Copyright IBM Corp. 2020, 2020
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import React from 'react';
import { IdeTableToolbarSearch } from '../IdeTableToolbarSearch';
import { shallow } from 'enzyme';

describe('IdeTableToolbarSearch', () => {
  describe('Renders as expected by default', () => {
    const wrapper = shallow(
      // eslint-disable-next-line jsx-a11y/tabindex-no-positive
      <IdeTableToolbarSearch />
    );

    it('Renders as a <div>', () => {
      expect(wrapper.dive().dive().is('div')).toBe(true);
    });

    it('Should have the correct classes', () => {
      expect(wrapper.dive().hasClass('ide-table-toolbar-search')).toBe(true);
      expect(
        wrapper.dive().hasClass('bx--toolbar-search-container-expandable')
      ).toBe(true);
    });
  });

  describe('Renders as expected with custom class', () => {
    const wrapper = shallow(
      // eslint-disable-next-line jsx-a11y/tabindex-no-positive
      <IdeTableToolbarSearch className="extra-class" />
    );

    it('Should have the correct classes', () => {
      expect(wrapper.dive().hasClass('ide-table-toolbar-search')).toBe(true);
      expect(
        wrapper.dive().hasClass('bx--toolbar-search-container-expandable')
      ).toBe(true);
    });

    it('Should add extra classes via className', () => {
      expect(wrapper.dive().hasClass('extra-class')).toBe(true);
    });
  });
});
