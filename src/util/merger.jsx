export function filterByPrimitiveMerger(valuesToFilter) {
  return (values) => values.filter((value) => !valuesToFilter.includes(value));
}

export function uniqueByIdMerger(newItems) {
  return (array) => {
    return array.concat(
      newItems.filter((n) => {
        return !array.find((a) => a.id === n.id);
      })
    );
  };
}