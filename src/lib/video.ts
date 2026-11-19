export type ParsedVideo =
  | { kind: 'youtube'; id: string }
  | { kind: 'vimeo'; id: string }
  | { kind: 'file'; src: string };

/** Accepts YouTube / Vimeo links or direct video files. Returns null for empty or unsupported values. */
export function parseVideoUrl(url: string | null | undefined): ParsedVideo | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (!trimmed) return null;

  if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(trimmed)) return { kind: 'file', src: trimmed };

  const yt =
    trimmed.match(/youtu\.be\/([\w-]{11})/) ||
    trimmed.match(/youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)([\w-]{11})/);
  if (yt) return { kind: 'youtube', id: yt[1] };

  const vimeo = trimmed.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return { kind: 'vimeo', id: vimeo[1] };

  return null;
}

export function embedUrl(v: ParsedVideo): string | null {
  switch (v.kind) {
    case 'youtube':
      return `https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
    case 'vimeo':
      return `https://player.vimeo.com/video/${v.id}?autoplay=1&dnt=1&title=0&byline=0`;
    case 'file':
      return null;
  }
}

export function autoPoster(v: ParsedVideo): string | undefined {
  return v.kind === 'youtube' ? `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg` : undefined;
}
