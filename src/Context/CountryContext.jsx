import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { COUNTRIES } from "../Api/Api";



export const Countries = createContext();

export default function CountryContext({ children }) {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .post(`${COUNTRIES}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log(res.data);
        setCountries(res.data.result);
        // setCountriesNames(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // console.log(countries);

  return (
    <Countries.Provider value={{ countries }}>
      {children}
    </Countries.Provider>
  );
}
