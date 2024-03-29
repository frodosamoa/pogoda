import styled from "styled-components";
import { Loader as LoaderIcon } from "lucide-react";

import { rotate } from "@/lib/constants/animations";

const StyledLoaderIcon = styled(LoaderIcon)`
  animation: 1.5s linear 200ms infinite normal forwards running ${rotate};
`;

const Loader = () => <StyledLoaderIcon size={36} />;

export default Loader;
