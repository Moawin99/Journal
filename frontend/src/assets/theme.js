import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    colors: {
        brand: {
            yellow: {
                "primary": "#fde372",
                "secondary": "#f7b71e",
                "button": "#36205A",
                "btnText": 'white',
                "text": "black"
            },
            red: {
                "primary": "#e11f1a",
                "secondary": "#ff7975",
                "button": "#021426",
                "btnText": 'white',
                "text": "white"
            },
            blue: {
                "primary": "#61BBE5",
                "secondary": "#96D2EE",
                "button": "#eeb6a9",
                "btnText": 'black',
                "text": "black"
            },
            green: {
                "primary": "#38a169",
                "secondary": "#86D5AB",
                "button": "#b35253",
                "btnText": 'white',
                "text": "white"
            },
            gray: {
                "primary": "#8387b3",
                "secondary": "#B3B6D0",
                "button": "#404363",
                "btnText": 'white',
                "text": "black"
            }
        }
    }
});

export default theme;