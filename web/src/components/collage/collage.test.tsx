import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Reveal, Taped, MarginMark, Specimen, Pinned } from './index'
import { mockReducedMotion } from '../../test/setup'

describe('collage primitives', () => {
  it('render their children without throwing', () => {
    mockReducedMotion(false)
    render(
      <>
        <Reveal>reveal-body</Reveal>
        <Taped>taped-body</Taped>
        <MarginMark>mark-body</MarginMark>
        <Specimen label="fig.1">specimen-body</Specimen>
        <Pinned>pinned-body</Pinned>
      </>,
    )
    for (const t of ['reveal-body', 'taped-body', 'mark-body', 'specimen-body', 'pinned-body']) {
      expect(screen.getByText(t)).toBeDefined()
    }
  })

  it('Taped renders as an anchor when href is given', () => {
    mockReducedMotion(false)
    render(<Taped href="https://example.com">link-card</Taped>)
    const el = screen.getByText('link-card').closest('a')
    expect(el).not.toBeNull()
    expect(el?.getAttribute('rel')).toBe('noopener')
  })

  it('still renders under prefers-reduced-motion', () => {
    mockReducedMotion(true)
    render(<Reveal>reduced-body</Reveal>)
    expect(screen.getByText('reduced-body')).toBeDefined()
  })
})
