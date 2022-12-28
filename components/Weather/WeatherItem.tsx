import chroma from "chroma-js";
import styled from "styled-components";
import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

const Container = styled.div`
  padding: 8px;
  border-radius: 8px;
  position: relative;

  background-color: ${({ theme: { theme, colors } }) =>
    theme === "dark"
      ? chroma(colors.whiteTer).alpha(0.3).css()
      : chroma(colors.greyDark).alpha(0.2).css()};
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
  font-weight: 500;
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
};

const WeatherItem = ({ title, Icon, children }: WeatherItemProps) => (
  <Container>
    <WeatherItemTitle Icon={Icon} title={title} />
    {children}
  </Container>
);

export default WeatherItem;
