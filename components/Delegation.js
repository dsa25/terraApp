import React, { useState, useEffect } from "react"
import { Text, View, TextInput } from "react-native"
import { Checkbox, RadioButton } from "react-native-paper"

import { css } from "../assets/css"
import { getTime, getUsers, getUsersForDelegation, getMyName } from "./func"

let myName = ""
export function Delegation({ type, dd, getData }) {
  // const [data, setData] = useState(dd)
  const data = dd
  const [users, setUsers] = useState(0)
  // let other = []

  data.users.text = type == "measurements" ? data.headers2[0] : data.headers2[1]
  data.date = getTime()

  function LabelInput({ props }) {
    const [input, setInput] = useState(props.input)
    return (
      <View style={css.measurs_item}>
        <Text style={css.measurs_label}>{props.label}</Text>
        <TextInput
          style={css.measurs_input}
          value={props.input}
          onChangeText={(text) => {
            props.input = text
            setInput(props.input)
            // getData(data)
          }}
        />
      </View>
    )
  }

  function ListCheckBox({ props }) {
    if (props == 0) return <Text>not users ...</Text>
    console.log("propsList2", props)
    let myList = []
    props.list.forEach((item) => {
      if (item.post == 0) myList.push(item)
    })
    if (data.users.other.length > 0) {
      myList.forEach((item) => {
        if (data.users.other.find((elem) => elem.id === item.id) != undefined)
          item.check = true
      })
    }
    console.log("myList2", myList)
    const [checkBoxs, setCheckBoxs] = useState(myList)
    const result = myList.map((item, index) => (
      <View style={css.wr_radio} key={index}>
        <Checkbox
          color="#03a9f4"
          // disabled={!props.check}
          // disabled={item.text === myName}
          status={
            data.users.other.find((elem) => elem.id === item.id) != undefined
              ? "checked"
              : "unchecked"
          }
          // status={item.text === myName ? "checked" : "unchecked"}
          onPress={() => {
            checkBoxs[index].check = !item.check
            setCheckBoxs([...checkBoxs])
            if (item.check) data.users.other.push(item)
            if (!item.check) {
              data.users.other = data.users.other.filter(
                (elem) => elem.id != item.id
              )
            }
            console.log("myList3", myList)
            console.log("users", data.users)
          }}
        />
        <Text style={css.radio_label}>
          {item.fio} {item.post == 1 ? " (мастер)" : " (электромонтер)"}
        </Text>
      </View>
    ))
    return result
  }

  function RadioGroup({ props }) {
    if (props == 0) return <Text>not users ...</Text>
    console.log("propsList", props)
    let myList = []
    props.list.forEach((item) => {
      if (item.post == 1) myList.push(item)
    })
    console.log("myList", myList)
    const [radio, setRadio] = useState(-1)
    const result = myList?.map((item, index) => (
      <View style={css.wr_radio} key={index}>
        <RadioButton
          color="#03a9f4"
          value={index}
          // disabled={!props.check}
          status={item.id === data.users.master.id ? "checked" : "unchecked"}
          onPress={() => {
            setRadio(index)
            data.users.master = item
            console.log("usersR", data.users)
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
    if (users == 0) {
      const testFunc = async () => {
        try {
          let us = await getUsers()
          console.log("us", us)
          // if (us != null && us.list != undefined) {
          //   users.checkbox = getUsersForDelegation(us.list)
          //   if (myName == "") myName = await getMyName()
          //   users.checkbox.forEach((item) => {
          //     if (item.text == myName) item.check = true
          //   })
          //   console.log("LS_us", us)
          //   console.log("LS_users2", users)
          // }
          setUsers({ ...us })
        } catch (error) {
          console.error(error)
        }
      }
      testFunc()
      console.log("useEffect")
    }
  }, [])

  return (
    <View>
      <Text>
        {type == "measurements" ? data.headers[0] : data.headers[1]}{" "}
        <Text>{data.date}</Text>
      </Text>
      <LabelInput props={data.fields[0]} />
      <LabelInput props={data.fields[1]} />
      <Text>Напряжение:</Text>
      <LabelInput props={data.fields[2]} />
      <LabelInput props={data.fields[3]} />
      <LabelInput props={data.fields[4]} />

      <Text>{data.users.text}</Text>
      <RadioGroup props={users} />
      <ListCheckBox props={users} />
    </View>
  )
}
