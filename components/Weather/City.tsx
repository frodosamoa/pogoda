import styled from "styled-components";

import { fadeUp } from "../../lib/constants/animations";

const Container = styled.div`
  padding: 24px;
`;

const Name = styled.p`
  opacity: 0;
  font-size: ${({ theme }) => theme.fontSizes[2]};
  animation: 500ms cubic-bezier(0, 0, 0.16, 1) 200ms 1 normal forwards running
    ${fadeUp};
`;

const Administrative = styled.p`
  opacity: 0;
  font-size: ${({ theme }) => theme.fontSizes[3]};
  animation: 500ms cubic-bezier(0, 0, 0.16, 1) 200ms 1 normal forwards running
    ${fadeUp};
`;

type CityProps = {
  city?: City;
};

const City = ({ city }: CityProps) => {
  if (!city) return null;

  return (
    <Container>
      <Name>{city.name}</Name>
      <Administrative>
        {city.administrativeName ? `${city.administrativeName}, ` : ""}
        {city.countryName}
      </Administrative>
    </Container>
  );
};

export default City;
