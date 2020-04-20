import { useMemo, useState } from "react";

const useSelectors = (reducer, mapStateToSelectors) => {
  const [state] = reducer;
  const selectors = useMemo(() => mapStateToSelectors(state), [state]);
  return selectors;
};

export default useSelectors;
