import AsyncStorage from "@react-native-async-storage/async-storage"

import { Alert } from "react-native"

const mobile = false

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

const getMyName = async () => {
  try {
    const myName = await AsyncStorage.getItem("myName")
    return myName != null ? myName : null
  } catch (error) {
    console.log("catch error", error)
  }
}

const setMyName = async (value) => {
  try {
    await AsyncStorage.setItem("myName", value)
    alertMsg("Сохранено!")
  } catch (e) {
    console.log("catch e")
  }
}

const getUsers = async () => {
  try {
    const users = await AsyncStorage.getItem("users")
    return users != null ? JSON.parse(users) : null
  } catch (error) {
    console.log("catch error", error)
  }
}

function getUsersForDelegation(list) {
  const res = []
  list?.forEach((item) => {
    res.push({ check: false, text: item.text })
  })
  return res
}

const setUsersDefault = async (value) => {
  try {
    const jsonUsers = JSON.stringify({
      version: 1,
      list: [
        { check: false, text: "Иванов ИИ" },
        { check: false, text: "Петров ПП" },
        { check: false, text: "Сидоров СС" },
      ],
    })
    await AsyncStorage.setItem("users", jsonUsers)
    console.log("setUsersDefault")
  } catch (error) {
    console.log("catch error", error)
  }
}

const getInspectionHistory = async () => {
  try {
    const history = await AsyncStorage.getItem("inspectionHistory")
    console.log("his", history)
    return history != null ? JSON.parse(history) : null
  } catch (error) {
    console.log("catch error", error)
  }
}

const addItemInspectionHistory = async (value) => {
  try {
    let history = await getInspectionHistory()
    console.log("history1", history)
    history != null ? history.push(value) : (history = [value])
    console.log("history", history)

    const jsonHis = JSON.stringify(history)
    await AsyncStorage.setItem("inspectionHistory", jsonHis)
    console.log("addItemInspectionHistory")
  } catch (error) {
    console.log("catch error", error)
  }
}

const setDoneList = async (key, dl) => {
  try {
    const jsonDL = JSON.stringify(dl)
    await AsyncStorage.setItem(key, jsonDL)
    console.log("setDoneList")
  } catch (error) {
    console.log("catch error", error)
  }
}

export {
  deepClone,
  getTime,
  checkEmpty,
  checkEmptyChild,
  checkOneChecked,
  alertSelection,
  alertMsg,
  getMyName,
  setMyName,
  getUsers,
  getUsersForDelegation,
  setUsersDefault,
  getInspectionHistory,
  addItemInspectionHistory,
  setDoneList,
}
