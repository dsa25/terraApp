import React, { useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { ActivityIndicator } from "react-native-paper"

import { css } from "../assets/css"

export function BtnSynchronization({ func }) {
  const [isLoading, setLoading] = useState(false)

  const actions = async () => {
    setLoading(true)
    await func()
    setLoading(false)
  }

  return (
    <TouchableOpacity
      style={[css.touchBtn, { flexDirection: "row", alignItems: "center" }]}
      onPress={actions}
    >
      <ActivityIndicator animating={isLoading} color={"green"} />
      <Text style={{ paddingLeft: 15 }}>Синхронизация</Text>
    </TouchableOpacity>
  )
}
