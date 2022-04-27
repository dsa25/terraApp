import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, ScrollView } from "react-native"
import { getInspectionHistory } from "../components/func"
import { FontAwesome5 } from "@expo/vector-icons"
import { getTypeIcon, setUsersDefault } from "../components/func"
import { css } from "../assets/css"

import { StartInspection } from "../components/StartInspection"

export default function Home({ navigation, route }) {
  const [inspections, setInpections] = useState(0)

  const [typeDL, setTypeDL] = useState("")
  const [DL, setDL] = useState({})

  const [selectType, setSelectType] = useState("")

  function closeStart(value) {
    setSelectType(value)
  }
  // setUsersDefault()

  function ListInspect({ props }) {
    if (props == null) return <Text>Осмотров еще нет ...</Text>
    let result = props.map((item, index) => (
      <View style={css.inspect} key={index}>
        <View style={css.inspect_desc}>
          <Text>
            <Text>№ {item.id} </Text>
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
              {item.measur && (
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

  function WrListInspect() {
    return (
      <View>
        <Text>Список осмотров</Text>
        {inspections != 0 && <ListInspect props={inspections} />}
      </View>
    )
  }

  useEffect(() => {
    if (inspections == 0) {
      const getHis = async () => {
        let his = await getInspectionHistory()
        setInpections(his)
      }
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
