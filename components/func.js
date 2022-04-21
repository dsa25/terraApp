import { Alert } from "react-native"

const mobile = true

function alertMsg(msg = "text message") {
  return mobile ? Alert.alert(msg) : alert(msg)
}

function alertSelection(
  header = "",
  msg = "",
  funcOk = { func: func, text: "Да" },
  funcNo = { func: func, text: "Нет" }
) {
  if (mobile) {
    Alert.alert(header, msg, [
      {
        text: funcNo.text,
        onPress: () => {
          funcNo.func()
          console.log("funcNo")
        },
        style: "cancel",
      },
      {
        text: funcOk.text,
        onPress: () => {
          funcOk.func()
          console.log("funcOk")
        },
      },
    ])
    return
  }

  let modalRes = confirm(header)
  if (modalRes) {
    funcOk.func()
    console.log("funcOk")
  } else {
    funcNo.func()
    console.log("funcNo")
  }
  return
}

function getTime() {
  let time = new Date()
  let dd = time.getDate()
  let mo = time.getMonth() + 1
  let yy = time.getFullYear().toString()
  if (mo < 10) mo = "0" + mo
  if (dd < 10) dd = "0" + dd
  return `${dd}.${mo}.${yy}`
}

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

function checkEmpty(arr) {
  let result = false
  for (const item of arr) {
    if (item.trim().length == 0) {
      result = true
      break
    }
  }
  return result
}

function checkEmptyChild(arr) {
  let result = false
  for (const item of arr) {
    if (item.input.trim().length == 0) {
      result = true
      break
    }
  }
  return result
}

function checkOneChecked(arr) {
  let result = false
  for (const item of arr) {
    if (item.check) {
      result = true
      break
    }
  }
  return result
}

export {
  deepClone,
  getTime,
  checkEmpty,
  checkEmptyChild,
  checkOneChecked,
  alertSelection,
  alertMsg,
}
