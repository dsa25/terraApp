import { StyleSheet } from "react-native"

const mainColor = "#3498db"
const textColor = "#4e5f68"
const colorBlack = "#3B4856"
const colorGray = "#9FADBD"
const colorGold = "#E39D22"
const colorRed = "#E86971"
const colorGreen = "#00A88A"
const mainBg = "#fafcff"

export const css = StyleSheet.create({
  row: {
    width: "100%",
  },
  pages: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    // justifyContent: "space-between",
  },
  header: {
    width: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingTop: 17,
    borderBottomWidth: 1,
    borderColor: "#d8d8d8",
  },
  logo: {
    color: mainColor,
    fontSize: 20,
    paddingBottom: 3,
  },
  question_name: {
    fontSize: 15,
    fontWeight: "700",
    color: colorBlack,
    color: textColor,
  },
  main_head: {
    fontSize: 16,
    color: textColor,
    fontWeight: "700",
  },
  question_header: {
    color: colorGreen,
  },
  color_gold: {
    color: colorGold,
  },
  question_text: {
    fontSize: 15,
  },
  question_quest: {
    color: textColor,
  },
  wr_checkbox: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  checkbox_text: {
    fontSize: 15,
    // borderWidth: 1,
    paddingLeft: 10,
    paddingTop: 7,
    color: textColor,
    flex: 1,
  },
  input: {
    borderWidth: 1,
    fontSize: 16,
    borderRadius: 5,
    color: "#767171",
    borderColor: "#767171",
    padding: 5,
    marginLeft: 10,
    // width: "80%",
    flexGrow: 1,
    maxHeight: 100,
  },
  item: {
    width: "33.3%",
    padding: 10,
  },
  item_item: {
    borderWidth: 1,
  },
  wr_btns: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingVertical: 30,
    // position: "absolute",
    // bottom: 0,
    // borderWidth: 1,
    // marginTop: "auto",
    // width: "30%",
    // flexGrow: 2,
    // flex: 11,
    // marginLeft: "auto",
    // alignSelf: "center",
    // alignItems: "flex-end",
  },
  wr_textInput: {
    flexDirection: "row",
    // alignItems: "flex-start",
    // justifyContent: "flex-start",
    // borderWidth: 1,
    borderColor: "red",
    flex: 1,
  },
  ListTextInput: {},
  textInput: {
    borderBottomWidth: 1,
    width: "25%",
    // height: 20,
    padding: 5,
    marginTop: "auto",
    textAlign: "center",
  },

  textInputText: {
    width: "75%",
    marginBottom: 0,
    // borderWidth: 1,
  },
  wr_radio: {
    flexDirection: "row",
    alignItems: "center",
  },
  radio_label: {
    fontSize: 13,
    color: textColor,
  },

  touchBtn: {
    marginTop: 15,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: mainColor,
    padding: 15,
    borderRadius: 7,
  },
  btn_green: {
    backgroundColor: colorGreen,
    borderColor: colorGreen,
    justifyContent: "center",
    alignItems: "center",
  },
  btn_red: {
    backgroundColor: colorRed,
    borderColor: colorRed,
  },
  measurs_btnAdd: {
    width: 150,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 25,
    marginBottom: 15,
  },
  textUnderline: {
    textDecorationLine: "underline",
    marginLeft: 10,
  },
  touchBtn_title: {
    marginLeft: 25,
    fontSize: 12,
    color: colorBlack,
  },
  colorBlack: {
    color: colorBlack,
  },

  measurs_name: {
    fontWeight: "700",
    color: colorBlack,
    fontSize: 15,
  },
  measurs_fieldtext: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    maxHeight: 80,
    marginTop: 10,
  },
  measurs_header: {
    marginTop: 15,
    paddingBottom: 5,
    color: colorBlack,
    fontSize: 15,
  },
  measurs_title: {
    padding: 10,
    color: colorBlack,
    fontSize: 15,
  },
  measurs_item: {
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
    flex: 1,
  },
  measurs_input: {
    borderBottomWidth: 1,
    textAlign: "center",
    padding: 5,
    minWidth: 100,
    color: colorBlack,
  },
  measurs_label: {
    paddingRight: 15,
    color: colorBlack,
  },
  measurs_close: {
    position: "absolute",
    right: 0,
    top: 0,
    padding: 3,
    zIndex: 2,
  },
  menu: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // alignSelf: "center",
    borderWidth: 1,
    width: "100%",
  },
  menu_item: {
    height: 50,
    flexGrow: 1,
    borderWidth: 1,
    textAlign: "center",
  },
  typeInspBtn_text: {
    fontSize: 14,
    color: colorBlack,
  },
  typeInspBtn: {
    marginTop: 15,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: textColor,
  },
  inspect: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: textColor,
    padding: 5,
    marginTop: 15,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  inspect_desc: {
    width: "80%",
    flexGrow: 4,
  },
  inspect_text: {
    color: colorBlack,
    fontSize: 15,
  },
  inspect_number: {
    color: textColor,
    // fontWeight: "700",
  },
  inspect_v: {
    color: colorGray,
    paddingRight: 5,
    fontSize: 12,
  },
  inspect_date: {
    fontSize: 12,
    color: colorGold,
    paddingRight: 10,
  },
  inspect_wrBtn: {
    width: "20%",
    flexGrow: 2,
    paddingLeft: 10,
  },
  inspect_btn: {
    borderWidth: 1,
    borderColor: "#00B5E4",
    borderColor: "transparent",
    borderRadius: 5,
    padding: 3,
    textAlign: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: 33,
    height: 33,
    marginLeft: "auto",
    backgroundColor: "#00B5E4",
    backgroundColor: "transparent",
  },
  inspect_foot: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  btnUpdateUs: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ccc",
    backgroundColor: "transparent",
    borderColor: mainColor,
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    width: "auto",
    // marginHorizontal: "auto",
    textAlign: "center",
  },
  user_text: {
    fontSize: 15,
    color: colorBlack,
    marginTop: 5,
  },
})
