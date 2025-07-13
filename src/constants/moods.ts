import Mood1 from "@/assets/moods/mood1";
import Mood2 from "@/assets/moods/mood2";
import Mood3 from "@/assets/moods/mood3";
import Mood4 from "@/assets/moods/mood4";
import Mood5 from "@/assets/moods/mood5";

export interface Mood {
  id: string;
  label: string;
  icon: React.ComponentType;
}

export const moods: Mood[] = [
  { id: "very-good", label: "Very Good", icon: Mood1 },
  { id: "good", label: "Good", icon: Mood2 },
  { id: "neutral", label: "Neutral", icon: Mood3 },
  { id: "bad", label: "Bad", icon: Mood4 },
  { id: "very-bad", label: "Very Bad", icon: Mood5 },
];
