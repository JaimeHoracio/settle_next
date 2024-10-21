
export const convertStrToLower = (str: string) => {
    return str.trim().toLowerCase().trim()
}

export const comparateStrSoft = (str1: string, str2: string) => {
    return str1 === str2
}

export const comparateStrStrict = (str1: string, str2: string) => {
    return convertStrToLower(str1) === convertStrToLower(str2)
}

export const isBlank = (x: string | undefined) => {
    return x ? x === "" : true;
};
