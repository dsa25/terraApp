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
    },
    {
      label: "Адрес: ",
      input: "",
    },
    {
      label: "на верхней стороне (кВ) ",
      input: "",
    },
    {
      label: "на нижней стороне (кВ) ",
      input: "",
    },
    {
      label: "Инв № ",
      input: "",
    },
  ],
  users: {
    val: 1,
    check: true,
    type: "checkbox",
    text: "",
    checkbox: [
      { check: false, text: "Иванов ИИ" },
      { check: false, text: "Петров ПП" },
      { check: false, text: "Сидоров СС" },
    ],
  },
}