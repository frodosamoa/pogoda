import styled from "styled-components";
import { Dispatch, SetStateAction } from "react";

import RandomCities from "./RandomCities";

import { fadeIn } from "@/lib/constants/animations";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  user-select: none;
  opacity: 0;
  animation: 500ms cubic-bezier(0, 0, 0.16, 1) 200ms 1 normal forwards running
    ${fadeIn};
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSizes[3]};
  line-height: 1;
`;

const AppName = styled.span`
  font-weight: 700;
`;

const Subtitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes[5]};
  line-height: 1;
  margin-top: 16px;
`;

const Emphasis = styled.span`
  font-weight: 500;
`;

const Message = styled.div`
  font-size: ${({ theme }) => theme.fontSizes[6]};
  margin-top: 16px;
`;

type WelcomeMessageProps = {
  setLatLon: Dispatch<SetStateAction<[number, number]>>;
  setCity: Dispatch<SetStateAction<City>>;
};

const WelcomeMessage = ({ setLatLon, setCity }: WelcomeMessageProps) => (
  <Container>
    <Title>
      welcome to <AppName>pogoda</AppName>
    </Title>
    <Subtitle>
      a <Emphasis>simple</Emphasis> and <Emphasis>minimal</Emphasis> weather
      dashboard
    </Subtitle>
    <Message>to get started, search for a city above</Message>
    <RandomCities setLatLon={setLatLon} setCity={setCity} />
  </Container>
);

export default WelcomeMessage;
