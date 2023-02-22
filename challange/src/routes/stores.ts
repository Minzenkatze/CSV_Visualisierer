import { writable, } from "svelte/store";
import type { Writable } from "svelte/store";

export const radioSelection: Writable<number> = writable(0);
export const daten: Writable<any[][]> = writable([]);
export const labels: Writable<string[]> = writable([]);
export const tabledata: Writable<string[][]> = writable([]);