import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, ScrollView } from "react-native"
import { getInspectionHistory } from "../components/func"
import { FontAwesome5 } from "@expo/vector-icons"
import {
  getTypeIcon,
  udateItemInspectionHistory,
  myFetch,
  goHomeAfterSave,
} from "../components/func"
import { css } from "../assets/css"

import { server } from "../data/server"

import { StartInspection } from "../components/StartInspection"
import { BtnSynchronization } from "../components/BtnSynchronization"

export default function Home({ navigation, route }) {
  const [inspections, setInpections] = useState(0)

  const [typeDL, setTypeDL] = useState("")
  const [DL, setDL] = useState({})

  const [selectType, setSelectType] = useState("")

  function closeStart(value) {
    setSelectType(value)
  }

  function ListInspect({ props }) {
    console.log("props.status", props)
    if (props == 0) {
      return <Text>Осмотров 0 ...</Text>
    }
    if (props == null) {
      return <Text>Осмотров еще null </Text>
    }
    let result = props.map((item, index) => (
      <View style={css.inspect} key={index}>
        <View style={css.inspect_desc}>
          <Text>
            <Text>№ {item.id == 0 ? "__" : item.id} </Text>
            <Text> {item.address}</Text>
          </Text>
          <Text>
            <Text style={{ paddingRight: 5 }}>v:{item.v}</Text> (отвт.{" "}
            {item.fio})
          </Text>

          <View style={css.inspect_foot}>
            <Text style={css.inspect_date}>{item.date}</Text>
            <Text>
              <Text>{getTypeIcon(item.type)}</Text>
              {item.measur == 1 && (
                <Text>
                  {" + "}
                  {getTypeIcon("measurements")}
                </Text>
              )}
            </Text>
            <Text style={{ marginLeft: 15 }}>{getTypeIcon(item.status)}</Text>
          </View>
        </View>
        <View style={css.inspect_wrBtn}>
          <TouchableOpacity
            style={css.inspect_btn}
            onPress={() => {
              setTypeDL(item.type)
              setDL(item)
              setSelectType(true)
            }}
          >
            <FontAwesome5 name="pencil-alt" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    ))
    return result
  }

  const funcSynch = async () => {
    console.log("click synch", inspections)
    if (inspections) {
      let countSynch = 0
      for (const item of inspections) {
        if (item.id == 0) {
          let itemServ = await myFetch(server.addInspect, item)
          console.log("respons", itemServ)
          if (itemServ.status == 1) {
            itemServ.body[0].DL = JSON.parse(itemServ.body[0].DL)
            await udateItemInspectionHistory(itemServ.body[0])
            countSynch++
          } else {
            console.log("server: status 0")
          }
        }
        if (item.id > 0 && item.status == "local") {
          let itemServ = await myFetch(server.updateInspect, item)
          console.log("respons", itemServ)
          if (itemServ.status == 1) {
            item.status = "server"
            await udateItemInspectionHistory(item)
            countSynch++
          } else {
            console.log("server: status 0")
          }
        }
      }
      console.log("respons2222")
      if (countSynch > 0) {
        console.log("sync > 0")
        // await getHis()
        // await goHomeAfterSave(navigation)
        // setInpections()
        // тут ворнинги: что делать?
        // Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
      }
    }
  }

  function WrListInspect() {
    return (
      <View>
        <Text>Список осмотров</Text>
        <BtnSynchronization func={funcSynch} />
        <ListInspect props={inspections} />
      </View>
    )
  }

  async function getHis() {
    let his = await getInspectionHistory()
    setInpections(his)
    console.log("his", his)
  }

  useEffect(() => {
    if (inspections == 0) {
      getHis()
    }
    if (route.params?.inspectionHistory) {
      console.log("route post", route.params?.inspectionHistory)
      setInpections(route.params?.inspectionHistory)
    }
  }, [route.params?.inspectionHistory])

  return (
    <ScrollView style={[css.pages]}>
      {selectType ? (
        <StartInspection
          mode={"edit"}
          type={typeDL}
          DL={DL}
          closeStart={closeStart}
          navigation={navigation}
        />
      ) : (
        <WrListInspect />
      )}
    </ScrollView>
  )
}

// useEffect(() => {
//   let cancel = false

//   if (inspections == 0) {
//     async function getHis() {
//       let his = await getInspectionHistory()
//       if (his == null) {
//         if (cancel) return
//         setInpections("not data")
//       } else {
//         if (cancel) return
//         setInpections(his)
//       }
//       console.log("his", his)
//     }
//     getHis()
//   }
//   if (route.params?.inspectionHistory) {
//     console.log("route post", route.params?.inspectionHistory)
//     setInpections(route.params?.inspectionHistory)
//     console.log("useEffect")
//   }

//   return () => {
//     cancel = true
//   }
// }, [route.params?.inspectionHistory])
