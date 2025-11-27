export interface Playlist {
  title: string,
  url: string
  query: Query
}

export interface Query {
  excludes: string[],
  includes: string[]
}
