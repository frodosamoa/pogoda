import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: end;
  flex-direction: column;
`;

const Paragraph = styled.p`
  font-size: ${({ theme }) => theme.fontSizes[7]};
`;

const MadeBy = () => (
  <Container>
    <Paragraph>
      code available on{" "}
      <a
        className="has-text-light is-underlined"
        target="_blank"
        rel="noreferrer"
        href={"https://www.github.com/frodosamoa/pogoda"}
      >
        GitHub
      </a>
    </Paragraph>
    <Paragraph>
      made by{" "}
      <a
        className="has-text-light is-underlined"
        target="_blank"
        rel="noreferrer"
        href={"https://www.andrewkowalczyk.com"}
      >
        Andrew Kowalczyk
      </a>
    </Paragraph>
  </Container>
);

export default MadeBy;
