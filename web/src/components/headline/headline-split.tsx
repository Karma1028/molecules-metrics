import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react"

/** Plain text of a headline (for aria-label): strings joined, <br> read as a space. */
export function textOf(node: ReactNode): string {
  let out = ""
  Children.forEach(node, (c) => {
    if (typeof c === "string" || typeof c === "number") out += String(c)
    else if (isValidElement(c)) {
      const el = c as El
      out += el.type === "br" ? " " : textOf(el.props.children)
    }
  })
  return out.replace(/\s+/g, " ").trim()
}

export interface SplitOptions {
  /** wrap each character too (analyst: letters are counted one by one) */
  chars: boolean
}

type El = ReactElement<{ children?: ReactNode; className?: string }>

interface Counter {
  word: number
  char: number
  /** words inside an <em>: the hand word, ordered after every plain word */
  late: number
}

/** the "hand" word: <em>/<i>, or a span styled as handwriting (className contains "hand") */
const isEm = (el: El) =>
  el.type === "em" || el.type === "i" || /hand|-hand/.test(el.props.className ?? "")

/**
 * Splits a headline's children into word spans (and char spans), keeping
 * <br>, <em> and other inline elements in place. Each word carries --w (its
 * order); plain words count first, emphasised words after them, so the hand
 * word always lands last. Spans are aria-hidden: the h1 carries the label.
 */
export function splitHeadline(children: ReactNode, opts: SplitOptions): { nodes: ReactNode; words: number } {
  const plain = { n: 0 }
  countPlain(children, plain, false)
  const ctr: Counter = { word: 0, char: 0, late: plain.n }
  const nodes = walk(children, ctr, opts, false, "h")
  return { nodes, words: ctr.late }
}

function countPlain(node: ReactNode, acc: { n: number }, inEm: boolean) {
  Children.forEach(node, (c) => {
    if (typeof c === "string" || typeof c === "number") {
      if (!inEm) acc.n += String(c).split(/\s+/).filter(Boolean).length
    } else if (isValidElement(c)) {
      const el = c as El
      countPlain(el.props.children, acc, inEm || isEm(el))
    }
  })
}

function walk(node: ReactNode, ctr: Counter, opts: SplitOptions, inEm: boolean, key: string): ReactNode {
  const out: ReactNode[] = []
  Children.forEach(node, (c, i) => {
    const k = `${key}.${i}`
    if (typeof c === "string" || typeof c === "number") {
      // keep whitespace as text so line breaking and spacing stay native
      String(c).split(/(\s+)/).forEach((part, j) => {
        if (!part) return
        if (/^\s+$/.test(part)) { out.push(part); return }
        const order = inEm ? ctr.late++ : ctr.word++
        out.push(word(part, order, ctr, opts, `${k}.${j}`))
      })
    } else if (isValidElement(c)) {
      const el = c as El
      if (el.type === "br" || el.props.children == null) { out.push(cloneElement(el, { key: k })); return }
      out.push(cloneElement(el, { key: k }, walk(el.props.children, ctr, opts, inEm || isEm(el), k)))
    }
  })
  return out
}

function word(text: string, order: number, ctr: Counter, opts: SplitOptions, key: string): ReactNode {
  const style = { ["--w" as string]: order }
  if (!opts.chars) return <span key={key} className="hw" aria-hidden="true" style={style}>{text}</span>
  return (
    <span key={key} className="hw" aria-hidden="true" style={style}>
      {Array.from(text).map((ch, i) => (
        <span key={i} className="hc" style={{ ["--c" as string]: ctr.char++ }}>{ch}</span>
      ))}
    </span>
  )
}
