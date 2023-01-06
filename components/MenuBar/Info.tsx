import { Info as InfoIcon } from "lucide-react";
import { useState } from "react";
import styled from "styled-components";

import MenuIcon from "./MenuIcon";
import InfoModal from "./InfoModal";

const StyledInfoIcon = styled(InfoIcon)`
  cursor: pointer;
`;

const Info = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <MenuIcon>
      <StyledInfoIcon onClick={() => setIsModalOpen(true)} />
      <InfoModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </MenuIcon>
  );
};

export default Info;
