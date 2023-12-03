import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPayload } from '../_model/blog_payload';
import { Comment } from '../_model/comment';

const API_URL = 'http://localhost:8080/api/posts/';
@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private httpClient: HttpClient) {
  }

  addPost(blogPayload: BlogPayload){
    return this.httpClient.post(API_URL+"add", blogPayload);
  }

  getAllPosts(): Observable<Array<BlogPayload>>{
    return this.httpClient.get<Array< BlogPayload>>(API_URL + "all");
  }

  getPost(permaLink: Number):Observable<BlogPayload>{
    return this.httpClient.get<BlogPayload>(API_URL + permaLink);
  }
  
  getPostComments(permaLink:Number):Observable<Array<Comment>>{
    return this.httpClient.get<Array<Comment>>(API_URL +  permaLink +"/comments");
  }
  getMyPosts(userId: Number): Observable<Array<BlogPayload>>{
    return this.httpClient.get<Array< BlogPayload>>(API_URL + "myPosts/" + userId);
  }
}
