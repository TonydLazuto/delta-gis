import { ReactNode } from "react"

export interface DanyPoste {
  poste: string
  artere_1: string
  racco_1: boolean
  artere_2: string
  racco_2: boolean
  lat: number
  long: number
  fonction: string
  adresse: string
}

export interface DanyFileData {
  Artere_1: string
  Artere_2: string
  Branche_1: string
  Branche_2: string
  Poste: string
  Racco_1: "Oui" | "Non"
  Racco_2: "Oui" | "Non"
  Adresse: string
  Fonction: string
}

export interface SIGPoste {
  poste: string
  artere_1: string
  artere_2: string
  lat: number
  long: number
  fonction: string
  adresse: string
  date_de_MEX: string
}

export interface SIGFileData {
  Poste: string
  Artere_1: string
  Artere_2: string
  Branche_1: string
  Branche_2: string
  ME_Position_lat: string
  ME_Position_long: string
  Fonction: string
  Adresse: string
  Date_de_MEX: string
}

export interface MarkerClusterGroupProps {
  children: ReactNode
  chunkedLoading: boolean
  showCoverageOnHover: boolean
  spiderfyDistanceMultiplier: number
  iconCreateFunction: (cluster: any) => any
}