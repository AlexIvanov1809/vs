export default function getFromStorage(name) {
  let data = JSON.parse(localStorage.getItem(name));
  if (!data) {
    data = JSON.parse(sessionStorage.getItem(name));
  }
  return data;
}

// get вижу, а где set?)
