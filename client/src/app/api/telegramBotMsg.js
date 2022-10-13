function sendMsg(data) {
  const TOKEN = process.env.REACT_APP_TOKEN;
  const CHAT_ID = process.env.REACT_APP_CHAT_ID;
  let message = `${data.name}\n${data.phone}\n${data.address}`;
  data.items.forEach((i) => {
    if (i.beans) {
      message =
        message +
        `\n${i.name} ${i.weight} ${i.beans} ${i.quantity}шт. ${i.price} руб.`;
    } else {
      message =
        message + `\n${i.name} ${i.weight} ${i.quantity} ${i.price} руб.`;
    }
  });
  message = message + `\nИтого: ${data.total} руб.`;

  const url = "https://api.telegram.org/bot" + TOKEN + "/sendMessage";
  const body = JSON.stringify({
    chat_id: CHAT_ID,
    parse_mode: "Markdown",
    text: message
  });
  const xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
  xhr.send(body);
}

export default sendMsg;
