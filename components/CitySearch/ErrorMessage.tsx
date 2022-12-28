import styled from "styled-components";
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
  font-size: ${({ theme }) => theme.fontSizes[6]};
  margin-top: 16px;
  margin-bottom: 16px;
  width: 200px;
`;

type ErrorMessageProps = {
  onError: () => void;
};

const ErrorMessage = ({ onError }: ErrorMessageProps) => (
  <Container>
    <AlertCircle size={24} />
    <Message>something went wrong searching for cities</Message>
    <div>
      <button className={"button is-black is-small"} onClick={() => onError()}>
        try again
      </button>
    </div>
  </Container>
);

export default ErrorMessage;
