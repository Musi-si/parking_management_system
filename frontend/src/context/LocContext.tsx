import React, { createContext, useContext, useEffect, useState } from 'react'
import { Loc } from '../types'
import { getLocs as getLocsAPI, addLoc as addLocAPI } from '../services/loc'

type LocContextType = {
  locs: Loc[]
  addLoc: (loc: Omit<Loc, 'id'>) => Promise<void>
}

const LocContext = createContext<LocContextType | null>(null)

export const useLoc = () => {
  const context = useContext(LocContext)
  if (!context) throw new Error('useLoc must be used within LocProvider')
  return context
}

export const LocProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locs, setLocs] = useState<Loc[]>([])

  useEffect(() => {
    const getLocs = async () => {
      const data = await getLocsAPI()
      setLocs(data)
    }
    getLocs()
  }, [])

  const addLoc = async (loc: Omit<Loc, 'id'>) => {
    const new_loc = await addLocAPI(loc)
    setLocs(prev => [...prev, new_loc])
  }

  return (
    <LocContext.Provider value={{ locs, addLoc }}>{children}</LocContext.Provider>
  )
}