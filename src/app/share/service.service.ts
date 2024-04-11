import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';

// const apiUrl ='https://api.mrssms.com/api'
const apiUrl  ='https://api.nudorbital.io/api'
// const apiUrl  ='https://api-mrssms.up.railway.app/api'

@Injectable({
  providedIn: 'root',
})
export class ServiceService {

  getAuthToken() {
    return localStorage.getItem('token');
  }

  constructor(private http: HttpClient) {}

  find(model: string): Observable<any> {
    return this.http.get(`${apiUrl}/${model}/`);
  }

  findAny(model: string, field: string, value: string): Observable<any> {
    return this.http.get(
      `${apiUrl}/${model}/${field}/${value}`
    );
  }

  findOne( id: string): Observable<any> {
    return this.http.get(`${apiUrl}/users/${id}`);
  }

  update(model: string, id: string, update: any): Observable<any> {
    return this.http.post(`${apiUrl}/${model}/${id}`, update);
  }

  create( body: any): Observable<any> {
    return this.http.post(`${apiUrl}/users`, body);
  }

  upload(file: any): Observable<any> {
    return this.http.post(`${apiUrl}/${'document'}`, file);
  }

  delete(model: string, id: string): Observable<any> {
    return this.http.post(`${apiUrl}/${model}/delete/${id}`,{});
  }




  users(id: string): Observable<any> {
    return this.http.get(`https://dummyjson.com/users/${id}`);
  }

  lga(id: string): Observable<any> {
    return this.http.get(`https://api.facts.ng/v1/states/lagos`);
  }

  resetpassword(model: string, pass: any): Observable<any> {
    return this.http.post(
      `${apiUrl}/${model}/resetpassword`,
      pass
    );
  }

  sendMail(model: string,data:any): Observable<any>{
    return this.http.post(`${apiUrl}/${model}`,data)
  }

 async getAllCoin(){

  //  const res =await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=ngn',{'headers':{'Content-Type':'app'}})
  //  console.log("testing ", await res)
    return this.http.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`)
  }

   getAlltrending(){

    //  const res =await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=ngn',{'headers':{'Content-Type':'app'}})
    //  console.log("testing ", await res)
      return this.http.get(`https://api.coingecko.com/api/v3/search/trending`)
    }

    getACoin(id:String){

      //  const res =await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=ngn',{'headers':{'Content-Type':'app'}})
      //  console.log("testing ", await res)
        return this.http.get(`https://api.coingecko.com/api/v3/coins/${id}`)
      }
    openai(data:any):  Observable<any>{

      // axios.post('https://whatsappgtp.vercel.app/api/openai',[{"role":"user", "content":"aw are u"}]).then(res=>{
      //   console.log(res)
      // })
      return this.http.post('https://whatsappgtp.vercel.app/api/openai',[{"role":"user", "content":"aw are u"}])
    }
}
