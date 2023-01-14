import { useEffect } from "react";

const useGreeting = () => {
  useEffect(() => {
    console.log(`
      (•_•)
      ( •_•)>⌐■-■
      (⌐■_■)

      'sup.
    `);
  }, []);
};

export default useGreeting;
