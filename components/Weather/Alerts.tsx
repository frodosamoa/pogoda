import styled from "styled-components";
import chroma from "chroma-js";
import { useState } from "react";
import { AlertTriangle } from "lucide-react";

import { WeatherItemTitle } from "./WeatherItem";

type AlertsProps = {
  alerts: Alert[];
};

const Container = styled.div`
  grid-column: 1 / 3;
  grid-row: 1 / 2;
  padding: 8px;
  border-radius: 8px;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;

  background-color: ${({ theme: { theme, colors } }) =>
    theme === "dark"
      ? chroma(colors.whiteTer).alpha(0.3).css()
      : chroma(colors.greyDark).alpha(0.2).css()};

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.tablet}px) {
    grid-column: 1 / 3;
  }

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.mobile}px) {
    grid-column: 1 / 3;
  }
`;

const Sender = styled.div`
  text-align: start;
  font-size: ${({ theme }) => theme.fontSizes[9]};
`;

const Alert = styled.p`
  text-align: start;
  font-size: ${({ theme }) => theme.fontSizes[7]};
`;

const Pagination = styled.div`
  position: absolute;
  bottom: 8px;
  right: 8px;
  cursor: pointer;
  user-select: none;
`;

const Alerts = ({ alerts = [] }: AlertsProps) => {
  const [alertIndex, setAlertIndex] = useState(0);

  if (alerts.length === 0) return null;

  const alert = alerts[alertIndex];

  return (
    <Container>
      <WeatherItemTitle Icon={AlertTriangle} title={alert.event} />
      <Alert>
        {alert.event} until {alert.end}.
      </Alert>
      <Sender>{alert.senderName}</Sender>
      {alerts.length > 1 && (
        <Pagination
          onClick={() => setAlertIndex((alertIndex + 1) % alerts.length)}
        >
          {alertIndex + 1}/{alerts.length}
        </Pagination>
      )}
    </Container>
  );
};

export default Alerts;
