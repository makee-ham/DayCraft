import { useState } from "react";

export default function ScheduleGrid() {
  const hours: string[] = Array.from({ length: 24 }, (_, i) => {
    const hour = (i + 5) % 24;
    return `${String(hour).padStart(2, "0")}:00`;
  });

  const [schedule, setSchedule] = useState<string[]>(Array(24).fill(""));

  const handleChange = (idx: number, value: string) => {
    setSchedule((prev) => {
      const updated = [...prev];
      updated[idx] = value;
      return updated;
    });
  };

  return (
    <section className="w-full max-w-sm">
      <h2
        className="text-lg font-bold text-center py-2 bg-primary text-primary-content"
        style={{
          borderTopLeftRadius: "var(--radius-box)",
          borderTopRightRadius: "var(--radius-box)",
        }}
      >
        TODAY&apos;S SCHEDULE
      </h2>
      <div
        className="overflow-hidden border border-base-300 bg-base-100"
        style={{
          borderBottomLeftRadius: "var(--radius-box)",
          borderBottomRightRadius: "var(--radius-box)",
        }}
      >
        {hours.map((hour, idx) => (
          <div
            key={hour}
            className="grid grid-cols-[60px_1fr] border-b border-b-base-300"
          >
            <div className="text-sm text-center text-base-content py-2 border-r border-r-base-300">
              {hour}
            </div>
            <input
              type="text"
              className="py-2 px-2 text-sm text-base-content w-full outline-none bg-transparent"
              value={schedule[idx]}
              onChange={(e) => handleChange(idx, e.target.value)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
