import AsyncStorage from "@react-native-async-storage/async-storage"
import { FontAwesome5 } from "@expo/vector-icons"

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

const updateUsers = async (list) => {
  try {
    const jsonUsers = JSON.stringify(list)
    await AsyncStorage.setItem("users", jsonUsers)
    console.log("updateUsers")
  } catch (error) {
    console.log("catch error", error)
  }
}

const setUsersDefault = async (value) => {
  try {
    const jsonUsers = JSON.stringify([
      {
        id: 1,
        fio: "Иванов ИИ",
        post: 1,
        groupDop: "3",
        status: 1,
      },
      {
        id: 2,
        fio: "Петров ПП",
        post: 1,
        groupDop: "5",
        status: 1,
      },
      {
        id: 3,
        fio: "Сидоров СС",
        post: 1,
        groupDop: "5",
        status: 1,
      },
      {
        id: 4,
        fio: "Петров22 ТП",
        post: 0,
        groupDop: "5",
        status: 1,
      },
      {
        id: 5,
        fio: "Сидоров222 ПП",
        post: 0,
        groupDop: "5",
        status: 1,
      },
      {
        id: 6,
        fio: "Иванов222 ПП",
        post: 0,
        groupDop: "5",
        status: 1,
      },
      {
        id: 7,
        fio: "Петров33 ТД",
        post: 0,
        groupDop: "5",
        status: 1,
      },
      {
        id: 8,
        fio: "Сидоров333 ПП",
        post: 0,
        groupDop: "5",
        status: 1,
      },
      {
        id: 9,
        fio: "Иванов333 ПП",
        post: 0,
        groupDop: "5",
        status: 1,
      },
      {
        id: 10,
        fio: "Потапов ИП",
        post: 1,
        groupDop: "5",
        status: 1,
      },
    ])
    await AsyncStorage.setItem("users", jsonUsers)
    console.log("setUsersDefault")
  } catch (error) {
    console.log("catch error", error)
  }
}

const setListInspectionHistory = async (value) => {
  try {
    const jsonHis = JSON.stringify(value)
    await AsyncStorage.setItem("inspectionHistory", jsonHis)
    console.log("setListInspectionHistory")
  } catch (error) {
    console.log("catch error", error)
  }
}

const getInspectionHistory = async () => {
  try {
    const history = await AsyncStorage.getItem("inspectionHistory")
    return history != null ? JSON.parse(history) : null
  } catch (error) {
    console.log("catch error", error)
  }
}

const addItemInspectionHistory = async (value) => {
  try {
    let history = await getInspectionHistory()
    history != null ? history.unshift(value) : (history = [value])
    const jsonHis = JSON.stringify(history)
    await AsyncStorage.setItem("inspectionHistory", jsonHis)
    console.log("addItemInspectionHistory")
  } catch (error) {
    console.log("catch error", error)
  }
}

const udateItemInspectionHistory = async (value) => {
  try {
    let history = await getInspectionHistory()
    if (history == null) {
      history = [value]
    } else {
      // history.forEach((item, index) => {
      //   if(item.key == value.key)
      // })
      for (let i = 0; i < history.length; i++) {
        if (history[i].keyLS == value.keyLS) {
          history[i] = value
          break
        }
      }
    }
    const jsonHis = JSON.stringify(history)
    await AsyncStorage.setItem("inspectionHistory", jsonHis)
    console.log("udateItemInspectionHistory")
  } catch (error) {
    console.log("catch error", error)
  }
}

function getTypeIcon(type = "") {
  if (type == "buildingPart")
    return <FontAwesome5 name="house-damage" size={16} color="red" />
  if (type == "mastTransformer")
    return <FontAwesome5 name="bolt" size={16} color="red" />
  if (type == "measurements")
    return <FontAwesome5 name="file-alt" size={16} color="red" />
  if (type == "local")
    return <FontAwesome5 name="mobile-alt" size={16} color="gray" />
  if (type == "server")
    return <FontAwesome5 name="cloud" size={15} color="green" />
  return ""
}

function isEmpty(obj) {
  for (let key in obj) {
    return false
  }
  return true
}

function isEmptyMaster(obj, users) {
  if (obj.id != undefined) {
    let us = users.find((item) => {
      return item.id == obj.id
    })
    return us == undefined ? true : false
  } else {
    console.log("false maseter")
    return true
  }
}

const goHomeAfterSave = async (navigation) => {
  let ih = await getInspectionHistory()
  if (ih != null) {
    navigation.navigate({
      name: "Home",
      params: {
        inspectionHistory: ih,
      },
      merge: true,
    })
    return
  }
  return console.log("ih == null ?")
}

const myFetch = async (url, data = [], method = "POST") => {
  let response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  })
  let result = await response.json()
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
  getMyName,
  setMyName,
  getUsers,
  updateUsers,
  setUsersDefault,
  setListInspectionHistory,
  getInspectionHistory,
  addItemInspectionHistory,
  udateItemInspectionHistory,
  getTypeIcon,
  isEmpty,
  isEmptyMaster,
  goHomeAfterSave,
  myFetch,
}
