import { ownPostsFromRaw } from "./posts"

/**
 * Own posts: every `src/content/notes/*.md` file, bundled at build time.
 * A file starting with `_` is a template and never published; `draft: true` hides a post.
 */
const files = import.meta.glob("../../content/notes/*.md", { query: "?raw", import: "default", eager: true }) as Record<string, string>

export const OWN_POSTS = ownPostsFromRaw(files)
