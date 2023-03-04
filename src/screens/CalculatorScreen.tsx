import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Button } from '../components/Button'
import { globalStyles } from '../themes/shared/main'

export const CalculatorScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={globalStyles.secondaryText}>15,000</Text>
            <Text style={globalStyles.primaryText}>15,000</Text>
            <View style={styles.row}>
                <Button text='C' type='secondary'></Button>
                <Button text='+/-' type='secondary'></Button>
                <Button text='del' type='secondary'></Button>
                <Button text='/' type='alert'></Button>
            </View>
            <View style={styles.row}>
                <Button text='7'></Button>
                <Button text='8'></Button>
                <Button text='9'></Button>
                <Button text='X' type='alert'></Button>
            </View>
            <View style={styles.row}>
                <Button text='4'></Button>
                <Button text='5'></Button>
                <Button text='6'></Button>
                <Button text='-' type='alert'></Button>
            </View>
            <View style={styles.row}>
                <Button text='1'></Button>
                <Button text='2'></Button>
                <Button text='3'></Button>
                <Button text='+' type='alert'></Button>
            </View>
            <View style={styles.row}>
                <Button text='0' style={styles.zeroButton}></Button>
                <Button text='.'></Button>
                <Button text='=' type='alert'></Button>
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