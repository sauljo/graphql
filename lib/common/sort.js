const sortAscending = (arr, property = null) => {
  switch (Array.isArray(arr)) {
    case true:
      return property ?
        arr.sort((a, b) => a[property] - b[property]) :
        arr.sort((a, b) => a - b);
    default:
      return arr;
  }
}

module.exports = { sortAscending };