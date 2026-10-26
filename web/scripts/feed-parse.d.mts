export interface FeedItem {
  title: string
  link: string
  date: string
  summary: string
  score?: number
  tags?: string[]
}
export interface Interest {
  id: string
  label: string
  keywords: string[]
}
export function parseFeed(xml: string, opts?: { max?: number }): FeedItem[]
export function fromHfDaily(json: unknown): FeedItem[]
export function tagByInterest(items: FeedItem[], interests: Interest[]): (FeedItem & { tags: string[] })[]
export function dedupeSort(items: FeedItem[], cap?: number): FeedItem[]
