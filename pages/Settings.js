import React, { useState, useEffect } from "react"
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native"
import { RadioButton } from "react-native-paper"

import { getUsers, getMyName, setMyName } from "../components/func"
import { css } from "../assets/css"

let myName = ""
export default function Settings({ navigation, route }) {
  const notUser = "Не найдено ни одного пользователя, нужна синхронизация!"
  const [users, setUsers] = useState([{ check: false, text: notUser }])

  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState([])

  const getUsers = async () => {
    try {
      // const response = await fetch("https://reactnative.dev/movies.json")
      const response = await fetch("http://127.0.0.1:5000/users", {
        method: "POST",
      })
      const json = await response.json()
      console.log("json.movies", json)
      setData(json)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

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
    getUsers()
    // if (myName == "") {
    //   const setName = async () => {
    //     try {
    //       let name = await getMyName()
    //       myName = name
    //       console.log("myName2", myName)
    //     } catch (error) {
    //       console.error(error)
    //     }
    //   }
    //   setName()
    // }
    // if (users[0].text == notUser) {
    //   const setUs = async () => {
    //     try {
    //       let us = await getUsers()
    //       console.log("us", us)
    //       if (us != null && us.list != undefined) setUsers(us.list)
    //       console.log("users", users)
    //     } catch (error) {
    //       console.error(error)
    //     }
    //   }
    //   setUs()
    // }
  }, [])

  return (
    <ScrollView style={[css.pages]}>
      <View style={{ flex: 1, padding: 24 }}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <Text>
                {item.id}, {item.fio}, {item.post}
              </Text>
            )}
          />
        )}
      </View>
      {/* <Text>Выберите себя</Text>
      <ListUsers props={users} />
      <TouchableOpacity
        style={css.touchBtn}
        onPress={() => {
          // setMyName(myName)
          console.log("click..")
          console.log("fetch", getUsers())
        }}
      >
        <Text>Сохранить</Text>
      </TouchableOpacity> */}
    </ScrollView>
  )
}
