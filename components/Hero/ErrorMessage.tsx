import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { KeyedMutator } from "swr";
import { AlertCircle } from "lucide-react";

import { fadeIn } from "@/lib/constants/animations";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  animation: 500ms cubic-bezier(0, 0, 0.16, 1) 200ms 1 normal forwards running
    ${fadeIn};
`;

const Message = styled.div`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes[4]};
  margin-top: 16px;
  margin-bottom: 16px;
  width: 200px;
`;

type ErrorMessageProps = {
  setLatLon: Dispatch<SetStateAction<[number, number]>>;
  setWeather: KeyedMutator<WeatherResponse>;
};

const ErrorMessage = ({ setLatLon, setWeather }: ErrorMessageProps) => {
  return (
    <Container>
      <AlertCircle size={36} />
      <Message>something went wrong fetching the weather</Message>
      <div>
        <button
          className={"button is-black"}
          onClick={() => {
            setLatLon(null);
            setWeather(null);
          }}
        >
          try again
        </button>
      </div>
    </Container>
  );
};

export default ErrorMessage;
