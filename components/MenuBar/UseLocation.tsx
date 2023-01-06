import { LocateFixed, LocateOff, Locate } from "lucide-react";
import { useEffect, useRef, useState, Dispatch, SetStateAction } from "react";
import styled from "styled-components";

import MenuIcon from "./MenuIcon";

import useGeoPosition from "@/lib/hooks/useGeoPosition";

const Content = styled.div<{ $show: boolean }>`
  position: absolute;
  padding: 6px;
  right: -52px;
  top: 54px;
  width: max-content;
  transition: opacity 100ms ease-in-out;

  background-color: ${({ theme: { theme, colors } }) =>
    theme === "light" ? colors.greyLighter : colors.blackTer};
  border-radius: 8px;
  opacity: ${({ $show }) => ($show ? 1 : 0)};

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.container}px) {
    right: -44px;
  }
`;

const IconContainer = styled.div<{
  $error: GeolocationPositionError;
  $latitude: number;
  $longitude: number;
  $latLon: [number, number];
}>`
  display: flex;

  cursor: ${({ $error, $latitude, $longitude, $latLon }) => {
    if ($error) return "not-allowed";

    if (
      !hasSameLatLon({
        latitude: $latitude,
        longitude: $longitude,
        latLon: $latLon,
      })
    ) {
      return "pointer";
    }

    return "default";
  }};
  color: ${({ $error, theme: { theme, themes, colors } }) =>
    $error ? colors.grey : theme === "light" ? themes.dark : themes.light};
`;

type UseLocationProps = {
  setLatLon: Dispatch<SetStateAction<[number, number]>>;
  setCity: Dispatch<SetStateAction<City>>;
  latLon: [number, number];
};

const hasSameLatLon = ({
  latitude,
  longitude,
  latLon,
}: {
  latitude: number;
  longitude: number;
  latLon: [number, number];
}) =>
  latLon?.length == 2 &&
  latitude &&
  longitude &&
  latitude === latLon[1] &&
  longitude === latLon[0];

const getMessage = ({
  error,
  latitude,
  longitude,
  latLon,
}: {
  error: GeolocationPositionError;
  latitude: number;
  longitude: number;
  latLon: [number, number];
}) => {
  if (error) return "location blocked";

  if (hasSameLatLon({ latitude, longitude, latLon })) {
    return "using your location";
  }

  return "use your location";
};

const UseLocation = ({ setLatLon, setCity, latLon }: UseLocationProps) => {
  const iconRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [fetchGeo, setFetchGeo] = useState(false);
  const { latitude, longitude, error } = useGeoPosition(fetchGeo);

  useEffect(() => {
    if (latitude && longitude) {
      setLatLon([longitude, latitude]);
      setCity(null);
    }
  }, [latitude, longitude, setLatLon, setCity]);

  return (
    <MenuIcon ref={iconRef} style={{ position: "relative" }}>
      <IconContainer
        $error={error}
        $latitude={latitude}
        $longitude={longitude}
        $latLon={latLon}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => {
          if (
            latitude &&
            longitude &&
            !hasSameLatLon({ latitude, longitude, latLon })
          ) {
            setLatLon([longitude, latitude]);
            setCity(null);
          } else {
            setFetchGeo(true);
          }
        }}
      >
        {error ? (
          <LocateOff />
        ) : latitude && longitude ? (
          <LocateFixed />
        ) : (
          <Locate />
        )}
      </IconContainer>
      <Content $show={isOpen}>
        {getMessage({ error, latitude, longitude, latLon })}
      </Content>
    </MenuIcon>
  );
};

export default UseLocation;
