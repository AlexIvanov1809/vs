// хранить там же, где и используется, это не функция общего назначения
export default function removedPriceIds(newPrice, price) {
  const arr = [...newPrice, ...price];
  const obj = arr.reduce((acc, item) => {
    if (acc[item.id]) {
      acc[item.id] += 1;
      return acc;
    } else {
      acc[item.id] = 1;
      return acc;
    }
  }, {});
  const result = Object.keys(obj).filter(
    // 1680004496709 - что это за число?
    (key) => obj[key] === 1 && parseInt(key) < 1680004496709,
  );
  return result;
}
