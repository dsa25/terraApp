export const delegationData = {
  date: "",
  headers: [
    "Бланк замеров уровня напряжения и характера нагрузок 0,4 кВ от ",
    "Лист осмотра № ____ от ",
  ],
  headers2: ["Замеры произведены в составе: ", "Осмотр проведен в составе: "],
  fields: [
    {
      label: "ТП (РП) № ",
      input: "",
      keyboardType: "numeric",
    },
    {
      label: "Адрес: ",
      input: "",
      keyboardType: "default",
    },
    {
      label: "на верхней стороне (кВ) ",
      input: "",
      keyboardType: "numeric",
    },
    {
      label: "на нижней стороне (кВ) ",
      input: "",
      keyboardType: "numeric",
    },
    {
      label: "Инв № ",
      input: "",
      keyboardType: "numeric",
      notrequired: true,
    },
  ],
  users: {
    text: "",
    master: {},
    other: [],
  },
}
