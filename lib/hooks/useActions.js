import { useMemo } from "react";

const useActions = (reducer, mapDispatchToActions) => {
  const [, dispatch] = reducer;
  const actions = useMemo(() => mapDispatchToActions(dispatch), [dispatch]);
  return actions;
};

export default useActions;
