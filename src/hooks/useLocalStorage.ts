import { useState } from "react";

export default function useLocalStorage<InitialValue>(key: string, defaultInitialValue: InitialValue) {
    const storedValue = localStorage.getItem(key)
    const initialValue = storedValue ? JSON.parse(storedValue) : defaultInitialValue
    const [value, setValue] = useState(initialValue)

    function updateLocalStorage(newValue: any) {
        setValue(newValue)
        localStorage.setItem(key, JSON.stringify(newValue))
    }

    function deleteLocalStorage() {
        setValue(null)
        localStorage.removeItem(key)
    }

    return [value, updateLocalStorage, deleteLocalStorage]
}