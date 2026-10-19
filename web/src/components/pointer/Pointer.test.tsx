import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, cleanup, act } from '@testing-library/react'
import { Pointer } from './Pointer'

function mockFine(matches: boolean) {
  vi.stubGlobal('matchMedia', (q: string) => ({
    matches: q.includes('pointer: fine') ? matches : false,
    media: q, addEventListener: () => {}, removeEventListener: () => {},
  }))
}

function move(x: number, y: number) {
  const e = new MouseEvent('pointermove', { clientX: x, clientY: y, bubbles: true })
  Object.defineProperty(e, 'pointerType', { value: 'mouse' })
  act(() => { window.dispatchEvent(e) })
}

describe('Pointer', () => {
  beforeEach(() => { cleanup(); delete document.documentElement.dataset.pointer })

  it('renders nothing on touch devices and keeps the native cursor', () => {
    mockFine(false)
    const { container } = render(<Pointer world="artist" />)
    expect(container.querySelector('.ptr')).toBeNull()
    move(10, 10)
    expect(document.documentElement.dataset.pointer).toBeUndefined()
  })

  it('arms cursor:none only after the first mouse move, and disarms on unmount', () => {
    mockFine(true)
    const { container, unmount } = render(<Pointer world="analyst" />)
    expect(container.querySelector('.ptr-cross')).not.toBeNull()
    expect(document.documentElement.dataset.pointer).toBeUndefined()
    move(100, 120)
    expect(document.documentElement.dataset.pointer).toBe('analyst')
    unmount()
    expect(document.documentElement.dataset.pointer).toBeUndefined()
  })

  it('analyst readout shows zero-padded coordinates with no easing', () => {
    mockFine(true)
    const { container } = render(<Pointer world="analyst" />)
    move(37, 512)
    expect(container.querySelector('.ptr-read')?.textContent).toBe('x 0037  y 0512')
  })

  it('artist pointer releases a hovered target that unmounts', () => {
    mockFine(true)
    const btn = document.createElement('button')
    document.body.appendChild(btn)
    const { container } = render(<Pointer world="artist" />)
    act(() => { btn.dispatchEvent(new MouseEvent('pointerover', { bubbles: true })) })
    const root = container.querySelector('.ptr-ink') as HTMLElement
    expect(root.dataset.hover).toBe('true')
    btn.remove()
    move(5, 5)
    return new Promise<void>((done) => requestAnimationFrame(() => {
      expect(root.dataset.hover).toBe('false')
      done()
    }))
  })
})
