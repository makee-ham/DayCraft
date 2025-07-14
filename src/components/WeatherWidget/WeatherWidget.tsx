import useWeather from "@/hooks/useWeather";

export default function WeatherWidget() {
  const { data, loading, error } = useWeather();

  const weatherMain = data?.weather[0].main;
  const weatherDescription = data?.weather[0].description;
  const icon =
    "https://openweathermap.org/img/wn/" + data?.weather[0].icon + ".png";
  const temp = data?.main.temp;
  const feelsLike = data?.main.feels_like;

  return (
    <section className="w-full max-w-sm">
      <h2
        className="text-lg font-bold text-center py-2 bg-primary text-primary-content"
        style={{
          borderTopLeftRadius: "var(--radius-box)",
          borderTopRightRadius: "var(--radius-box)",
        }}
      >
        WEATHER NOW
      </h2>
      <div
        className="overflow-hidden border border-base-300 bg-base-100 p-4 text-center"
        style={{
          borderBottomLeftRadius: "var(--radius-box)",
          borderBottomRightRadius: "var(--radius-box)",
        }}
      >
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <p className="loading loading-lg loading-spinner text-primary" />
          </div>
        ) : error ? (
          <p className="text-error bg-error-content bg-opacity-10 p-2 rounded">
            Error: {error}
          </p>
        ) : (
          <>
            <p className="text-2xl font-bold text-base-content">
              {temp?.toFixed(1)}°C
            </p>
            <p className="text-lg font-semibold text-base-content/90">
              {weatherMain}
            </p>
            <img src={icon} alt={weatherDescription} className="mx-auto w-20" />
            <p className="text-sm text-base-content/70">{weatherDescription}</p>
            <p className="text-sm text-base-content/70">
              feels like {feelsLike?.toFixed(1)}°C
            </p>
          </>
        )}
      </div>
    </section>
  );
}
