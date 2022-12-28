import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: end;
  flex-direction: column;
`;

const Paragraph = styled.p`
  font-size: ${({ theme }) => theme.fontSizes[7]};
`;

const Link = styled.a`
  text-decoration: underline;
  color: ${({ theme: { theme, themes } }) =>
    theme === "light" ? themes.dark : themes.light};

  transition: color 150ms ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.colors.grey};
  }
`;

const MadeBy = () => (
  <Container>
    {/* <Paragraph>
      code available on{" "}
      <Link
        target="_blank"
        rel="noreferrer"
        href={"https://www.github.com/frodosamoa/pogoda"}
      >
        GitHub
      </Link>
    </Paragraph> */}
    <Paragraph>
      made by{" "}
      <Link
        target="_blank"
        rel="noreferrer"
        href={"https://www.andrewkowalczyk.com"}
      >
        Andrew Kowalczyk
      </Link>
    </Paragraph>
  </Container>
);

export default MadeBy;
