import MoodSelector from "@/components/MoodSelector/MoodSelector";
import NotesBox from "@/components/NotesBox/NotesBox";
import ScheduleGrid from "@/components/ScheduleGrid/ScheduleGrid";
import TodoList from "@/components/TodoList/TodoList";
import WeatherWidget from "@/components/WeatherWidget/WeatherWidget";

export default function DayPage() {
  return (
    <>
      <ScheduleGrid />
      <WeatherWidget />
      <MoodSelector />
      <TodoList />
      <NotesBox />
    </>
  );
}
