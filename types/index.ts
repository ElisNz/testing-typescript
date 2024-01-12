type simpleTestType = string | number | boolean | null | undefined;

export type testCase = {
  a: simpleTestType,
  b?: simpleTestType,
  expected: simpleTestType
};

export type user = {
  name: string,
  group: number,
};

export type group = {
  id: number,
  groupName: string,
};