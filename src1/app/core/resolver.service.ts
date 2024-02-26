import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { NukFirestoreService } from './nuk-firestore.service';

@Injectable({
  providedIn: 'root'
})
export class ResolverService implements Resolve<any> {

  constructor(private http:NukFirestoreService,private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const {id}=route.params
    
return this.http.e(id).subscribe((res)=>{
  console.log("tessast",res)
  if(res[0]){
  
  }else{
    this.router.navigate(['app'])
  }
})

}
}


