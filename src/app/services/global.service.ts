import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  base_path_url="http://localhost:2000/"

  constructor(private http:HttpClient) { }

  headers: HttpHeaders=new HttpHeaders({
  'Content-Type':'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
  'Authorization': 'Bearer key',
  });

public base_path_api() {
  return this.base_path_url + 'api/';
}


 public getRequest(url:any):Observable<any>{
  return this.http.get(url);
}

public getRequestAuthorization (url:any,headers:any){
  const accessToken  = localStorage.getItem("access_token")
  if (accessToken != undefined || accessToken != null) {
  const headers = new HttpHeaders()
  .set("content-type", "application/json")
  .set("Authorization", accessToken);
  }
  return this.http.get<any>(url,{headers});
}

public PostRequestAuthoriazation(url:any,data:any,headers:any){
  const accessToken  = localStorage.getItem("access_token")
  if (accessToken != undefined || accessToken != null) {
    const headers = new HttpHeaders()
    .set("content-type", "application/json")
    .set("Authorization", accessToken);
    }
    return this.http.post<any>(url,data,{headers});
} 

public PostRequest(url:any,data:any):Observable<any>{
    return this.http.post<any>(url,data);
} 
}
