import React from 'react'
import { View, Text } from 'react-native'

export default function TextCompo({children, style, onPress}) {
    return (
        <View>
            <Text onPress={onPress} style={style}>{children}</Text>
        </View>
    )
}
