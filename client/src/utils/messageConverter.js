// из названия функции и параметра непонятно что во что конвертируется
// она используется только в одном месте, лучше туда рядом и положить
export default function messageConverter(data) {
  let message = `${data.name}\n${data.phone}\n${data.address}\n${
    data.comments ? `\n${data.comments}\n` : ""
  }`;

  data.items.forEach((i, v) => {
    message += `\n${v + 1}.  ${i.brand} ${i.name} ${i.weight}. ${
      i.beans ? `${i.beans} ` : ""
    }${i.quantity} шт. ${i.value} руб.`;
  });

  message += `\n\nИтого: ${data.total} руб.`;

  return message;
}
