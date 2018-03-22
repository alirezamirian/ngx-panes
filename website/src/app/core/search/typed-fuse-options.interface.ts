export interface TypedFuseOptions<T> {
  id?: string;
  caseSensitive?: boolean;
  includeMatches?: boolean;
  includeScore?: boolean;
  shouldSort?: boolean;
  sortFn?: (a: { score: number }, b: { score: number }) => number;
  getFn?: (obj: any, path: string) => any;
  keys?: (string | { name: keyof T, weight: number })[];
  verbose?: boolean;
  tokenize?: boolean;
  tokenSeparator?: RegExp;
  matchAllTokens?: boolean;
  location?: number;
  distance?: number;
  threshold?: number;
  maxPatternLength?: number;
  minMatchCharLength?: number;
  findAllMatches?: boolean;
}
