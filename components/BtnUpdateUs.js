import React, { useState } from "react"
import { TouchableOpacity } from "react-native"
import { ActivityIndicator } from "react-native-paper"
import { FontAwesome5 } from "@expo/vector-icons"

import { css } from "../assets/css"

export function BtnUpdateUs({ func }) {
  const [isLoading, setLoading] = useState(false)

  const actions = async () => {
    setLoading(true)
    await func()
    setLoading(false)
  }

  return (
    <TouchableOpacity style={css.btnUpdateUs} onPress={actions}>
      <ActivityIndicator animating={isLoading} color="#3498db" />
      <FontAwesome5
        style={{ marginHorizontal: 10 }}
        name="cloud-download-alt"
        size={24}
        color="#3498db"
      />
    </TouchableOpacity>
  )
}
