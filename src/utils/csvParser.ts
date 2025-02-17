import Papa from "papaparse";
import {
  DanyFileData,
  DanyPoste,
  SIGFileData,
  SIGPoste,
} from "../interfaces/interfaces";
import axios, { AxiosError } from "axios";

export const getCsv = (csvFile: string): Promise<[]> => {
  // console.log("csvFile:", csvFile);
  return new Promise((resolve, reject) => {
    Papa.parse(csvFile, {
      download: true,
      skipEmptyLines: true,
      header: true,
      complete: (result) => {
        resolve(result.data as []);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};

const printErrorApiAdresseResponse = (error: unknown) => {
  const { code } = error as AxiosError;
    if (code === 'ERR_NETWORK') {
      console.error('https://api-adresse.data.gouv.fr is not reachable right now');
    }
    else {
      console.error("Error fetching address data:", error);
    }
}

export const geocode = async (
  adresse: string
): Promise<[number, number]> => {
  if (!adresse) {
    return [0, 0];
  }
  /**
   * TODO: add *postCode* to apiUrl to restrict the search
   * curl "https://api-adresse.data.gouv.fr/search/?q=8+bd+du+port&postcode=44380"
   */
  const cleanAdresse = adresse.replace(/ /g, "+").replace(/,/g, "");
  const apiUrl =
    "https://api-adresse.data.gouv.fr/search/?q=" + cleanAdresse + "&limit=15";
  // console.log("apiUrl:", apiUrl);
  let response = null;
  try {
    response = await axios.get(apiUrl);
  } catch (error) {
    printErrorApiAdresseResponse(error);
    return [0, 0];
  }
  const long = response.data.features[0].geometry.coordinates[0];
  const lat = response.data.features[0].geometry.coordinates[1];
  return [lat, long];
};

export const getDanyPosts = async (): Promise<DanyPoste[]> => {
  const dany: DanyFileData[] = await getCsv("csv/Dany.csv");
  const postes: DanyPoste[] = await Promise.all(
    dany.map(async (element) => {
      try {
        const [lat, long] = await geocode(element?.Adresse);
        return {
          poste: element.Poste,
          artere_1: element?.Artere_1 + element?.Branche_1,
          racco_1: element.Racco_1 === "Oui" ? true : false,
          artere_2: element?.Artere_2 + element?.Branche_2,
          racco_2: element.Racco_2 === "Oui" ? true : false,
          lat: lat,
          long: long,
          fonction: element.Fonction,
          adresse: element.Adresse,
        };
      }
      catch (error) {
        printErrorApiAdresseResponse(error);
        return {
          poste: element.Poste,
          artere_1: element?.Artere_1 + element?.Branche_1,
          racco_1: element.Racco_1 === "Oui" ? true : false,
          artere_2: element?.Artere_2 + element?.Branche_2,
          racco_2: element.Racco_2 === "Oui" ? true : false,
          lat: 0,
          long: 0,
          fonction: element.Fonction,
          adresse: element.Adresse,
        };
      }
    })
  );
  return postes;
};

export const getSIGPosts = async (): Promise<SIGPoste[]> => {
  const SIG: SIGFileData[] = await getCsv("csv/SIG.csv");
  const postes: SIGPoste[] = SIG.map((element) => {
    const curLat = element.ME_Position_lat
      ? parseFloat(element.ME_Position_lat).toFixed(6)
      : "0";
    const curLong = element.ME_Position_long
      ? parseFloat(element.ME_Position_long).toFixed(6)
      : "0";
    return {
      poste: element.Poste,
      artere_1: element?.Artere_1 + element?.Branche_1,
      artere_2: element?.Artere_2 + element?.Branche_2,
      lat: parseFloat(curLat),
      long: parseFloat(curLong),
      fonction: element.Fonction,
      adresse: element.Adresse,
      date_de_MEX: element.Date_de_MEX,
    };
  });
  return postes;
};
