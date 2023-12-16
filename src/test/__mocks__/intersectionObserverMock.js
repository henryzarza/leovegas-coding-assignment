/* eslint-disable no-undef */
// eslint-disable-next-line func-names
const mock = function () {
  return {
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  };
};

window.IntersectionObserver = mock;
