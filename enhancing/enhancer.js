module.exports = {
  success,
  fail,
  repair,
  get,
};

function success(item) {
  if (item.enhancement == 20) {
    return { ...item};
  } 
  return {...item, enhancement: item.enhancement + 1}
}

function fail(item) {
  if (item.enhancement < 15) {
    return {...item,
      durability: ((item.durability - 5 > 0) ? item.durability - 5 : 0)
    }
  } else if (item.enhancement == 15 || item.enhancement == 16) {
    return {...item,
      durability: ((item.durability - 10 > 0) ? item.durability - 10 : 0)
    }
  } else if (item.enhancement > 16) {
    return { ...item, 
      durability: ((item.durability - 10 > 0) ? item.durability - 10 : 0),
      enhancement: ((item.enhancement - 1 > 0) ? item.enhancement - 1 : 0)
    };
  }
}

function repair(item) {
  return { ...item, durability: 100 };
}

function get(item) {
  return { ...item };
}
