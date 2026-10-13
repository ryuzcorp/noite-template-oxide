/* eslint-disable func-names -- Ilha island scanner requires `= function`, not an arrow */
interface GreetingProps {
  name?: string | number | boolean | null;
}

// Ilha islands: `export const X = function …` (arrows are not scanned).
// The `.server` suffix keeps this module off the client bundle: it renders on
// the server and streams HTML into the page.
export const Greeting = function (props: GreetingProps) {
  const name =
    props.name === undefined || props.name === null || props.name === ""
      ? "Noite"
      : String(props.name);

  return (
    <p class="text-lg">
      Hello, <span class="font-semibold">{name}</span>!
    </p>
  );
};
