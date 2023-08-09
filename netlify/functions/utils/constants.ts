type OAuth2Scopes =
  | "tweet.read"
  | "tweet.write"
  | "tweet.moderate.write"
  | "users.read"
  | "follows.read"
  | "follows.write"
  | "offline.access"
  | "space.read"
  | "mute.read"
  | "mute.write"
  | "like.read"
  | "like.write"
  | "list.read"
  | "list.write"
  | "block.read"
  | "block.write"
  | "bookmark.read"
  | "bookmark.write";
  // taken form https://github.com/twitterdev/twitter-api-typescript-sdk/blob/0d12a20a76d6dd9c346decf9cc80bc611975d43f/src/OAuth2User.ts#L9C1-L27C22

export const scopes: OAuth2Scopes[] = ["tweet.read", "users.read", "tweet.write", "offline.access"];
