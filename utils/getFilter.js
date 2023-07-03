// filter for virus
const filter = (array, id) => {
  console.log("id====", id);
  const filter = array.filter((product) => product.pdbid === id);
  return filter;
};

module.exports = { filter };
