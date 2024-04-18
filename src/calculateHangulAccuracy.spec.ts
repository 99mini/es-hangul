import { describe, expect, it } from 'vitest';
import { calculateHangulAccuracy } from './calculateHangulAccuracy';

describe('calculateHangulAccuracy', () => {
  it('타겟 문자열과 인풋 문자열이 완전히 일치한다.', () => {
    expect(calculateHangulAccuracy('프론트엔드', '프론트엔드')).toBe(1);
  });

  it('타겟 문자열보다 인풋 문자열이 길다.', () => {
    expect(calculateHangulAccuracy('프론트엔드', '프론트엔드엔지니어')).toBe(0);
  });

  it('오탈자가 적을 수록 1에 가까운 값을 반환한다.', () => {
    const targetText = '초성';
    const twoWrongText = '주성';
    const oneWrongText = '추성';

    expect(calculateHangulAccuracy(targetText, twoWrongText) < calculateHangulAccuracy(targetText, oneWrongText)).toBe(
      true
    );
  });

  it('초성이 비어있고 앞 글자의 받침이 된 경우', () => {
    expect(calculateHangulAccuracy('초성', '촛ㅓ') > calculateHangulAccuracy('초성', '초서')).toBe(false);
    expect(calculateHangulAccuracy('초성', '촛ㅓ') > calculateHangulAccuracy('초성', '초저')).toBe(true);
    expect(calculateHangulAccuracy('초성', '촛ㅓ') > calculateHangulAccuracy('초성', '초ㅅ')).toBe(true);
  });
});
