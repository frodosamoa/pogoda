import styled from "styled-components";
import { Loader as LoaderIcon } from "react-feather";

import { rotate } from "../constants/animations";

const StyledLoaderIcon = styled(LoaderIcon)`
  animation: 1.5s linear 200ms infinite normal forwards running ${rotate};
`;

const Loader = () => <StyledLoaderIcon size={36} />;

export default Loader;
