import {RedditPost} from "@/store/redditPost";

export class RedditJob {
  public Created: Date;
  public Author: string;
  public Title: string;
  public Text: string;
  public is_self: boolean;
  public Permalink: string;
  public Id: string;

  constructor(post: RedditPost) {
    this.Id = post.id;
    this.Author = post.author;
    this.Title = post.title;
    this.Text = post.selftext;
    this.is_self = post.is_self;
    this.Permalink = post.permalink
    this.Created = new Date(post.created * 1000)
  }

}
