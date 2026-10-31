import {
  REWARD_DURATION_MS,
  formatRewardRemaining,
  isExpiryNoticeDue,
  parseExpiredRewardEnd,
  parseStoredRewardEnd,
  toRewardEnd,
} from '../rewardTime';

const NOW = 1_800_000_000_000;

describe('formatRewardRemaining', () => {
  it.each([
    [REWARD_DURATION_MS, '60:00'],
    [61_000, '1:01'],
    [9_000, '0:09'],
    [1, '0:01'],
    [0, '0:00'],
    [-5_000, '0:00'],
  ])('shouldFormat %i ms', (remainingMs, expected) => {
    expect(formatRewardRemaining(remainingMs)).toBe(expected);
  });
});

describe('rewardTime', () => {
  it('shouldEndRewardSixtyMinutesFromNow', () => {
    expect(toRewardEnd(NOW)).toBe(NOW + 60 * 60 * 1000);
  });

  it.each([null, '', 'abc', 'NaN', 'Infinity'])('shouldIgnoreInvalidStoredEnd %p', raw => {
    expect(parseStoredRewardEnd(raw, NOW)).toBeNull();
  });

  it('shouldIgnoreEndInThePast', () => {
    expect(parseStoredRewardEnd(String(NOW - 1), NOW)).toBeNull();
  });

  it('shouldIgnoreEndTooFarInTheFuture', () => {
    expect(parseStoredRewardEnd(String(NOW + REWARD_DURATION_MS + 1), NOW)).toBeNull();
  });

  it('shouldAcceptEndWithinWindow', () => {
    expect(parseStoredRewardEnd(String(NOW + 1000), NOW)).toBe(NOW + 1000);
  });

  it('shouldNotShowExpiryNoticeToProUser', () => {
    expect(isExpiryNoticeDue({ isPro: true, rewardEnd: NOW - 1, nowMs: NOW })).toBe(false);
  });

  it('shouldShowExpiryNoticeWhenRewardEnded', () => {
    expect(isExpiryNoticeDue({ isPro: false, rewardEnd: NOW, nowMs: NOW })).toBe(true);
  });

  it('shouldNotShowExpiryNoticeWhileRewardRuns', () => {
    expect(isExpiryNoticeDue({ isPro: false, rewardEnd: NOW + 1, nowMs: NOW })).toBe(false);
  });

  it('shouldNotShowExpiryNoticeWithoutReward', () => {
    expect(isExpiryNoticeDue({ isPro: false, rewardEnd: null, nowMs: NOW })).toBe(false);
  });
});

describe('parseExpiredRewardEnd', () => {
  it.each([null, '', 'abc', 'NaN', 'Infinity'])('shouldIgnoreInvalidExpiredEnd %p', raw => {
    expect(parseExpiredRewardEnd(raw, NOW)).toBeNull();
  });

  it('shouldAcceptEndInThePast', () => {
    expect(parseExpiredRewardEnd(String(NOW - 5000), NOW)).toBe(NOW - 5000);
  });

  it('shouldAcceptEndExactlyNow', () => {
    expect(parseExpiredRewardEnd(String(NOW), NOW)).toBe(NOW);
  });

  it('shouldIgnoreEndInTheFuture', () => {
    expect(parseExpiredRewardEnd(String(NOW + 1), NOW)).toBeNull();
  });
});
