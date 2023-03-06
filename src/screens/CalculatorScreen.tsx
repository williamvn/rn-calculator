import React, { useEffect, useMemo, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { OP, useOperationReducer } from '../../hooks/useOperationReducer'
import { Button } from '../components/Button'
import { globalStyles } from '../themes/shared/main'


export const CalculatorScreen = () => {
    const { state, dispatch } = useOperationReducer("0", "");
    const { result, hold } = state;
    const formattedResult = useMemo(() => formatNumber(result), [result]);
    const formattedHold = useMemo(() => formatNumber(hold), [hold]);

    function formatNumber(value: string) {
        const positiveValue = value.startsWith("-")? value.slice(1): value;
        const minus = value.startsWith("-")? "-": "";
        if (positiveValue.length > 3 && !positiveValue.includes(",")) {
            let formatted = positiveValue[0];
            for (let i = 1; i < positiveValue.length; i++) {
                if ((positiveValue.length - i) % 3 == 0) {
                    formatted += ".";
                }
                formatted += positiveValue[i];
            }
            return minus + formatted;
        }
        return minus + positiveValue;
    }


    return (
        <View style={styles.container}>
            <Text style={globalStyles.secondaryText}>{formattedHold}</Text>
            <Text style={globalStyles.primaryText} numberOfLines={1} adjustsFontSizeToFit> {formattedResult} </Text>
            <View style={styles.row}>
                <Button text='C' type='secondary' onPress={() => dispatch({ type: OP.C })}></Button>
                <Button text='+/-' type='secondary' onPress={() => dispatch({ type: OP.NEG })}></Button>
                <Button text='del' type='secondary' onPress={() => dispatch({ type: OP.DEL })}></Button>
                <Button text='/' type='alert' onPress={() => dispatch({ type: OP.DIV })}></Button>
            </View>
            <View style={styles.row}>
                <Button text='7' onPress={() => dispatch({ type: OP.NUM, value: "7" })}></Button>
                <Button text='8' onPress={() => dispatch({ type: OP.NUM, value: "8" })}></Button>
                <Button text='9' onPress={() => dispatch({ type: OP.NUM, value: "9" })}></Button>
                <Button text='X' type='alert' onPress={() => dispatch({ type: OP.MULT })}></Button>
            </View>
            <View style={styles.row}>
                <Button text='4' onPress={() => dispatch({ type: OP.NUM, value: "4" })}></Button>
                <Button text='5' onPress={() => dispatch({ type: OP.NUM, value: "5" })}></Button>
                <Button text='6' onPress={() => dispatch({ type: OP.NUM, value: "6" })}></Button>
                <Button text='-' type='alert' onPress={() => dispatch({ type: OP.SUB })}></Button>
            </View>
            <View style={styles.row}>
                <Button text='1' onPress={() => dispatch({ type: OP.NUM, value: "1" })}></Button>
                <Button text='2' onPress={() => dispatch({ type: OP.NUM, value: "2" })}></Button>
                <Button text='3' onPress={() => dispatch({ type: OP.NUM, value: "3" })}></Button>
                <Button text='+' type='alert' onPress={() => dispatch({ type: OP.PLUS })}></Button>
            </View>
            <View style={styles.row}>
                <Button text='0' style={styles.zeroButton} onPress={() => dispatch({ type: OP.NUM, value: "0" })}></Button>
                <Button text='.' onPress={() => dispatch({ type: OP.DOT })}></Button>
                <Button text='=' type='alert' onPress={() => dispatch({ type: OP.EQ })}></Button>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        ...globalStyles.container,
        padding: 20,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    row: {
        ...globalStyles.row,
        width: "100%",
        justifyContent: 'space-around',
        marginBottom: 10

    },
    zeroButton: {
        ...globalStyles.primaryButton,
        width: 175,
        borderRadius: 40,
        alignItems: 'flex-start',
        paddingHorizontal: 30
    }
});