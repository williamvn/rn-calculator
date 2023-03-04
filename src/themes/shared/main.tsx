import { StyleSheet } from 'react-native'

const buttonCommonStyle = StyleSheet.create({
    button: {
        width: 80,
        height: 80,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 25,
        fontWeight: "bold"
    }
});

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    appColor: {
        backgroundColor: 'black'
    },
    // text
    primaryText: {
        color: 'white',
        fontSize: 60
    },
    secondaryText: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: 30
    },
    //
    //Buttons
    primaryButton: {
        ...buttonCommonStyle.button,
        backgroundColor: '#313332'
    },
    secondaryButton: {
        ...buttonCommonStyle.button,
        backgroundColor: 'gray'
    },
    alertButton: {
        ...buttonCommonStyle.button,
        backgroundColor: 'orange'
    },
    primaryTextButton: {
        color: 'white',
        fontSize: 25,
        fontWeight: "bold"
    },
    secondaryTextButton: {
        color: 'black',
        fontSize: 25,
        fontWeight: "bold"
    },
    // Boxing
    row: {
        flexDirection: 'row',
    }
});

