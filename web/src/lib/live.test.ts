import { describe, it, expect, vi, afterEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import {
  useFootball,
  useGithub,
  useMusicSearch,
  FOOTBALL_FALLBACK,
  MUSIC_FALLBACK,
} from './live'

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('useLive fallback contract', () => {
  it('populates fallback and never throws when fetch rejects', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')))
    const { result } = renderHook(() => useFootball())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.data).toEqual(FOOTBALL_FALLBACK)
    expect(result.current.error).toBe(true)
    expect(result.current.fallback).toBe(true)
  })

  it('marks fallback (not error) when the endpoint answers configured:false', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve({ configured: false }) }),
    )
    const { result } = renderHook(() => useGithub())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.error).toBe(false)
    expect(result.current.fallback).toBe(true)
  })

  it('serves live data with fallback=false on success', async () => {
    const payload = { configured: true, user: 'tuhin', repos: [], totalStars: 0 }
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve(payload) }))
    const { result } = renderHook(() => useGithub())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.data).toEqual(payload)
    expect(result.current.fallback).toBe(false)
    expect(result.current.error).toBe(false)
  })
})

describe('useMusicSearch', () => {
  it('returns the empty fallback and fires no request for a blank query', () => {
    const f = vi.fn()
    vi.stubGlobal('fetch', f)
    const { result } = renderHook(() => useMusicSearch('   '))
    expect(result.current.data).toEqual(MUSIC_FALLBACK)
    expect(result.current.fallback).toBe(true)
    expect(f).not.toHaveBeenCalled()
  })

  it('populates results on a successful search', async () => {
    const payload = {
      configured: true,
      query: 'tum tak',
      results: [{ id: '1', title: 'Tum Tak', artist: 'A.R. Rahman', source: 'youtube' }],
    }
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve(payload) }))
    const { result } = renderHook(() => useMusicSearch('tum tak'))
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.data.results).toHaveLength(1)
    expect(result.current.fallback).toBe(false)
  })
})
