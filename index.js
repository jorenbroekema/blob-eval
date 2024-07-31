import { rollup } from "@rollup/browser";
import virtual from "@rollup/plugin-virtual";

const textareaEl = document.getElementById("textarea");
const buttonEl = document.getElementById("save");

async function bundle(inputString) {
  const cfg = await rollup({
    input: "mod",
    plugins: [
      virtual({
        mod: inputString,
      }),
      {
        name: "resolve-from-cdn",
        resolveId(id) {
          if (!id.match(/^(\/|\.\/).+$/g)) {
            return { id: `https://esm.run/${id}`, external: true };
          }
        },
      },
    ],
  });

  const bundle = await cfg.generate({ format: "es" });
  return bundle.output[0].code;
}

buttonEl.addEventListener("click", async () => {
  const code = await bundle(textareaEl.value);
  const url = URL.createObjectURL(
    new Blob([code], { type: "text/javascript" })
  );
  await import(url);
});
