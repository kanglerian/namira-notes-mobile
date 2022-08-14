import { Appearance } from "react-native";

var colorStyle = {
    container: {
        backgroundColor: '',
        set bg(bg) {
            this.backgroundColor = bg;
        }
    },
    listContainer: {
        width: 350,
        alignSelf: 'center',
        paddingVertical: 10,
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: '',
        set bg(bg) {
            this.backgroundColor = bg;
        },
    },
    inputBar: {
        backgroundColor: '',
        width: 350,
        paddingLeft: 15,
        borderRadius: 10,
        set bg(bg) {
            this.backgroundColor = bg;
        }
    },
    resultBar: {
        backgroundColor: '',
        borderRadius: 10,
        paddingVertical: 10,
        width: 350,
        marginVertical: 5,
        set bg(bg) {
            this.backgroundColor = bg;
        }
    },
    animaCont: {
        width: 200,
        height: 200,
        alignSelf: 'center'
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16
    },
    subTitle: {
        textAlign: 'center',
        fontSize: 14,
        marginVertical: 5,
    }
};

const colorScheme = Appearance.getColorScheme();

if (colorScheme === 'dark') {
    colorStyle.container.bg = '#1A202C';
    colorStyle.listContainer.bg = '#1A202C';
    colorStyle.inputBar.bg = '#2E3648';
    colorStyle.resultBar.bg = '#2E3648';
} else {
    colorStyle.container.bg = '#FFFFFF';
    colorStyle.listContainer.bg = '#FFFFFF';
    colorStyle.inputBar.bg = '#F7FAFC';
    colorStyle.resultBar.bg = '#EDF2F7';
};


export default colorStyle;