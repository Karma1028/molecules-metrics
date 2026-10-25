/** A small hello for anyone who opens DevTools. Printed once per page load. */
export const HORSE_ASCII = String.raw`
        /\^/\
       ( o o )_____
        \ ~ /      \
         |||  ()()  |
         |||_______/
         /_/   /_/
`

export const letterLines = (): string[] => [
  "Hello, curious one.",
  "Built with React, Vite and a lot of terracotta.",
  "The horse is a Bankura motif; click the one bottom-left.",
  "Say hi: tuhin.gim@gmail.com",
]

let printed = false

export function printLetter(log: (...a: unknown[]) => void = console.log): void {
  if (printed) return
  printed = true
  log(`%c${HORSE_ASCII}`, "color:#c2562a;font:12px monospace")
  letterLines().forEach((l) => log(`%c${l}`, "color:#8a7a66;font:12px monospace"))
}
