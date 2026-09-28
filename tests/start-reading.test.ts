import assert from "node:assert/strict";
import { test } from "node:test";
import { useExperienceStore } from "../lib/store";
import { TASTE_ROUNDS } from "../lib/content";

test("starting again after a completed reading clears dependent progress and preserves birth input", () => {
  const birthInfo = { year: 1995, month: 3, day: 24, hour: -1 };
  useExperienceStore.setState({ step: "options", birthInfo, gender: "f", tasteAnswers: ["old"], tasteRoundIndex: TASTE_ROUNDS.length, resultRevealed: true });
  useExperienceStore.getState().startReading();
  const state = useExperienceStore.getState();
  assert.equal(state.step, "info");
  assert.equal(state.tasteRoundIndex, 0);
  assert.ok(TASTE_ROUNDS[state.tasteRoundIndex].question);
  assert.deepEqual(state.tasteAnswers, []);
  assert.equal(state.resultRevealed, false);
  assert.equal(state.product.popupSeen, false);
  assert.equal(state.product.space, null);
  assert.deepEqual(state.birthInfo, birthInfo);
  assert.equal(state.gender, "f");
});
