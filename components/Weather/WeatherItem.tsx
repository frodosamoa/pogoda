import chroma from "chroma-js";
import styled from "styled-components";
import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

import { fadeIn } from "../../lib/constants/animations";

const Container = styled.div<{ $animationDelay: number }>`
  padding: 8px;
  border-radius: 8px;
  opacity: 0;
  position: relative;

  background-color: ${({ theme: { theme, colors } }) =>
    theme === "dark"
      ? chroma(colors.whiteTer).alpha(0.3).css()
      : chroma(colors.greyDark).alpha(0.2).css()};
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

type WeatherItemTitleProps = {
  title: string;
  Icon: LucideIcon;
};

export const WeatherItemTitle = ({ title, Icon }: WeatherItemTitleProps) => {
  const StyledIcon = withIconStyles(Icon);
  return (
    <TitleContainer>
      <StyledIcon />
      <Title>{title}</Title>
    </TitleContainer>
  );
};

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
}: WeatherItemProps) => (
  <Container $animationDelay={$animationDelay}>
    <WeatherItemTitle Icon={Icon} title={title} />
    {children}
  </Container>
);

export default WeatherItem;
