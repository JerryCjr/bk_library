import babyfsPage from './babyfsPage.js';
import babyfsComponent from './babyfsComponent.js';

const originalPage = Page;
// eslint-disable-next-line no-global-assign
Page = function (o) {
  babyfsPage(o, originalPage);
};

const originalComponent = Component;
// eslint-disable-next-line no-global-assign
Component = function (o) {
  babyfsComponent(o, originalComponent);
};
