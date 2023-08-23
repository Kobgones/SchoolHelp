import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import useLocalStorage from "../hooks/useLocalStorage";

const CurrentClubContext = createContext();

export default CurrentClubContext;

/* We save the clubs informations with his token in the localstoage */
export function CurrentClubProvider({ children }) {
  const [clubs, setClubs] = useLocalStorage("club", {});

  return (
    <CurrentClubContext.Provider
      /* eslint-disable react/jsx-no-constructed-context-values */
      value={{ clubs, setClubs }}
    >
      {children}
    </CurrentClubContext.Provider>
  );
}

CurrentClubProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useCurrentClubContext = () => useContext(CurrentClubContext);
