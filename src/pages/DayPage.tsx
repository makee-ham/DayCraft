import MoodSelector from "@/components/MoodSelector/MoodSelector";
import NotesBox from "@/components/NotesBox/NotesBox";
import ScheduleGrid from "@/components/ScheduleGrid/ScheduleGrid";
import TodoList from "@/components/TodoList/TodoList";

export default function DayPage() {
  return (
    <>
      <ScheduleGrid />
      <MoodSelector />
      <TodoList />
      <NotesBox />
    </>
  );
}
