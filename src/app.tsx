import { useSignal } from "@preact/signals";
import "./app.css";
import { TargetedEvent, useRef } from "preact/compat";

export function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const input = useSignal("");
  const todos = useSignal([
    {
      id: 1,
      name: "John",
    },
    {
      id: 2,
      name: "Mary",
    },
  ]);

  const onInput = (event: TargetedEvent) => {
    const { value } = event.target as HTMLFormElement;
    input.value = value;
  };

  const onSubmit = (event: TargetedEvent) => {
    event.preventDefault();

    if (input.value.trim()) {
      todos.value = [
        ...todos.value,
        { id: todos.value.length + 1, name: input.value },
      ];
      input.value = "";
      inputRef.current?.onblur;
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          ref={inputRef}
          type="text"
          value={input.value}
          onInput={onInput}
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {todos.value.map((item) => (
          <li key={item.id}>
            <span>{item.id}. </span> <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
