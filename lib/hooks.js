import { useMemo } from "react";

export const useActions = (reducer, mapDispatchToActions) => {
  const [, dispatch] = reducer;
  const actions = useMemo(() => mapDispatchToActions(dispatch), [dispatch]);
  return actions;
};

export const useSelectors = (reducer, mapStateToSelectors) => {
  const [state] = reducer;
  const selectors = useMemo(() => mapStateToSelectors(state), [state]);
  return selectors;
};
