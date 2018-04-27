import {Component, Input, OnInit} from '@angular/core';
import {AbstractGithubComponent} from '../abstract-github-component';
import {Github} from '../github-api-models';
import {Http} from '@angular/http';
import EventType = Github.EventType;
import Event = Github.Event;

@Component({
  selector: 'app-github-event-list',
  templateUrl: './github-event-list.component.html',
  styleUrls: ['./github-event-list.component.scss']
})
export class GithubEventListComponent extends AbstractGithubComponent implements OnInit {
  events: Event[];

  @Input()
  slug: string;

  constructor(http: Http) {
    super(http, 'events');
  }

  ngOnInit() {
  }

  setItems(items: any[]): void {
    this.events = items;
  }

  getEventText(event: Event) {
    const actorName = `<b>${event.actor.login}</b>`;
    const payload = event.payload;
    const action = payload.action;
    const repoName = event.repo.name;
    switch (event.type) {
      case EventType.CommitCommentEvent:
        const linkText = `commented on #${payload.comment.commit_id.slice(0, 6)}`;
        return `${actorName} <a href="${payload.comment.html_url}">${linkText}</a>`;
      case EventType.CreateEvent:
        return `${actorName} created <b>${event.payload.ref}</b> ${event.payload.ref_type}`;
      case EventType.DeleteEvent:
        return `${actorName} deleted <b>${event.payload.ref}</b> ${event.payload.ref_type}`;
      case EventType.ForkEvent:
        return `${actorName} forked <b>${repoName}</b>`;
      case EventType.GollumEvent:
        return `${actorName} ${payload.pages[0].action} wiki page <b>{{event.payload.pages[0].page_name}}</b>`;
      case EventType.IssueCommentEvent:
        return `${actorName} commented on ${Issue(payload.issue)}`;
      case EventType.IssuesEvent:
        return `${actorName} ${action} ${Issue(payload.issue)}`;
      case EventType.LabelEvent:
        return `${actorName} ${action} label <b>${payload.label}</b>`;
      case EventType.WatchEvent:
        return `${actorName} starred <b>${repoName}</b>`;
      case EventType.PullRequestReviewCommentEvent:
        return `${actorName} ${action} a ${Comment(payload.comment)} on PR ${Issue(payload.pull_request)}`;
      case EventType.PullRequestEvent:
        return `${actorName} ${action} a ${Link(payload.pull_request, 'pull request')}`;
      case EventType.PushEvent:
        const branch = event.payload.ref.split('/').pop();
        return `${actorName} pushed ${event.payload.size} commit${event.payload.size ? 's' : ''} to <b>${branch}</b>`;
      default:
        return `${actorName} did something!`;
    }
  }

  getEventSummary(event: Github.Event) {
    switch (event.type) {
      case EventType.CommitCommentEvent:
      case EventType.IssueCommentEvent:
      case EventType.PullRequestReviewCommentEvent:
        return event.payload.comment.body;
      case EventType.PushEvent:
        return event.payload.commits.map(commit => commit.message.split('\n')[0]).join(', &nbsp;');
      default:
        return ``;
    }

  }
}

function Link(item, text) {
  return `<a href="${item.html_url}" target="_blank">${text}</a>`;
}

function Issue(issue) {
  return `${Link(issue, `#${issue.number}`)}`;
}

function Commit(commit) {
  return `<a href="${commit.html_url}" target="_blank">#${commit.number}</a>`;
}

function Comment(comment, text = 'comment') {
  return `<a href="${comment.html_url}" target="_blank">${text}</a>`;
}
