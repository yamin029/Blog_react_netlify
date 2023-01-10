import { useNavigate } from 'react-router-dom'
import { DataContext } from "./DataContext";

export const DataProvider = ({ children }) => {
  // console.log("Data provider called!")
  const navigate = useNavigate();

  return (
    <DataContext.Provider
      value={{
        navigate,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}