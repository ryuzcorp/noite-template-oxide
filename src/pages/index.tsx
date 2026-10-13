import { Greeting } from "$lib/greet.server";
import { serverTime } from "$lib/time.server";
import { head } from "@ilha/router";
import { atom } from "ilha";

export default function Home() {
  head({ title: "Oxide on Noite" });

  const name = atom("");
  const pinged = atom("");

  const ping = async () => {
    // `serverTime` is a remote call: oxide replaces the import with an RPC
    // stub on the client and runs the real function in the Worker.
    const { iso } = await serverTime();
    pinged.set(`Server answered at ${iso}`);
  };

  return (
    <main class="mx-auto mt-8 flex max-w-xl flex-col gap-4">
      <div class="card bg-base-100 shadow">
        <div class="card-body gap-4">
          <h1 class="card-title">Oxide + Ilha on Noite</h1>
          <p class="text-sm opacity-70">
            Edit <code>src/pages/index.tsx</code>, then <code>git push</code> to
            deploy.
          </p>

          <label class="flex flex-col gap-1">
            <span>Your name</span>
            <input
              class="input input-bordered"
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
        </div>
      </div>

      <div class="card bg-base-100 shadow">
        <div class="card-body gap-4">
          <h2 class="card-title">Server action</h2>
          <button class="btn btn-primary w-fit" onclick={ping} type="button">
            Call the server
          </button>
          {pinged() === "" ? null : <p class="text-sm">{pinged()}</p>}
        </div>
      </div>
    </main>
  );
}
