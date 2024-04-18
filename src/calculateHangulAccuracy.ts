import { disassembleHangulToGroups } from './disassemble';

/**
 * 한글 문자열 정확도 계산
 * @param targetText
 * @param inputText
 * @returns 0 ~ 1 실수값
 */
export function calculateHangulAccuracy(targetText: string, inputText: string): number {
  if (targetText === inputText) {
    return 1;
  }

  if (targetText.length < inputText.length) {
    return 0;
  }

  const disassembledInputTextGroup = disassembleHangulToGroups(inputText);
  const disassembledTargetTextGroup = disassembleHangulToGroups(targetText);

  const disassembledInputText = disassembledInputTextGroup.flat();
  const disassembledTargetText = disassembledTargetTextGroup.flat();

  const weight = 3;

  const groupDiff = disassembledTargetTextGroup.reduce((groupAcc, targetCharGroup, groupIndex) => {
    const inputCharGroup = disassembledInputTextGroup[groupIndex] || [];

    const charGroupDiff = targetCharGroup.reduce((acc, targetChar, index) => {
      return targetChar !== inputCharGroup[index] ? acc + 1 : acc;
    }, 0);
    return groupAcc + charGroupDiff;
  }, 0);

  const disassembledDiff = disassembledTargetText.reduce((acc, targetChar, index) => {
    return targetChar !== disassembledInputText[index] ? acc + 1 : acc;
  }, 0);

  const groupScore = groupDiff / disassembledTargetTextGroup.length;
  const disassembledScore = disassembledDiff / disassembledTargetText.length;

  const accuracyScore = 1 - (groupScore + disassembledScore * weight) / (1 + weight);

  return accuracyScore;
}
