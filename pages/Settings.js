import React, { useState, useEffect } from "react"
import { ScrollView, View, Text, TouchableOpacity } from "react-native"
import * as Clipboard from "expo-clipboard"
import { RadioButton, ActivityIndicator } from "react-native-paper"

import { server } from "../data/server"

import {
  getUsers,
  updateUsers,
  setUsersDefault,
  myFetch,
  alertMsg,
} from "../components/func"
import { css } from "../assets/css"
import { BtnUpdateUs } from "../components/BtnUpdateUs"

let myName = ""
export default function Settings({ navigation, route }) {
  const notUser = "Не найдено ни одного пользователя, нужно загрузить!"
  // const [users, setUsers] = useState([{ id: 0, fio: notUser, post: 0 }])
  const [users, setUsers] = useState(0)
  const [test, setTest] = useState(0)

  // setUsersDefault()

  const getUsersServer = async () => {
    try {
      console.log(server.users)
      let usS = await myFetch(server.users)
      console.log("json.users", usS)
      return usS
    } catch (error) {
      console.error(error)
    }
  }

  const updateUs = async () => {
    try {
      let us = await getUsersServer()
      console.log("us..", us)
      await updateUsers(us)
      setUsers(us)
    } catch (error) {
      console.error(error)
    }
  }

  function ListUsers({ props }) {
    const [value, setValue] = useState(-1)
    if (props == 0) {
      return <Text>Не найдено ни одного пользователя, нужно загрузить!</Text>
    }
    const result = props.map((item, index) => (
      <View style={css.wr_radio} key={index}>
        {/* <RadioButton
          color="#03a9f4"
          value={index}
          status={item.text === myName ? "checked" : "unchecked"}
          onPress={() => {
            setValue(index)
            myName = item.fio
          }}
        /> */}
        <Text style={css.radio_label}>
          {item.id} {item.fio}{" "}
          {item.post == 1 ? " (мастер)" : " (электромонтер)"}
        </Text>
      </View>
    ))
    return result
  }

  const renderUs = async () => {
    let us = await getUsers()
    if (us != null) setUsers(us)
  }

  useEffect(() => {
    renderUs()
  }, [])

  return (
    <ScrollView style={[css.pages]}>
      <BtnUpdateUs func={updateUs} />

      <View style={{ flex: 1, padding: 24 }}>
        <ListUsers props={users} />
      </View>

      {/* <TouchableOpacity
        style={[css.touchBtn, { flexDirection: "row", alignItems: "center" }]}
        onPress={async () => {
          // setUsersDefault()
          // renderUs()
          console.log("Clipboard")
          let str1 = "http://127.0.0.1:5000/list/12"
          Clipboard.setString(str1)
          const str2 = await Clipboard.getStringAsync()
          if (str1 == str2) {
            alertMsg("Скопировано!")
          }
        }}
      >
        <Text style={{ paddingLeft: 15 }}>Clipboard</Text>
      </TouchableOpacity> */}
    </ScrollView>
  )
}
