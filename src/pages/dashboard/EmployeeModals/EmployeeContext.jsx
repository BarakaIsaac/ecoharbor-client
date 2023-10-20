import {createContext, useContext, useState} from "react";


export const EmployeeContext = createContext();

export function useEmployee() {

    return useContext(EmployeeContext);
}

export function EmployeeProvider({children}) {
    const {currentEmployee, setCurrentEmployee} = useState(null);
    
    return (
        <EmployeeContext.Provider value={{currentEmployee, setCurrentEmployee}}>
            {children}
        </EmployeeContext.Provider>
    )
} 