// check for Local Storage and GET item
export const getFromLS = (LSKey) => (
    LSKey && typeof window !== "undefined"
    && localStorage.getItem(LSKey)
    // && JSON.parse(localStorage.getItem(LSKey))
)

// check for Local Storage and SAVE item
export const saveInLS = (LSKey, data, next = () => { }) => {

    if (LSKey && typeof window !== "undefined") {
        localStorage.setItem(LSKey, data)
        next();
    }
}

// check for Local Storage and REMOVE item
export const removeFromLS = (LSKey, next = () => { }) => {
    LSKey && typeof window !== "undefined"
        && localStorage.getItem(LSKey)
        && localStorage.removeItem(LSKey) && next()
}

// check for Local Storage and CLEAR
export const clearLS = (next = () => { }) => {
    if (typeof window !== "undefined") {
        localStorage.clear();
        next();
    }
}

