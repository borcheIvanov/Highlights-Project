export interface YouTubeData {
  id: { videoId: number };
  snippet: {
    title: string,
    description: string,
    thumbnails: {
      default: {
        url: string
      }
    }
  };
}
