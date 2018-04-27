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
  interface GithubResource {
    html_url: string;
  }

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


  export interface Event {
    id: string;
    type: EventType;
    public: boolean;
    payload: any;
    repo: GithubRepo;
    actor: GithubUser;
    created_at: string;
  }

  export enum EventType {
    CommitCommentEvent = 'CommitCommentEvent',
    CreateEvent = 'CreateEvent',
    DeleteEvent = 'DeleteEvent',
    DeploymentEvent = 'DeploymentEvent',
    DeploymentStatusEvent = 'DeploymentStatusEvent',
    DownloadEvent = 'DownloadEvent',
    FollowEvent = 'FollowEvent',
    ForkEvent = 'ForkEvent',
    ForkApplyEvent = 'ForkApplyEvent',
    GistEvent = 'GistEvent',
    GollumEvent = 'GollumEvent',
    InstallationEvent = 'InstallationEvent',
    InstallationRepositoriesEvent = 'InstallationRepositoriesEvent',
    IssueCommentEvent = 'IssueCommentEvent',
    IssuesEvent = 'IssuesEvent',
    LabelEvent = 'LabelEvent',
    MarketplacePurchaseEvent = 'MarketplacePurchaseEvent',
    MemberEvent = 'MemberEvent',
    MembershipEvent = 'MembershipEvent',
    MilestoneEvent = 'MilestoneEvent',
    OrganizationEvent = 'OrganizationEvent',
    OrgBlockEvent = 'OrgBlockEvent',
    PageBuildEvent = 'PageBuildEvent',
    ProjectCardEvent = 'ProjectCardEvent',
    ProjectColumnEvent = 'ProjectColumnEvent',
    ProjectEvent = 'ProjectEvent',
    PublicEvent = 'PublicEvent',
    PullRequestEvent = 'PullRequestEvent',
    PullRequestReviewEvent = 'PullRequestReviewEvent',
    PullRequestReviewCommentEvent = 'PullRequestReviewCommentEvent',
    PushEvent = 'PushEvent',
    ReleaseEvent = 'ReleaseEvent',
    RepositoryEvent = 'RepositoryEvent',
    RepositoryVulnerabilityAlertEvent = 'RepositoryVulnerabilityAlertEvent',
    StatusEvent = 'StatusEvent',
    TeamEvent = 'TeamEvent',
    TeamAddEvent = 'TeamAddEvent',
    WatchEvent = 'WatchEvent',
  }

  export interface GithubContent extends GithubResource {
    type: 'file' | 'dir';
    'size': number;
    'name': string;
    'path': string;
    'sha': string;
    'url': string;
    'git_url': string;
    'download_url': string;
    '_links': {
      'git': string,
      'self': string,
      'html': string
    };
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

  export interface PullRequest {
    id: number;
    url: string;
    html_url: string;
    diff_url: string;
    patch_url: string;
    issue_url: string;
    commits_url: string;
    review_comments_url: string;
    review_comment_url: string;
    comments_url: string;
    statuses_url: string;
    number: number;
    state: string;
    title: string;
    body: string;
    assignee: GithubUser;
    labels: Label[];
    milestone: Milestone;
    locked: boolean;
    active_lock_reason: string;
    created_at: Date;
    updated_at: Date;
    closed_at: Date;
    merged_at: Date;
    head: PullRef;
    base: PullRef;
    _links: Links;
    user: GithubUser;
  }

  interface Link {
    href: string;
  }

  interface PullRef {
    label: string;
    ref: string;
    sha: string;
    user: GithubUser;
    repo: GithubRepo;
  }

  interface Links {
    self: Link;
    html: Link;
    issue: Link;
    comments: Link;
    review_comments: Link;
    review_comment: Link;
    commits: Link;
    statuses: Link;
  }


  export interface Milestone {
    url: string;
    html_url: string;
    labels_url: string;
    id: number;
    number: number;
    state: string;
    title: string;
    description: string;
    creator: GithubUser;
    open_issues: number;
    closed_issues: number;
    created_at: Date;
    updated_at: Date;
    closed_at: Date;
    due_on: Date;
  }

  export interface Label {
    id: number;
    url: string;
    name: string;
    description: string;
    color: string;
    default: boolean;
  }
}

