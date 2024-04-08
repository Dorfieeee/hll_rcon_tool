import React from "react"

export const useStorageState = (key, initialState) => {
    const [value, setValue] = React.useState(
        JSON.parse(localStorage.getItem(key)) || initialState
    )
    
    React.useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value])

    return [value, setValue]
}
