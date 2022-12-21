import chroma from "chroma-js";
import styled from "styled-components";
import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { fadeIn } from "../../lib/constants/animations";

const Container = styled.div<{ $animationDelay: number }>`
  padding: 8px;
  border-radius: 8px;
  opacity: 0;

  background-color: ${({ theme: { theme, colors } }) =>
    theme === "yellow" || theme === "light"
      ? chroma(colors.greyDark).alpha(0.3).css()
      : chroma(colors.whiteTer).alpha(0.3).css()};
  animation: 500ms cubic-bezier(0, 0, 0.16, 1) 200ms 1 normal forwards running
    ${fadeIn};
  animation-delay: ${({ $animationDelay = 200 }) => $animationDelay}ms;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;

const Title = styled.div`
  text-align: start;
  font-size: ${({ theme }) => theme.fontSizes[7]};
  text-transform: uppercase;
  letter-spacing: 1px;
  white-space: nowrap;
  overflow: hidden;
`;

function withIconStyles<T>(Component: React.ComponentType<T>) {
  return styled(Component)`
    margin-right: 6px;
    width: ${({ theme }) => theme.fontSizes[7]};
    height: ${({ theme }) => theme.fontSizes[7]};
  `;
}

const ChildrenContainer = styled.p`
  text-align: start;
  font-size: ${({ theme }) => theme.fontSizes[4]};
`;

type WeatherItemProps = {
  title: string;
  children: ReactNode;
  Icon: LucideIcon;
  $animationDelay: number;
};

const WeatherItem = ({
  title,
  Icon,
  children,
  $animationDelay,
}: WeatherItemProps) => {
  const StyledIcon = withIconStyles(Icon);
  return (
    <Container $animationDelay={$animationDelay}>
      <TitleContainer>
        <StyledIcon />
        <Title>{title}</Title>
      </TitleContainer>
      <ChildrenContainer>{children}</ChildrenContainer>
    </Container>
  );
};

export default WeatherItem;
