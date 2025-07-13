import { useState } from "react";

export default function NotesBox() {
  const [note, setNote] = useState<string>("");

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setNote(e.target.value);

  return (
    <section className="w-full max-w-sm rounded-box overflow-hidden">
      <h2 className="text-lg font-bold text-center py-2 bg-primary text-primary-content">
        NOTES
      </h2>
      <form
        className="border border-base-300"
        style={{
          borderBottomLeftRadius: "var(--radius-box)",
          borderBottomRightRadius: "var(--radius-box)",
        }}
      >
        <textarea
          value={note}
          onChange={handleNoteChange}
          placeholder="Any thoughts, reflections, or feelings..."
          className="w-full p-2 min-h-[6rem] resize-none textarea-sm textarea-neutral outline-accent"
        />
      </form>
    </section>
  );
}
