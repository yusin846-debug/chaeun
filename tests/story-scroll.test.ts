import assert from "node:assert/strict";
import { test } from "node:test";
import { getStoryIndex } from "../components/home/story-scroll";

test("six stories follow the entire scroll range in both directions", () => {
  assert.equal(getStoryIndex(-100, 1200, 6), 0);
  assert.deepEqual([0, 200, 400, 600, 800, 1000, 1200].map((n) => getStoryIndex(n, 1200, 6)), [0, 1, 2, 3, 4, 5, 5]);
  assert.deepEqual([1300, 900, 500, 100, -100].map((n) => getStoryIndex(n, 1200, 6)), [5, 4, 2, 0, 0]);
  assert.equal(getStoryIndex(100, 0, 6), 0);
});
