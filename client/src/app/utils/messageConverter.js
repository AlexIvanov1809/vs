function messageConverter(data) {
  let message = `${data.name}\n${data.phone}\n${data.address}\n${
    data.comments ? `\n${data.comments}\n` : ""
  }`;

  data.items.forEach((i, v) => {
    if (i.beans) {
      message += `\n${v + 1}.  ${i.brand} ${i.name} ${i.weight} ${i.beans} ${
        i.quantity
      } шт. ${i.price} руб.`;
    } else {
      message += `\n${v + 1}.  ${i.brand} ${i.name} ${i.weight} ${i.quantity} ${
        i.price
      } руб.`;
    }
  });

  message += `\n\nИтого: ${data.total} руб.`;

  return message;
}

export default messageConverter;
