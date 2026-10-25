export const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"]

const norm = (k: string) => (k.length === 1 ? k.toLowerCase() : k)

/** Feeds one key at a time; push() returns true on the key that completes the code. */
export function createKonami(code: string[] = KONAMI) {
  let i = 0
  return {
    push(key: string): boolean {
      const k = norm(key)
      if (k === code[i]) i += 1
      else i = k === code[0] ? 1 : 0
      if (i === code.length) {
        i = 0
        return true
      }
      return false
    },
  }
}
