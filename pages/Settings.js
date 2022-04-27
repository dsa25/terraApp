import React, { useState, useEffect } from "react"
import { ScrollView, View, Text, TouchableOpacity } from "react-native"
import { RadioButton } from "react-native-paper"

import { getUsers, getMyName, setMyName } from "../components/func"
import { css } from "../assets/css"

let myName = ""
export default function Settings({ navigation, route }) {
  const notUser = "Не найдено ни одного пользователя, нужна синхронизация!"
  const [users, setUsers] = useState([{ check: false, text: notUser }])

  function ListUsers({ props }) {
    const [value, setValue] = useState(-1)
    const result = props.map((item, index) => (
      <View style={css.wr_radio} key={index}>
        <RadioButton
          color="#03a9f4"
          value={index}
          status={item.text === myName ? "checked" : "unchecked"}
          onPress={() => {
            setValue(index)
            myName = item.fio
          }}
        />
        <Text style={css.radio_label}>
          {item.fio} {item.post == 1 ? " (мастер)" : " (электромонтер)"}
        </Text>
      </View>
    ))
    return result
  }

  useEffect(() => {
    if (myName == "") {
      const setName = async () => {
        try {
          let name = await getMyName()
          myName = name
          console.log("myName2", myName)
        } catch (error) {
          console.error(error)
        }
      }
      setName()
    }
    if (users[0].text == notUser) {
      const setUs = async () => {
        try {
          let us = await getUsers()
          console.log("us", us)
          if (us != null && us.list != undefined) setUsers(us.list)
          console.log("users", users)
        } catch (error) {
          console.error(error)
        }
      }
      setUs()
    }
  }, [])

  return (
    <ScrollView style={[css.pages]}>
      <Text>Выберите себя</Text>
      <ListUsers props={users} />
      <TouchableOpacity
        style={css.touchBtn}
        onPress={() => {
          // setMyName(myName)
          navigation.navigate({
            name: "Home",
            params: {
              inspectionHistory: [
                {
                  id: "0123",
                  v: 1,
                  date: "27.04.2022",
                  address: "ул. Луговая 22222 ",
                  fio: "Иванов ИИ",
                  key: "key_1650997241199",
                  status: "local",
                  type: "buildingPart",
                  measur: true,
                },
              ],
            },
            merge: false,
          })
        }}
      >
        <Text>Сохранить</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}
