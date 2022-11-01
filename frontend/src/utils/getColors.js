/**
 * 
 * @param {String} color 
 * @returns {{primary: string, 
 *           secondary: string, 
 *           btnColor: string, 
 *           text: string, 
 *           btnText: string}}
 */
export const getColors = (color) => {
    return {
        primary: `brand.${color}.primary`,
        secondary: `brand.${color}.secondary`,
        btnColor: `brand.${color}.button`,
        text: `brand.${color}.text`,
        btnText: `brand.${color}.btnText`
    }
}