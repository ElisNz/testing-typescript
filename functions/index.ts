import { user, group } from "../types";

export const validateEmail = (email: string) : boolean => {
  return email.includes("@") && email.includes(".");
};

export const validateZip = (zip: string) : boolean => {
  return zip.length === 5 && !isNaN(Number(zip));
};

export const makeHeading = (title: string, element: number) : string => {
  if (element > 6 || element < 1) {
    throw new Error("Heading level must be between 1 and 6");
  }
  return `<h${element}>${title}</h${element}>`;
};

export const roundPrice = (amount: number, currency?: string) : string => {
  const usedCurrency = currency ? currency.replace(/%PRICE%/i, '').replace(' ', '') : "SEK";
  let roundedUpNumber = `${Math.round(amount * 100) / 100}`;

  if(roundedUpNumber.includes(".")) {
    roundedUpNumber.indexOf(".") < roundedUpNumber.length - 2 ? roundedUpNumber : roundedUpNumber += `0`;
  }
  if(roundedUpNumber.length === 2) {
    roundedUpNumber += ".00";
  }
  if (!currency) { return `${roundedUpNumber} ${usedCurrency}` }

  return currency.includes('%PRICE%') ? currency.replace('%PRICE%', roundedUpNumber) : `${roundedUpNumber} ${usedCurrency}`;
};

export const isLowerCase = (input: string) : boolean => {
  return input === input.toLowerCase();
};

export const getGenitive = (input: string) : string => {
  return input[input.length - 1] === 's' ? input : `${input}s`;
};

export const getUsers = async() : Promise<user[]> => {
  try {
    return Promise.resolve([
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
    ]);
  } catch (error) {
    throw new Error("Could not fetch users");
  }
};

export const getGroups = async() : Promise<group[]> => {
  try {
    return Promise.resolve([
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
    ]);
  } catch (error) {
    throw new Error("Could not fetch groups");
  }
};