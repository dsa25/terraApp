import React from "react"

import { Question } from "./Question"
import { Measurements } from "./Measurements"

export function StartInspection({
  type,
  dataQuests,
  closeStart,
  navigation,
  mode,
  DL,
}) {
  console.log("type", type, "mode", mode)
  if (type == "buildingPart")
    return (
      <Question
        mode={mode}
        DL={DL}
        dataQuests={dataQuests}
        closeStart={closeStart}
        navigation={navigation}
      />
    )
  if (type == "mastTransformer")
    return (
      <Question
        mode={mode}
        DL={DL}
        dataQuests={dataQuests}
        closeStart={closeStart}
        navigation={navigation}
      />
    )
  if (type == "measurements")
    return (
      <Measurements
        call={"one"}
        mode={mode}
        DL={DL}
        closeStart={closeStart}
        navigation={navigation}
      />
    )
  return <Text>ничего не выбрано!</Text>
}
