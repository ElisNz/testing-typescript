import { describe, expect, test } from '@jest/globals';
import { validateEmail, validateZip, makeHeading, roundPrice, isLowerCase, getGenitive, getUsers, getGroups } from "../functions";
import { testCase } from '../types';

const mailTestCases: testCase[] = [
  {a: "jonatan@gmail.com", expected: true}, 
  {a: "jonatan@gmail", expected: false}, 
  {a: "jonatan.com", expected: false}
];

const zipTestCases: testCase[] = [
  {a: "12345", expected: true},
  {a: "1234", expected: false},
  {a: "123456", expected: false},
  {a: "abcde", expected: false},
];

const headingTestCases: testCase[] = [
  {a: "Hello", b: "1", expected: "<h1>Hello</h1>"},
  {a: "Next level", b: "2", expected: "<h2>Next level</h2>"},
  {a: "Next level", b: "3", expected: "<h3>Next level</h3>"},
];

const numbersTestCases: testCase[] = [
  {a: 232.10542, expected: "232.11 SEK"},
  {a: 14, expected: "14.00 SEK"},
  {a: 1024.2048, expected: "1024.20 SEK"},
  {a: 25.743, b: "NOK", expected: "25.74 NOK"},
  {a: 500.50, b: "EUR", expected: "500.50 EUR"},
  {a: 25.7456, b: "USD", expected: "25.75 USD"},
  {a: 232.10542, b: "%PRICE% kr", expected: "232.11 kr"},
  {a: 14, b: "%PRICE% kr", expected: "14.00 kr"},
  {a: 1024.2048, b: "USD %PRICE%", expected: "USD 1024.20"},
];

const onlyLowerCaseTestCases: testCase[] = [
  {a: "jonatan", expected: true},
  {a: "JONATAN", expected: false},
  {a: "Jonatan", expected: false},
  {a: "jOnAtAn", expected: false},
];

const genitiveTestCases: testCase[] = [
  {a: "Jonatan", expected: "Jonatans"},
  {a: "Elis", expected: "Elis"},
  {a: "Anna", expected: "Annas"},
];


describe("validate email", () => {
    test.each(mailTestCases)(
      "validateEmail(%s) should return %s",
      ({a, expected} : testCase) => {
        expect(validateEmail(a as string)).toBe(expected);
      }
    )
});

describe("validate zip", () => {
  test.each(zipTestCases)(
    "validateZip(%s) should return %s",
    ({a, expected} : testCase) => {
      expect(validateZip(a as string)).toBe(expected);
    }
  )
});

describe("make heading", () => {
  test.each(headingTestCases)(
    "makeHeading(%s, %s) should return %s",
    ({a, b, expected} : testCase) => {
      expect(makeHeading(a as string, Number(b))).toBe(expected);
    }
  )
});

describe("round up number and add '<currency>' based on pattern", () => {
  test.each(numbersTestCases)(
    "formatNumber(%s) should return %s",
    ({a, b, expected} : testCase) => {
      expect(roundPrice(a as number, b as string)).toBe(expected);
    }
  );
});

describe("check if string only contains lower case letters", () => {
  test.each(onlyLowerCaseTestCases)(
    "onlyLowerCase(%s) should return %s",
    ({a, expected} : testCase) => {
      expect(isLowerCase(a as string)).toBe(expected);
    }
  );
});

describe("return genitive form of a name", () => {
  test.each(genitiveTestCases)(
    "genitive(%s) should return %s",
    ({a, expected} : testCase) => {
      expect(getGenitive(a as string)).toBe(expected);
    }
  );
});

describe("GetUsers should return an array of users", () => {
  const expectedUsers = [
    {
    name: "Erik",
    group: 1
    },
    {
    name: "Lisa",
    group: 2
    },
    {
    name: "Hampus",
    group: 2
    },
    {
    name: "Linda",
    group: 3
    },
    {
    name: "Eva",
    group: 1
    },
    {
    name: "Anna",
    group: 3
    }
   ];

  it("returns correctly", async() => {
      const users = await getUsers();
      expect(users).toBeInstanceOf(Array);
      expect(users.length).toBeGreaterThan(0);
      expect(users).toEqual(expect.arrayContaining(expectedUsers));
  });
  it("has correct properties", async() => {
      const users = await getUsers();
      expect.arrayContaining(users);
      users.forEach((user) => {
        expect(user).toHaveProperty("name");
        expect(user).toHaveProperty("group");
    });
  }); 
});

describe("GetGroups should return an array of users", () => {
  const expectedGroups = [
    {
    id: 1,
    groupName: "Hajarna"
    },
    {
    id: 2,
    groupName: "Valarna"
    },
    {
    id: 3,
    groupName: "Zebrorna"
    }
   ];

  it("returns correctly", async() => {
      const groups = await getGroups();
      expect(groups).toBeInstanceOf(Array);
      expect(groups.length).toBeGreaterThan(0);
      expect(groups).toEqual(expect.arrayContaining(expectedGroups));
  });
  it("has correct properties", async() => {
      const groups = await getGroups();
      expect.arrayContaining(groups);
      groups.forEach((group) => {
        expect(group).toHaveProperty("id");
        expect(group).toHaveProperty("groupName");
    });
  }); 
});