interface Level {
  id: number;
  correctChar: string;
  wrongChar: string;
  rows: number;
  cols: number;
  wrongCount: number;
}

export const LEVELS: Level[] = [
  {
    id: 1,
    correctChar: "人",
    wrongChar: "入",
    rows: 4,
    cols: 4,
    wrongCount: 1,
  },
  {
    id: 2,
    correctChar: "大",
    wrongChar: "太",
    rows: 4,
    cols: 4,
    wrongCount: 1,
  },
  {
    id: 3,
    correctChar: "天",
    wrongChar: "夫",
    rows: 5,
    cols: 5,
    wrongCount: 1,
  },
  {
    id: 4,
    correctChar: "土",
    wrongChar: "士",
    rows: 5,
    cols: 5,
    wrongCount: 2,
  },
  {
    id: 5,
    correctChar: "己",
    wrongChar: "已",
    rows: 5,
    cols: 5,
    wrongCount: 2,
  },
  {
    id: 6,
    correctChar: "刀",
    wrongChar: "力",
    rows: 6,
    cols: 6,
    wrongCount: 2,
  },
  {
    id: 7,
    correctChar: "末",
    wrongChar: "未",
    rows: 6,
    cols: 6,
    wrongCount: 2,
  },
  {
    id: 8,
    correctChar: "曰",
    wrongChar: "日",
    rows: 6,
    cols: 6,
    wrongCount: 3,
  },
  {
    id: 9,
    correctChar: "戌",
    wrongChar: "戍",
    rows: 7,
    cols: 7,
    wrongCount: 3,
  },
  {
    id: 10,
    correctChar: "腾",
    wrongChar: "滕",
    rows: 7,
    cols: 7,
    wrongCount: 3,
  },
];
