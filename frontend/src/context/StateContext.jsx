import { createContext, useContext, useState } from "react"

const StateContext = createContext({
    token: null,
    setToken: () => {}
});

const StateContextProvider = ({children}) => {
    const [token, _setToken] = useState(sessionStorage.getItem('token'))

    const setToken = (token) => {
        _setToken(token)

        if (token) {
            sessionStorage.setItem('token', token)
        } else{
            sessionStorage.removeItem('token')
        }
    }

    return (
        <StateContext.Provider value={{ token, setToken }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);
export default StateContextProvider;
