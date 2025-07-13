import { moods } from "@/constants/moods";
import { useState } from "react";

export default function MoodSelector() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const handleBtnClick = (id: string) => {
    setSelectedMood((prev) => (prev === id ? null : id));
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
        MOOD
      </h2>
      <div
        className="flex justify-around items-center overflow-hidden border border-base-300 bg-base-100"
        style={{
          borderBottomLeftRadius: "var(--radius-box)",
          borderBottomRightRadius: "var(--radius-box)",
        }}
      >
        {moods.map((mood) => (
          <button
            key={mood.id}
            onClick={() => handleBtnClick(mood.id)}
            className={`flex flex-col items-center gap-1 p-2 rounded-full transition cursor-pointer ${
              selectedMood === mood.id
                ? "bg-primary text-primary-content"
                : "hover:bg-base-200"
            }`}
          >
            <mood.icon />
          </button>
        ))}
      </div>
    </section>
  );
}
