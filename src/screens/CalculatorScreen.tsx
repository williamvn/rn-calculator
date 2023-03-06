import React, { useEffect, useMemo, useState } from 'react'
import { StyleSheet, Text, Vibration, View } from 'react-native'
import { OP, OPAction, useOperationReducer } from '../../hooks/useOperationReducer'
import { Button } from '../components/Button'
import { globalStyles } from '../themes/shared/main'


export const CalculatorScreen = () => {
    const { state, dispatch } = useOperationReducer("0", "");
    const { result, hold } = state;
    const formattedResult = useMemo(() => formatNumber(result), [result]);
    const formattedHold = useMemo(() => formatNumber(hold), [hold]);

    function formatNumber(value: string) {
        const positiveValue = value.startsWith("-") ? value.slice(1) : value;
        const minus = value.startsWith("-") ? "-" : "";
        const index = positiveValue.indexOf(",");
        const integerValue = index != -1 ? positiveValue.slice(0, index) : positiveValue;
        const decimalPart = index != -1 ? positiveValue.slice(index) : "";
        if (integerValue.length > 3) {
            let formatted = integerValue[0];
            for (let i = 1; i < integerValue.length; i++) {
                if ((integerValue.length - i) % 3 == 0) {
                    formatted += ".";
                }
                formatted += integerValue[i];
            }
            return minus + formatted + decimalPart;
        }
        return minus + integerValue + decimalPart;
    }

    function handleClick(action: OPAction) {
        Vibration.vibrate(20);
        dispatch(action);
    }


    return (
        <View style={styles.container}>
            <Text style={globalStyles.secondaryText}>{formattedHold}</Text>
            <Text style={globalStyles.primaryText} numberOfLines={1} adjustsFontSizeToFit> {formattedResult} </Text>
            <View style={styles.row}>
                <Button text='C' type='secondary' onPress={() => handleClick({ type: OP.C })}></Button>
                <Button text='+/-' type='secondary' onPress={() => handleClick({ type: OP.NEG })}></Button>
                <Button text='del' type='secondary' onPress={() => handleClick({ type: OP.DEL })}></Button>
                <Button text='/' type='alert' active={state.activeOp == OP.DIV} onPress={() => handleClick({ type: OP.DIV })}></Button>
            </View>
            <View style={styles.row}>
                <Button text='7' onPress={() => handleClick({ type: OP.NUM, payload: { value: "7" } })}></Button>
                <Button text='8' onPress={() => handleClick({ type: OP.NUM, payload: { value: "8" } })}></Button>
                <Button text='9' onPress={() => handleClick({ type: OP.NUM, payload: { value: "9" } })}></Button>
                <Button text='X' type='alert' active={state.activeOp == OP.MULT} onPress={() => handleClick({ type: OP.MULT })}></Button>
            </View>
            <View style={styles.row}>
                <Button text='4' onPress={() => handleClick({ type: OP.NUM, payload: { value: "4" } })}></Button>
                <Button text='5' onPress={() => handleClick({ type: OP.NUM, payload: { value: "5" } })}></Button>
                <Button text='6' onPress={() => handleClick({ type: OP.NUM, payload: { value: "6" } })}></Button>
                <Button text='-' type='alert' active={state.activeOp == OP.SUB} onPress={() => handleClick({ type: OP.SUB })}></Button>
            </View>
            <View style={styles.row}>
                <Button text='1' onPress={() => handleClick({ type: OP.NUM, payload: { value: "1" } })}></Button>
                <Button text='2' onPress={() => handleClick({ type: OP.NUM, payload: { value: "2" } })}></Button>
                <Button text='3' onPress={() => handleClick({ type: OP.NUM, payload: { value: "3" } })}></Button>
                <Button text='+' type='alert' active={state.activeOp == OP.PLUS} onPress={() => handleClick({ type: OP.PLUS })}></Button>
            </View>
            <View style={styles.row}>
                <Button text='0' style={styles.zeroButton} onPress={() => handleClick({ type: OP.NUM, payload: { value: "0" } })}></Button>
                <Button text='.' onPress={() => handleClick({ type: OP.DOT })}></Button>
                <Button text='=' type='alert' onPress={() => handleClick({ type: OP.EQ })}></Button>
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