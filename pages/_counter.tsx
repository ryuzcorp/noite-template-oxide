import { atom } from "ilha";

export default function Counter({ start = 0 }: { start?: number }) {
  const count = atom(start);
  return (
    <button
      type="button"
      onclick={() => count.update((n) => n + 1)}
      class="w-fit rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300"
    >
      Clicked {count} times
    </button>
  );
}
