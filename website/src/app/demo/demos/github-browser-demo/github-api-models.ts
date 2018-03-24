export enum GithubUserType {
  User = 'User',
  Organization = 'Organization'
}

export interface GithubUser {
  avatar_url: string;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  id: number;
  login: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  type: GithubUserType;
  url: string;
}

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  owner: GithubUser;
  private: boolean;
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  forks_count: number;
  open_issues_count: number;
  master_branch: string;
  default_branch: string;
}

export interface RateLimit {
  limit: number;
  remaining: number;
  reset: number;
}

export interface GithubRateLimitStat {
  resources: {
    core: RateLimit,
    search: RateLimit
  };
  rate: RateLimit;
}

export interface GithubSearchResult<T> {
  total_count: number;
  incomplete_results: boolean;
  items: T[];
}

export namespace Github {
  export interface Commit {
    sha: string;
    url: string;
  }

  export interface Branch {
    name: string;
    commit: Commit;
    protected: boolean;
    protection_url: string;
  }
}

export declare module GithubRelease {

  export interface Asset {
    url: string;
    browser_download_url: string;
    id: number;
    name: string;
    label: string;
    state: string;
    content_type: string;
    size: number;
    download_count: number;
    created_at: string;
    updated_at: string;
    uploader: GithubUser;
  }

  export interface Release {
    url: string;
    html_url: string;
    assets_url: string;
    upload_url: string;
    tarball_url: string;
    zipball_url: string;
    id: number;
    tag_name: string;
    target_commitish: string;
    name: string;
    body: string;
    draft: boolean;
    prerelease: boolean;
    created_at: string;
    published_at: string;
    author: GithubUser;
    assets: Asset[];
  }

}

