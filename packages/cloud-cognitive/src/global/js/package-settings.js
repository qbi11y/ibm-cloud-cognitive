//
// Copyright IBM Corp. 2020, 2021
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

const defaults = {
  prefix: 'exp',

  // by default only released components are set to true
  component: {
    // reviewed and released components:
    AboutModal: true,
    Tearsheet: true,

    // other public components not yet reviewed and released:
    ActionBarItem: false,
    APIKeyDownloader: false,
    APIKeyModal: false,
    ContextHeader: false,
    EmptyState: false,
    ErrorEmptyState: false,
    ExampleComponent: false,
    ExportModal: false,
    ExpressiveCard: false,
    HTTPError403: false,
    HTTPError404: false,
    HTTPErrorOther: false,
    ImportModal: false,
    ModifiedTabs: false,
    NoDataEmptyState: false,
    NoTagsEmptyState: false,
    NotFoundEmptyState: false,
    NotificationsPanel: false,
    NotificationsEmptyState: false,
    PageActionItem: false,
    PageHeader: false,
    ProductiveCard: false,
    RemoveDeleteModal: false,
    Saving: false,
    SidePanel: false,
    StatusIcon: false,
    TagSet: false,
    TearsheetNarrow: false,
    UnauthorizedEmptyState: false,
    UserProfileImage: false,
    WebTerminal: false,
    /* new component flags here - comment used by generate CLI */
  },

  // feature level flags
  feature: {
    'a-new-feature': false,
  },
};

const warningMessageComponent = (property) =>
  `IBM Cloud Cognitive (WARNING): Component "${property}" enabled via feature flags. This component has not yet completed its review process.`;
const warningMessageFeature = (property) =>
  `IBM Cloud Cognitive (WARNING): Feature "${property}" enabled via feature flags.`;
const warningMessageAllComponents =
  'IBM Cloud Cognitive (WARNING): All components enabled through use of setAllComponents. This includes components that have not yet completed their review process.';
const warningMessageAllFeatures =
  'IBM Cloud Cognitive (WARNING): All features enabled through use of setAllFeatures';

// Values to represent overrides for component or feature settings.
// Each value maps the initial value to the value that should be returned.
const all = { INITIAL: (v) => v, ON: () => true, OFF: () => false };

let allComponents = all.INITIAL;
let allFeatures = all.INITIAL;
let silent = false;

const component = new Proxy(
  { ...defaults.component },
  {
    set(target, property, value) {
      value && !silent && console.warn(warningMessageComponent(property));
      target[property] = value;
      return true; // value set
    },
    get(target, property) {
      return allComponents(target[property] ?? false);
    },
  }
);

const feature = new Proxy(
  { ...defaults.feature },
  {
    set(target, property, value) {
      value && !silent && console.warn(warningMessageFeature(property));
      target[property] = value;
      return true; // value set
    },

    get(target, property) {
      return allFeatures(target[property] ?? false);
    },
  }
);

export default {
  prefix: defaults.prefix,
  component: component,
  feature: feature,

  isComponentEnabled: (componentOrName, byDefault = false) => {
    const componentName =
      componentOrName?.displayName || componentOrName?.name || componentOrName;
    return byDefault
      ? defaults.component[componentName]
      : component[componentName];
  },

  isComponentPublic: (componentOrName, byDefault = false) => {
    const componentName =
      componentOrName?.displayName || componentOrName?.name || componentOrName;
    return Object.prototype.hasOwnProperty.call(
      byDefault ? defaults.component : component,
      componentName
    );
  },

  isFeatureEnabled: (featureName, byDefault = false) => {
    return byDefault ? defaults.feature[featureName] : feature[featureName];
  },

  isFeaturePublic: (featureName, byDefault = false) => {
    return Object.prototype.hasOwnProperty.call(
      byDefault ? defaults.feature : feature,
      featureName
    );
  },

  setAllComponents: (enabled) => {
    enabled === true && !silent && console.warn(warningMessageAllComponents);
    allComponents =
      enabled === true ? all.ON : enabled === false ? all.OFF : all.INITIAL;
  },

  setAllFeatures: (enabled) => {
    enabled === true && !silent && console.warn(warningMessageAllFeatures);
    allFeatures =
      enabled === true ? all.ON : enabled === false ? all.OFF : all.INITIAL;
  },

  _silenceWarnings: (value) => {
    // This will suppress console warnings when components or feature flags
    // are enabled, and should only be used when this is not an issue, such
    // as in internal test suites and storybook builds.
    silent = value;
  },
};
