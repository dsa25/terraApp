import React from "react"
import { TouchableOpacity, Text, View } from "react-native"

import { css } from "../assets/css"

export function WrBtnThree({ fCancel, fBack, fNext }) {
  return (
    <View style={[css.wr_btns, { paddingBottom: 30 }]}>
      <TouchableOpacity
        style={[css.touchBtn, css.btn_red, { marginRight: "auto" }]}
        onPress={fCancel}
      >
        <Text style={{ color: "#fff" }}>Завершить</Text>
      </TouchableOpacity>

      <TouchableOpacity style={css.touchBtn} onPress={fBack}>
        <Text>Назад</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[css.touchBtn, { marginLeft: 50 }]}
        onPress={fNext}
      >
        <Text>Далее</Text>
      </TouchableOpacity>
    </View>
  )
}
