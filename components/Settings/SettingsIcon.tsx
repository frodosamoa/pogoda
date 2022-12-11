import { Dispatch, SetStateAction } from "react";
import { Settings } from "react-feather";
import styled from "styled-components";

const WIDTH = 250;

type StyledSettingsProps = {
  $isSettingsOpen: boolean;
};

const StyledSettings = styled(Settings)<StyledSettingsProps>`
  position: fixed;
  bottom: 24px;
  right: 24px;
  cursor: pointer;
  transform: translateX(
      -${({ $isSettingsOpen }) => ($isSettingsOpen ? WIDTH : 0)}px
    )
    rotate(${({ $isSettingsOpen }) => ($isSettingsOpen ? 0 : 90)}deg);
  transition: transform 400ms ease-out;
`;

type SettingsIconProps = {
  isSettingsOpen: boolean;
  setIsSettingsOpen: Dispatch<SetStateAction<boolean>>;
};

const SettingsIcon = ({
  setIsSettingsOpen,
  isSettingsOpen,
}: SettingsIconProps) => (
  <StyledSettings
    size={42}
    onClick={() => setIsSettingsOpen(!isSettingsOpen)}
    $isSettingsOpen={isSettingsOpen}
  />
);

export default SettingsIcon;
