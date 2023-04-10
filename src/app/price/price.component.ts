import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../share/service.service';
import axios from 'axios';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent implements OnInit {

  allcoins=[]as any[]
  allTrending1=[]as any[]
  allTrending2=[]as any[]
  searchInput=''
  constructor(private http:ServiceService) { }

  ngOnInit(): void {

    this.getAllcoins()
    this.getAlltrending()
  }
  async getAlltrending(){
    (await this.http.getAlltrending()).subscribe((e: any)=>{
      this.allTrending1 = e.coins.slice(0, Math.floor(e.coins.length / 2+1));
      this.allTrending2 = e.coins.slice(Math.floor(e.coins.length / 2 +1));
        console.log("coin trending",e)
        console.log("coin trending",this.allTrending1)

      })

  }
  async getAllcoins(){

    (await this.http.getAllCoin()).subscribe((e: any)=>{

    //  const updatedArray = myArray.map(obj => {
    //    return { ...obj, price_change_percentage_24h: obj.age + 10 };
    //  });

      this.allcoins=e

      console.log("coin prices",e)
    })
  }
 addCommasToNumber(num:number) {
  return Math.floor(num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
}
 isNegative(num:number) {
  Math.floor(num)
  return num < 0;
}
  searchCoin(){

    if(this.searchInput===''){
 this.getAllcoins()
    }else{
       this.allcoins=this.allcoins.filter(coin=>coin.symbol.includes(this.searchInput) ||coin.name.includes(this.searchInput)  )

    }

  }


}
