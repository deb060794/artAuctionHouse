import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../_model/comment';

const API_URL = 'http://localhost:8080/api/post/';
@Injectable({
  providedIn: 'root'
})
export class PostCommentsService {
  

  constructor(private httpClient: HttpClient) { }

  getPostComments(id:Number):Observable<Array<Comment>>{
    return this.httpClient.get<Array<Comment>>(API_URL + id +"/comments");
  }

  deleteComment(commentId: number): Observable<{}> {
    return this.httpClient.delete(API_URL + 'comments/' + commentId);
  }

  addComment(comment: Comment): Observable<Comment> {
    return this.httpClient.post<Comment>(API_URL + '/createComment', comment);
  }
}
