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
      input: "1",
    },
    {
      label: "Адрес: ",
      input: "1",
    },
    {
      label: "на верхней стороне (кВ) ",
      input: "1",
    },
    {
      label: "на нижней стороне (кВ) ",
      input: "1",
    },
    {
      label: "Инв № ",
      input: "1",
    },
  ],
  users: {
    val: 1,
    check: true,
    type: "checkbox",
    text: "",
    checkbox: [],
    // checkbox: [{ check: true, text: "Иванов ИИ" }],
  },
}
