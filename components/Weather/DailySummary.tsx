import DaySummary from "./DaySummary";

type DailySummaryProps = {
  daily: DailyWeather[];
  isMetric: boolean;
  dailyForecastView: string;
};

const DailySummary = ({
  daily = [],
  isMetric,
  dailyForecastView,
}: DailySummaryProps) => (
  <div style={{ padding: 24 }}>
    <div className="columns is-centered is-2 is-variable">
      {daily.map((day, index) => (
        <DaySummary
          key={index}
          count={daily.length}
          index={index}
          day={day}
          isMetric={isMetric}
          dailyForecastView={dailyForecastView}
        />
      ))}
    </div>
  </div>
);

export default DailySummary;
