export interface Playlist {
  title: string,
  channelId: string
  query: Query
}

export interface Query {
  excludes: string[],
  includes: string[]
}
