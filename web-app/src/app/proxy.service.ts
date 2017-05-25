import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
@Injectable()
export class HttpProxyService{
  constructor(
    private http: Http
  ){ }

  get(url: string){
    return this.http.get(`https://rig-manager.azurewebsites.net/api/proxyurl?code=pb6/0sVfbaUx1ZI8SrNojxjBgU2UlEZbCSMQk32SGyd1PPaCZQHMIA==&url=${url}`)
    .map(res => JSON.parse(res.json()))
  }
}
