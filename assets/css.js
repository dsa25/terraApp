import { StyleSheet } from "react-native"

export const css = StyleSheet.create({
  row: {
    width: "100%",
  },
  pages: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: "#9e9e9e29",
    // justifyContent: "space-between",
  },
  header: {
    width: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  logo: {
    color: "blue",
    fontSize: 20,
    paddingVertical: 5,
  },
  question_name: {
    fontSize: 14,
    fontWeight: "900",
    color: "#878585",
  },
  question_header: {
    color: "red",
  },
  question_text: {
    fontSize: 14,
  },
  wr_checkbox: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  checkbox_text: {
    fontSize: 16,
    // borderWidth: 1,
    paddingLeft: 10,
    paddingTop: 7,
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
    fontSize: 12,
  },
  touchBtn: {
    marginTop: 15,
    backgroundColor: "#ccc",
    padding: 15,
    borderRadius: 7,
  },
  btn_green: {
    backgroundColor: "#00af00",
  },
  btn_red: {
    backgroundColor: "#e93e3e",
  },
  measurs_btnAdd: {
    width: "auto",
    marginHorizontal: "auto",
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
  },

  measurs_name: {
    fontWeight: "900",
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
  },
  measurs_title: {
    padding: 10,
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
  },
  measurs_label: {
    paddingRight: 15,
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
})
