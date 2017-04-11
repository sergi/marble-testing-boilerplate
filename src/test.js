import { TestScheduler } from "rxjs/testing/TestScheduler";
import * as marbleHelpers from "./marble-testing";
import assert from 'assert';

global.rxTestScheduler = null;
global.cold = marbleHelpers.cold;
global.hot = marbleHelpers.hot;
global.expectObservable = marbleHelpers.expectObservable;
global.expectSubscriptions = marbleHelpers.expectSubscriptions;

const assertDeepEqualFrame = (actual, expected) => {
  assert.deepEqual(actual, expected);
};

const oit = global.it;
global.it = function(description, cb, timeout) {
  if (cb.length === 0) {
    oit(description, () => {
      global.rxTestScheduler = new TestScheduler(assertDeepEqualFrame);
      cb();
      global.rxTestScheduler.flush();
    });
  } else {
    // async test
    oit.apply(this, arguments);
  }
};

describe("#indexOf()", function() {
  it("should filter with an always-true predicate", () => {
     const source = hot("--a--b--|");
     const expected = "--a--b--|";

    expectObservable(source).toBe(expected);
  });
});
