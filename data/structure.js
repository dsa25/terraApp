const structure = [
  {
    id: 1,
    quest: "Вопрос 1",
    opt: [
      {
        val: 1,
        check: false,
        type: "text",
        text: "Замечания отсутствуют;",
      },
      {
        val: 2,
        check: false,
        type: "input",
        input: "",
      },
      {
        val: 3,
        check: false,
        type: "textInput",
        text: "% разрушения проводника защитного заземления : ",
        input: "",
      },
      {
        val: 4,
        check: false,
        type: "radio",
        text: "Мелкий/крупный мусор в близи здания (нужное подчеркнуть);",
        radio: { value: -1, list: ["Мелкий", "крупный"] },
      },
      {
        val: 5,
        check: false,
        type: "checkbox",
        text: "На опорных изоляторах по фазам А, В, С присутствуют трещины и сколы (нужные фазы подчеркнуть);",
        checkbox: [
          { check: false, text: "A" },
          { check: false, text: "B" },
          { check: false, text: "C" },
        ],
      },
      {
        val: 6,
        check: false,
        type: "radioInput",
        text: "Нагрев контактных соединений присутствует/отсутствует (нужное подчеркнуть) на  °C: ",
        input: "",
        radio: { value: -1, list: ["присутствует", "отсутствует"] },
      },
    ],
  },
  {
    id: 2,
    quest: "Вопрос 2 (тут только  поля для заполнения)",
    opt: [
      {
        val: 1,
        check: true,
        type: "listTextInput",
        text: "Заполните поля:",
        list: [
          { text: "Наименование: ", input: "" },
          { text: "Тип: ", input: "" },
          { text: "S/N: ", input: "" },
          { text: "Напряж.: первичное(кВ): ", input: "" },
          { text: "Напряж.: вторичное(кВ): ", input: "" },
          { text: "Мощность(кВА): ", input: "" },
          { text: "дата выпуска(г.): ", input: "" },
        ],
      },
    ],
  },
  {
    id: 3,
    quest: "Вопрос 3",
    opt: [
      { val: 1, check: false, type: "text", text: "Замечания отсутствуют;" },
      {
        val: 2,
        check: false,
        type: "text",
        text: "Ввод в здание выполнен НЕ в трубах или иных жестких обрамлениях;",
      },
      {
        val: 3,
        check: false,
        type: "input",
        input: "",
      },
    ],
  },
]
