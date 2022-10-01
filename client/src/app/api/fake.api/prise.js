const coffeeItems = [
  {
    id: 10001,
    roasted: "Tasty Coffee",
    image: { quarter: "quarter", kg: "kg" },
    country: "Brasil",
    sort: "Serrado",
    using: "Espresso",
    form: "Monosort",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem cumque adipisci ducimus voluptatem? Sed reiciendis labore quasi quas, incidunt nostrum nulla officia itaque deserunt natus ullam assumenda maxime debitis. Corporis.",
    grind: false,
    prise: { quarter: 450, kg: 1450 },
    weight: { quarter: true, kg: false }
  },
  {
    id: 10002,
    roasted: "Tasty Coffee",
    image: { quarter: "quarter", kg: "kg" },
    country: "Brasil",
    sort: "Mojiana",
    using: "Espresso",
    form: "Monosort",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem cumque adipisci ducimus voluptatem? Sed reiciendis labore quasi quas, incidunt nostrum nulla officia itaque deserunt natus ullam assumenda maxime debitis. Corporis.",
    grind: false,
    prise: { quarter: 450, kg: 1450 },
    weight: { quarter: true, kg: false }
  },
  {
    id: 10003,
    roasted: "Tasty Coffee",
    image: { quarter: "quarter", kg: "kg" },
    country: "Ethiopia",
    sort: "Giggesa",
    using: "Espresso",
    form: "Monosort",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem cumque adipisci ducimus voluptatem? Sed reiciendis labore quasi quas, incidunt nostrum nulla officia itaque deserunt natus ullam assumenda maxime debitis. Corporis.",
    grind: false,
    prise: { quarter: 650, kg: 1950 },
    weight: { quarter: true, kg: false }
  },
  {
    id: 10004,
    roasted: "Tasty Coffee",
    image: { quarter: "quarter", kg: "kg" },
    country: "",
    sort: "Natti",
    using: "Espresso",
    form: "Bland",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem cumque adipisci ducimus voluptatem? Sed reiciendis labore quasi quas, incidunt nostrum nulla officia itaque deserunt natus ullam assumenda maxime debitis. Corporis.",
    grind: false,
    prise: { quarter: 550, kg: 1550 },
    weight: { quarter: true, kg: false }
  },
  {
    id: 10005,
    roasted: "Tasty Coffee",
    image: { quarter: "quarter", kg: "kg" },
    country: "",
    sort: "Black Candy",
    using: "Espresso",
    form: "Bland",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem cumque adipisci ducimus voluptatem? Sed reiciendis labore quasi quas, incidunt nostrum nulla officia itaque deserunt natus ullam assumenda maxime debitis. Corporis.",
    grind: false,
    prise: { quarter: 600, kg: 1800 },
    weight: { quarter: true, kg: false }
  },
  {
    id: 10006,
    roasted: "Znak",
    image: { quarter: "quarter", kg: "kg" },
    country: "Handuras",
    sort: "San-Marcos",
    using: "Espresso",
    form: "Monosort",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem cumque adipisci ducimus voluptatem? Sed reiciendis labore quasi quas, incidunt nostrum nulla officia itaque deserunt natus ullam assumenda maxime debitis. Corporis.",
    grind: false,
    prise: { quarter: 650, kg: 1900 },
    weight: { quarter: true, kg: false }
  },
  {
    id: 10007,
    roasted: "Znak",
    image: { quarter: "quarter", kg: "kg" },
    country: "",
    sort: "Churchell",
    using: "Espresso",
    form: "Bland",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem cumque adipisci ducimus voluptatem? Sed reiciendis labore quasi quas, incidunt nostrum nulla officia itaque deserunt natus ullam assumenda maxime debitis. Corporis.",
    grind: false,
    prise: { quarter: 750, kg: 2100 },
    weight: { quarter: true, kg: false }
  },
  {
    id: 10008,
    roasted: "Znak",
    image: { quarter: "quarter", kg: "kg" },
    country: "",
    sort: "Merlin",
    using: "Espresso",
    form: "Bland",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem cumque adipisci ducimus voluptatem? Sed reiciendis labore quasi quas, incidunt nostrum nulla officia itaque deserunt natus ullam assumenda maxime debitis. Corporis.",
    grind: false,
    prise: { quarter: 600, kg: 1800 },
    weight: { quarter: true, kg: false }
  }
];

const fetchAll = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(coffeeItems);
    }, 1400);
  });

export default { fetchAll };
