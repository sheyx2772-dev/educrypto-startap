import type { PathQuizQ } from "./pathContent";

/** To'g'ri javobni A/B/C/D ning turli o'rinlariga qo'yish */
export function placeCorrectAt(q: PathQuizQ, targetIndex: number): PathQuizQ {
  const safeTarget = ((targetIndex % 4) + 4) % 4;
  const correct = q.options[q.correctIndex];
  const wrong = q.options.filter((_, i) => i !== q.correctIndex);
  const next: string[] = [];
  let wi = 0;
  for (let i = 0; i < 4; i++) {
    if (i === safeTarget) next.push(correct);
    else next.push(wrong[wi++]);
  }
  return { ...q, options: next, correctIndex: safeTarget };
}

export function shuffleQuizTriple(
  quiz: [PathQuizQ, PathQuizQ, PathQuizQ],
  stepNum: number
): [PathQuizQ, PathQuizQ, PathQuizQ] {
  const slots = [
    (stepNum * 3) % 4,
    (stepNum * 3 + 1) % 4,
    (stepNum * 3 + 2) % 4,
  ];
  return [
    placeCorrectAt(quiz[0], slots[0]),
    placeCorrectAt(quiz[1], slots[1]),
    placeCorrectAt(quiz[2], slots[2]),
  ];
}
