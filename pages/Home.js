import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, ScrollView } from "react-native"
import { ActivityIndicator } from "react-native-paper"
import * as Clipboard from "expo-clipboard"
import { FontAwesome5 } from "@expo/vector-icons"
import {
  getTypeIcon,
  setListInspectionHistory,
  udateItemInspectionHistory,
  myFetch,
  deepClone,
  goHomeAfterSave,
} from "../components/func"
import { alertMsg, getInspectionHistory } from "../components/func"
import { css } from "../assets/css"

import { server } from "../data/server"

import { StartInspection } from "../components/StartInspection"

export default function Home({ navigation, route }) {
  const [inspections, setInpections] = useState(0)

  const [typeDL, setTypeDL] = useState("")
  const [DL, setDL] = useState({})

  const [selectType, setSelectType] = useState("")

  function closeStart(value) {
    setSelectType(value)
  }

  const [isLoading, setLoading] = useState(false)

  function ListInspect({ props }) {
    if (props == 0 || props == null) {
      return <Text>Осмотров пока нет</Text>
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
          {item.status == "local" && (
            <TouchableOpacity
              style={[css.inspect_btn, { marginBottom: 15 }]}
              onPress={() => {
                sendServer(item)
              }}
            >
              <FontAwesome5 name="cloud-upload-alt" size={20} color="black" />
            </TouchableOpacity>
          )}
          {item.status == "server" &&
            item.file != undefined &&
            item.file != null && (
              <TouchableOpacity
                style={[css.inspect_btn, { marginBottom: 15 }]}
                onPress={async () => {
                  Clipboard.setString(item.file)
                  let str = await Clipboard.getStringAsync()
                  if (item.file == str) alertMsg("Скопировано!")
                }}
              >
                <FontAwesome5 name="copy" size={20} color="black" />
              </TouchableOpacity>
            )}
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

  const sendServer = async (inspect) => {
    //  новые осмотры
    if (inspect.id == 0) {
      setLoading(true)
      let res = await myFetch(server.addInspect, inspect)
      if (res?.status == 1) {
        res.body[0].DL = JSON.parse(res.body[0].DL)
        await udateItemInspectionHistory(res.body[0])
        // f5
        setLoading(false)
        await getHis()
      } else {
        setLoading(false)
        console.log("server: status 0")
      }
      return
    }

    //  отредактированные осмотры
    if (inspect.id > 0 && inspect.status == "local") {
      console.log("update", inspect)
      setLoading(true)
      let res = await myFetch(server.updateInspect, inspect)
      if (res?.status == 1) {
        inspect.status = "server"
        await udateItemInspectionHistory(inspect)
        // f5
        setLoading(false)
        await getHis()
      } else {
        setLoading(false)
        console.log("server: status 0")
      }
    }
  }

  function WrListInspect() {
    return (
      <View>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <Text>Список осмотров</Text>
          <ActivityIndicator
            style={{ margin: "auto" }}
            animating={isLoading}
            color={"green"}
          />
        </View>
        <ListInspect props={inspections} />
      </View>
    )
  }

  async function getHis() {
    let his = await getInspectionHistory()
    if (his != null) setInpections(his)
  }

  useEffect(() => {
    if (inspections == 0) {
      getHis()
    }
    if (route.params?.inspectionHistory) {
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

// const funcSynch = async () => {
//   console.log("click synch", inspections)
//   if (!inspections) {
//     // 1 получить все осмотры
//     let allInspects = await myFetch(server.allInspects)
//     console.log("allInspects", allInspects)
//     if (allInspects && allInspects.length > 0) {
//       allInspects.forEach((item) => {
//         item.DL = JSON.parse(item.DL)
//       })
//       await setListInspectionHistory(allInspects)
//       setInpections([...allInspects])
//     }
//     return
//   }
// }

//  если осмотры есть
// if (inspections) {
//   let countSynch = 0

//   // 4 получить новые осмотры
//   let ih2 = await getInspectionHistory()
//   console.log("ih ih_", ih2)
//   if (ih2 != null) {
//     let lastId = ih2[0].id
//     let newInspects = await myFetch(server.allNewInspects, { id: lastId })
//     console.log("newInspects", newInspects)
//     if (newInspects.status == 1 && newInspects.body.length > 0) {
//       newInspects.body.forEach((item) => {
//         item.DL = JSON.parse(item.DL)
//         ih2.unshift(item)
//       })
//       await setListInspectionHistory(ih2)
//       countSynch++
//     }
//   }

//   // 5 получить отредактированные осмотры
//   let ih = await getInspectionHistory()
//   console.log("ihEdits..", ih)
//   if (ih != null) {
//     let allVers = await myFetch(server.allVers)
//     if (allVers && allVers.length > 0 && ih.length == allVers.length) {
//       console.log("ih.count", ih.length, "allV.len", allVers.length)
//       console.log("allVers", allVers)
//       let listId = []
//       allVers.forEach((item, index) => {
//         if (item.id == ih[index].id && item.v > ih[index].v) {
//           console.log("id", item.id)
//           listId.push(item.id)
//         }
//       })
//       if (listId.length > 0) {
//         console.log("listId", listId)
//         let edited = await myFetch(server.getEditedInspects, { listId })
//         console.log("edited", edited)
//         edited.forEach((item) => {
//           item.DL = JSON.parse(item.DL)
//           ih.forEach((ihItem, index) => {
//             if (ihItem.id == item.id) {
//               ih[index] = item
//             }
//           })
//         })
//         console.log("hi", ih)
//         await setListInspectionHistory(ih)
//         countSynch++
//       }
//     }
//   }

//   if (countSynch > 0) {
//     console.log("sync > 0", countSynch)
//     // await getHis()
//     // or
//     // await goHomeAfterSave(navigation)
//     // or
//     // setInpections()
//     // тут ворнинги: что делать?
//     // Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
//   } else {
//     console.log("sync == 0")
//   }
// }

// let countInServ = await myFetch(server.countInspect)
// console.log("countInServ", countInServ)
