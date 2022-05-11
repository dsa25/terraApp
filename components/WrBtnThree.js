import React from "react"
import { TouchableOpacity, Text, View } from "react-native"

import { css } from "../assets/css"

export function WrBtnThree({ fCancel, fBack, fNext }) {
  return (
    <View style={[css.wr_btns, { paddingBottom: 50 }]}>
      <TouchableOpacity
        style={[css.touchBtn, css.btn_red, { marginRight: 15 }]}
        onPress={fCancel}
      >
        <Text style={{ color: "#fff" }}>Завершить</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[css.touchBtn, { marginLeft: "auto" }]}
        onPress={fBack}
      >
        <Text style={{ color: "#3498db" }}>Назад</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[css.touchBtn, { marginLeft: 30 }]}
        onPress={fNext}
      >
        <Text style={{ color: "#3498db" }}>Далее</Text>
      </TouchableOpacity>
    </View>
  )
}
