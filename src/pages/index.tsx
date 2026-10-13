import { Greeting } from "$lib/greet.server";
import { serverInfo } from "$lib/server-info.server";
import { head } from "@ilha/router";
import { atom } from "ilha";

const CARD =
  "flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900";

export default function Home() {
  head({ title: "Noite · Oxide" });

  const name = atom("");
  const answer = atom("");

  const callServer = async () => {
    // `serverInfo` is a remote call: oxide replaces the import with an RPC
    // stub on the client and runs the real function in the Worker.
    const { at, runtime } = await serverInfo();
    answer.set(`Answered at ${at} by ${runtime}`);
  };

  return (
    <main class="mx-auto flex min-h-screen max-w-xl flex-col gap-6 px-6 py-16">
      <header class="flex flex-col gap-2">
        <p class="text-xs font-medium tracking-wide text-gray-500 uppercase">
          Noite template
        </p>
        <h1 class="text-2xl font-semibold">Oxide on Noite</h1>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Edit <code>src/pages/index.tsx</code>, then <code>git push</code> to
          deploy.
        </p>
      </header>

      <section class={CARD}>
        <label class="flex flex-col gap-1.5 text-sm font-medium">
          Your name
          <input
            class="rounded-md border border-gray-300 bg-white px-3 py-2 font-normal outline-none focus:border-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:focus:border-gray-100"
            name="name"
            oninput={(event: Event) => {
              const target = event.currentTarget;
              if (target instanceof HTMLInputElement) {
                name.set(target.value);
              }
            }}
            value={name()}
          />
        </label>
        <Greeting name={name()} />
      </section>

      <section class={CARD}>
        <div class="flex flex-col gap-1">
          <h2 class="font-semibold">Server</h2>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Runs in the Worker, never in the browser.
          </p>
        </div>
        <button
          class="w-fit rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300"
          onclick={callServer}
          type="button"
        >
          Call the server
        </button>
        {answer() === "" ? null : (
          <p class="text-sm break-all text-gray-600 dark:text-gray-400">
            {answer()}
          </p>
        )}
      </section>
    </main>
  );
}
