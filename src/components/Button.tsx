import React, { useEffect, useState } from 'react'
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import { globalStyles } from '../themes/shared/main'


interface IButton {
    text: string;
    type: "primary" | "secondary" | "alert",
    style?: StyleProp<ViewStyle>
}


export const Button = ({ type, text, style }: IButton) => {
    const [buttonStyle, setButtonStyle] = useState<StyleProp<ViewStyle>>();
    const [textStyle, setTextStyle] = useState<any>();

    useEffect(() => {
        switch (type) {
            case 'primary':
                setButtonStyle(globalStyles.primaryButton);
                setTextStyle(globalStyles.primaryTextButton);
                break;
            case 'secondary':
                setButtonStyle(globalStyles.secondaryButton);
                setTextStyle(globalStyles.secondaryTextButton);
                break;
            case 'alert':
                setButtonStyle(globalStyles.alertButton);
                setTextStyle(globalStyles.primaryTextButton);
            default:
                break;
        }
    }, [type]);

    return (
        <TouchableOpacity style={[buttonStyle, style]}>
            <Text style={textStyle}> {text} </Text>
        </TouchableOpacity>
    )
}