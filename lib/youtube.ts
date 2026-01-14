export const YOUTUBE_IDS: Record<string, string> = {
  "puzzle-game": "u-Z6I0VWYN8",
  "python-journey": "I0c8GSxFX4k",
  "vote-eligibility": "FAqOw1XOKTo",
  "traffic-anomaly-ml": "JBthPLM7Kas",
  "campus-connect": "7g9cysI05NA",
  "smartphone-purchase-ml": "GRWtzNy9Z8E",
  "pw-survey": "iXY-97XZ7C0",
  "admission-form": "Wh_7Ei3DKh4",
  "phishing-chrome-ext": "J1LkMogTM7k",
  "nids-basic": "biFX-quTFRs",
  "network-sniffer-dashboard": "NYwZuEuppVI",
  "moviebox": "n2A-hJg-d_4",
  "mkstream": "133dE-bHWnQ",
  "digital-clock": "LnWEBQ4-M6s",
  "mk-calculator": "QsAB3MyTxzE",
  "mern-ecommerce": "hx5QQ7zZUCM",
  "hotel-menu-card": "lkyjHc0Qj9M",
  "dynamic-login": "u9A9Tud7XU8",
  "cybersecurity-journey": "exNka5mQx68",
  "ai-nids": "T3gCpjjgBt0",
  "amazon-clone": "x6CedC0ncuI",
};

export function getYoutubePoster(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

export function getYoutubeEmbed(videoId: string): string {
  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&controls=1&modestbranding=1&rel=0&iv_load_policy=3&playsinline=1`;
}

export function getYoutubePosterBySlug(slug: string): string | undefined {
  const id = YOUTUBE_IDS[slug];
  return id ? getYoutubePoster(id) : undefined;
}

export function getPosterCandidates(videoId: string): string[] {
  return [
    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
  ];
}

export function getYoutubeEmbedBySlug(slug: string): string | undefined {
  const id = YOUTUBE_IDS[slug];
  return id ? getYoutubeEmbed(id) : undefined;
}
