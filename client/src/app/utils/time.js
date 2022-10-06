export default function timeCanger(date) {
  const data = date.replace(/T/g, ".").split(".");
  const arrowTime = data[1].split(":");
  const hour = arrowTime.shift();
  arrowTime.unshift(+hour + 3);
  data[1] = arrowTime.join(":");
  return data;
}
