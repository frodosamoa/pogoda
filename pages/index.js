import useGeoPosition from "../lib/useGeoPosition";

export default function Home() {
  const state = useGeoPosition();

  if (state.error) {
    return <div>{state.error.message}</div>;
  }

  return (
    <div>
      Hello! You are located at {state.latitude}, {state.longitude}
    </div>
  );
}
