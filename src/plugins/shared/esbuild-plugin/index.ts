import { Plugin } from "esbuild";
import { FakeThis } from "./fake-this";

type PluginConstructor = new (...args: any[]) => Plugin;

/**
 * ESBuild throws an error if the plug-in object (Plugin)
 * has any property other than "name" or "setup".
 *
 * To maintain the class syntax for building a plugin,
 * the EsbuildPlugin decorator migrates the properties
 * to a fakeThis to bind it in the setup function.
 */
export function EsbuildPlugin<T extends PluginConstructor>(Target: T, _: any) {
  return class extends Target {
    constructor(...args: any[]) {
      // Assign any data to "this" (default behavior)
      super(...args);

      const fakeThis = new FakeThis({
        name: this.name,
      });

      const keysOfThis = new Set<string>([
        ...Object.getOwnPropertyNames(this),
        ...Object.getOwnPropertyNames(Target.prototype),
      ]);

      keysOfThis.delete("constructor");
      keysOfThis.delete("setup");
      keysOfThis.delete("name");

      // Clones each property from this
      // *Removes each property from this
      for (const key of keysOfThis) {
        const value = Reflect.get(this, key);
        fakeThis.setProperty(key, value);
        Reflect.deleteProperty(this, key);
      }

      this.setup = this.setup.bind(fakeThis);
    }
  };
}
