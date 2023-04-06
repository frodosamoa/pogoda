import styled from "styled-components";
import { Dispatch, SetStateAction } from "react";

import { fadeIn } from "@/lib/constants/animations";
import useRandomCities from "@/lib/hooks/useRandomCities";

const RandomCitiesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  height: 160px;
  margin-top: 32px;

  opacity: 0;
  animation: 500ms cubic-bezier(0, 0, 0.16, 1) 5000ms 1 normal forwards running
    ${fadeIn};
`;

const RandomCity = styled.div`
  flex: 1;
  padding: 4px;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${({ theme: { theme, colors } }) =>
    theme === "light" ? colors.greyLighter : colors.blackTer};
`;

const Message = styled.div`
  font-size: ${({ theme }) => theme.fontSizes[6]};
  margin-top: 16px;
`;

type RandomCitiesProps = {
  setLatLon: Dispatch<SetStateAction<[number, number]>>;
  setCity: Dispatch<SetStateAction<City>>;
};

const RandomCities = ({ setLatLon, setCity }: RandomCitiesProps) => {
  const { data: randomCities, error } = useRandomCities();

  if (error) return null;

  return (
    <RandomCitiesContainer>
      <Message>or view the weather in one of these cities</Message>
      {randomCities?.map((rc) => (
        <RandomCity
          key={rc.cityId}
          onClick={() => {
            setLatLon([rc.latitude, rc.longitude]);
            setCity(rc);
          }}
        >
          {rc.name}, {rc.administrativeName ? `${rc.administrativeName}, ` : ""}
          {rc.countryName}
        </RandomCity>
      ))}
    </RandomCitiesContainer>
  );
};

export default RandomCities;
