import styled, { keyframes } from "styled-components";
import { Loader as LoaderIcon } from "react-feather";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const StyledLoaderIcon = styled(LoaderIcon)`
  animation: 1.5s linear 200ms infinite normal forwards running ${rotate};
`;

const Loader = () => <StyledLoaderIcon size={36} />;

export default Loader;
