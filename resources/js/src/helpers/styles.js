/* 
    All functions that will help to style common components via theme.
*/
var Color = require('color');

/* 
    @params: {
        property:{
            @type : String,
            @description: Name of the props. E.g color
        },
        mapping:{
            @type : Object,
            @description: Values of style as per key. E.g { "success": "green" }
        },
        props: will be used by MUI withStyle.
    }

    Usage:-

    const styles = {
        color:styledBy('color', { "success": "green" })
    }

    <Compnent color="success"/>
*/

export const styledBy = (property, mapping) => (props) => mapping[props[property]];

/* 
    Reference : https://www.npmjs.com/package/color
    @params:{
        color : color in rgba , hex or hsl as a String.
    }
*/
export const colorManipulator = (color) => { return (color ? (new Color(color)) : null) }
/* 
    @params:{
        propString : any propString
        cssString: any css property propString with variable name.

    @return : propString assigned css
        ?Usage: (240,'calc(100% - |drawerWidth|px)')
        Result: calc(100% - 240px)
    }

    !NOTE : propString must be |propString| as @cssValue;
*/
export const createCSSValue = (propString, cssString = "") => (props) => {

    if (cssString && cssString.length) {
        var regex = /\|(.*?)\|/g;
        return cssString.replace(regex, props[propString]);
    }

    return props[propString];
}

export const fadeAscentColor = (theme, fade = 0.85) => ({ ascent }) => {

    let color = theme.palette.ascents[ascent];

    if (color) {
        return ((colorManipulator(color)).fade(fade).string());
    }
}

export const fadeColor = (color, fade = 0.85) => {
    if (color) {
        return ((colorManipulator(color)).fade(fade).string());
    }
}

export const lightenColor = (color, alpha = 0.85) => {
    if (color) {
        return ((colorManipulator(color)).lighten(alpha).string());
    }
}

export const darkenColor = (color, alpha = 0.85) => {
    if (color) {
        return ((colorManipulator(color)).darken(alpha).string());
    }
}
