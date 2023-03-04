import React from 'react'
import { StatusBar, View } from 'react-native'
import { CalculatorScreen } from './src/screens/CalculatorScreen'
import { globalStyles } from './src/themes/shared/main'

export const App = () => {
  return (
    <View style={[globalStyles.appColor, globalStyles.container]}>
      <StatusBar backgroundColor={globalStyles.appColor.backgroundColor} />
      <CalculatorScreen></CalculatorScreen>
    </View>
  )
}
