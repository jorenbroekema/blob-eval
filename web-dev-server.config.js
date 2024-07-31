import { fromRollup } from "@web/dev-server-rollup";

// replace "path" with "path-unified" so @rollup/plugin-virtual is browser-compatible
function pathPlugin() {
  return {
    name: "path-shim",
    async resolveId(source, importer, options) {
      if (source === "path" || source === "node:path") {
        return await this.resolve("path-unified", importer, options);
      }
    },
  };
}

export default {
  watch: true,
  open: true,
  nodeResolve: true,
  plugins: [fromRollup(pathPlugin)()],
};
