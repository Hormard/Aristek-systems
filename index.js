let heroes = [
  { id: 1, universe: "marvel", name: "Spider Man" },
  { id: 2, universe: "marvel", name: "Iron Man" },
  { id: 3, universe: "dc", name: "Aqua Man" },
  { id: 4, universe: "dc", name: "Bat Man" },
  { id: 5, universe: "marvel", name: "Hulk" },
];

const groupBy = (arr, key) => {
  if (arr === undefined || key === undefined) {
    throw new Error("array or key not entered");
  }
  if (Object.keys(arr[0]).some((el) => el === key)) {
    let result = {};

    let keys = arr.reduce((acc, item) => {
      return acc.includes(item[key]) ? acc : [...acc, item[key]];
    }, []);

    keys.forEach((el) => (result[el] = []));

    arr.forEach((el) => {
      for (const newKey in result) {
        el[key].toString() === newKey ? result[newKey].push(el) : null;
      }
    });

    return result;
  } else {
    return {};
  }
};

groupBy(heroes, "id");
groupBy(heroes, "name");
