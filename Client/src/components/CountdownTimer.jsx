import Countdown from "react-countdown";

const renderer = ({ days, hours, minutes, seconds }) => (
  <div className="flex space-x-2">
    {[
      { value: days, label: "Days" },
      { value: hours, label: "Hour" },
      { value: minutes, label: "Min" },
      { value: seconds, label: "Sec" },
    ].map((item, index) => (
      <div
        key={index}
        className="bg-gray-800 text-white text-center py-2 px-3 rounded-lg w-12"
      >
        <span className="text-lg font-semibold">
          {item.value.toString().padStart(2, "0")}
        </span>
        <div className="text-xs">{item.label}</div>
      </div>
    ))}
  </div>
);

const countdownDate =
  Date.now() +
  4 * 24 * 60 * 60 * 1000 +
  13 * 60 * 60 * 1000 +
  34 * 60 * 1000 +
  56 * 1000;

const CountdownTimer = () => {
  return <Countdown date={countdownDate} renderer={renderer} />;
};

export default CountdownTimer;
