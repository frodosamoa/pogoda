import chroma from "chroma-js";
import classNames from "classnames";
import { Dispatch, SetStateAction } from "react";
import { X } from "lucide-react";
import styled from "styled-components";

import { fadeIn } from "@/lib/constants/animations";

const Modal = styled.div`
  opacity: 0;
  animation: 200ms cubic-bezier(0, 0, 0.16, 1) 200ms 1 normal forwards running
    ${fadeIn};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
  max-width: 450px;
  z-index: 1;
  padding: 16px 24px 24px 24px;
  margin: 8px;
  border-radius: 8px;
  position: relative;
  background-color: ${({ theme: { theme, themes } }) => themes[theme]};
  color: ${({ theme: { themes, theme } }) =>
    theme === "light" ? themes.dark : themes.light};
`;

const TitleContainer = styled.div`
  height: 80px;
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSizes[4]};
  font-weight: 700;
`;

const Subtitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes[6]};
`;

const ModalBackground = styled.div`
  background-color: ${({ theme: { colors } }) =>
    chroma(colors.blackBis).alpha(0.5).css()};
`;

const MadeBy = styled.p`
  position: absolute;
  bottom: 16px;
  left: 16px;
  font-size: ${({ theme }) => theme.fontSizes[7]};
`;

const Feedback = styled.p`
  position: absolute;
  bottom: 16px;
  right: 16px;
  font-size: ${({ theme }) => theme.fontSizes[7]};
`;
const AppName = styled.span`
  font-weight: 700;
`;

const HR = styled.hr`
  background-color: ${({ theme: { colors } }) => colors.grey};
  margin: 8px -8px;
`;

const ContentContainer = styled.div`
  height: calc(100% - 100px);
  overflow: scroll;
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

const StyledX = styled(X)`
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
`;

type InfoModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const InfoModal = ({ isModalOpen, setIsModalOpen }: InfoModalProps) => (
  <Modal className={classNames("modal", isModalOpen && "is-active")}>
    <ModalBackground
      className="modal-background"
      onClick={() => setIsModalOpen(false)}
    />
    <Container>
      <StyledX onClick={() => setIsModalOpen(false)} />
      <TitleContainer>
        <Title>pogoda</Title>
        <Subtitle>weather dashboard</Subtitle>
        <HR />
      </TitleContainer>
      <ContentContainer>
        <p style={{ marginTop: 16 }}>
          <AppName>pogoda</AppName> is weather dashboard made with the following
          modern web technologies:{" "}
          <Link target="_blank" rel="noreferrer" href="https://reactjs.org/">
            React.js
          </Link>
          ,{" "}
          <Link target="_blank" rel="noreferrer" href="https://nextjs.org/">
            Next.js
          </Link>
          ,{" "}
          <Link
            target="_blank"
            rel="noreferrer"
            href="https://www.typescriptlang.org/"
          >
            TypeScript
          </Link>
          ,{" "}
          <Link target="_blank" rel="noreferrer" href="https://www.prisma.io/">
            Prisma
          </Link>
          ,{" "}
          <Link
            target="_blank"
            rel="noreferrer"
            href="https://www.postgresql.org/"
          >
            PostgresQL
          </Link>
          , and{" "}
          <Link
            target="_blank"
            rel="noreferrer"
            href="https://styled-components.com/"
          >
            styled-components
          </Link>
          . taking inspiration from other weather dashboard applications,{" "}
          <AppName>pogoda</AppName> aims for a minimal, simple, and flat UI.
        </p>
        <br />
        <p>
          it is responsive at different screen widths. it is customizable, and
          will remember any settings you change. you can also choose to use your
          current location. it isn&apos;t stored if you do!
        </p>
        <br />
        <p>
          the weather data comes from{" "}
          <Link
            target="_blank"
            rel="noreferrer"
            href="https://openweathermap.org/"
          >
            OpenWeather
          </Link>
          .
        </p>
        <br />
        <p>
          the city information resides in a PostgreSQL database located on{" "}
          <Link target="_blank" rel="noreferrer" href="https://supabase.com/">
            Supabase
          </Link>
          . the dataset comes from an npm packacge which contains a list of
          138,938 cities in the world with a population of at least 1000
          inhabitants.
        </p>
        <br />
        <p style={{ marginBottom: 48 }}>
          as for the name of the application, <AppName>pogoda</AppName> means
          weather{" "}
          <Link
            target="_blank"
            rel="noreferrer"
            href="https://translate.google.com/?sl=en&tl=pl&text=weather&op=translate"
          >
            in Polish
          </Link>
          .
        </p>
      </ContentContainer>
      <MadeBy>
        made by{" "}
        <Link
          target="_blank"
          rel="noreferrer"
          href="https://www.andrewkowalczyk.com"
        >
          Andrew Kowalczyk
        </Link>
      </MadeBy>
      <Feedback>
        feedback? email me{" "}
        <Link
          target="_blank"
          rel="noreferrer"
          href="mailto:andrewrkowalczyk@gmail.com"
        >
          here
        </Link>
      </Feedback>
    </Container>
  </Modal>
);

export default InfoModal;
