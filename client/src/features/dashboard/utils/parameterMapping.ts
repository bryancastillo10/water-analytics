import { Drop, Cube, Flask, Microscope, type Icon } from "@phosphor-icons/react"

export const parameterRecord: Record<string, string> = {
  "pH": "pH",
  "Total Suspended Solids": "suspendedSolids",
  "Total COD": "totalCOD",
  "Fecal Coliform": "fecalColiform",
  "Temperature": "temperature",
  "Dissolved Oxygen": "dissolvedOxygen",
  "Ammonia as N": "ammonia",
  "Nitrates as N": "nitrates",
  "Phosphates as P": "phosphates"
};


export const parameterIcons: Record<string, Icon> = {
    "pH Level": Drop,
    "Avg Suspended Solids": Cube,
    "Avg Total COD": Flask,
    "Fecal Coliform": Microscope
}