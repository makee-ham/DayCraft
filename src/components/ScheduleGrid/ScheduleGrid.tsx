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
    <section>
      <h2>TODAY'S SCHEDULE</h2>
      <div>
        {hours.map((hour, idx) => (
          <div key={hour}>
            <div>{hour}</div>
            <input
              type="text"
              value={schedule[idx]}
              onChange={(e) => handleChange(idx, e.target.value)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
