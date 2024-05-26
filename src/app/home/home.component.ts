import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import imagesLoaded from 'imagesloaded';
import AOS from 'aos';
import { ClipboardService } from 'ngx-clipboard';
import { FormControl, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
  
})
export class HomeComponent implements OnInit {
  @ViewChild('bgvideo') myVideo: any;
  loading_bar_inner = 0
  loading_bar_style = { width: this.loading_bar_inner + '%' }
  isollapse = false
  Copied=false
  ChainIDs=[{
    id:0,
    chainName:"zkSync era ETH",
    chainId:"0x144",
    contractaddress:"0xfE668A8202f49c9B0bAD051b2E20F2f7FFEAca17",
    rpcUrls: ['https://zksync.drpc.org'],
    blockExplorerUrls: ['https://explorer.zksync.io/'],
  },
  {
    id:1,
    // BNB Smart Chain Mainnet
    chainName:"Binance BNB",
    chainId:"0x38",
    contractaddress:"0xb4e2bbb46aa7B5d9e007a96CAe1FbFa9D5f58e6d",
    rpcUrls: ['https://bsc.drpc.org'],
    blockExplorerUrls: ['https://bscscan.com/'],
  },{
    id:2,
    // BNB Smart Chain Mainnet
    chainName:"Fantom Opera FTM",
    chainId:"0xfa",
    contractaddress:"0xfCF077A710A9C30dBe0798A912cFf0F6Cc1e20bE",
    rpcUrls: ['https://fantom.drpc.org'],
    blockExplorerUrls: ['https://ftmscan.com/'],
  }

]
  
  currentChain=this.ChainIDs[0]
  selected = new FormControl(0, [Validators.required, ]);

  selectFormControl = new FormControl('valid', [Validators.required, Validators.pattern('valid')]);
  showForm = false;
  @ViewChild('currencySelect') currencySelect!: MatSelect;
  @ViewChild('currencySelect2') currencySelect2!: MatSelect;
  toggleForm(i:any) {
    this.showForm = !this.showForm;
    if (this.showForm) {
      // Open the mat-select menu programmatically
      i==1&&this.currencySelect.open();
      i==2&&this.currencySelect2.open();
    }
  }
  nft(){
    this.toastr.success("Coming Soon");
  }
  constructor(private rout:Router,
    private clipboardApi: ClipboardService,
    private toastr: ToastrService,private elementRef: ElementRef) { }
  openApp(){
    this.rout.navigate(["/app"])
  }
  ngOnInit(): void {
    this.currentChain=this.ChainIDs[0]
    // AOS.init({
    //   offset: 400,
    //   duration: 2000,
    // });
  }
  ngAfterViewInit() {
    AOS.init({
      offset: 400,
      duration: 2000,
    });
  }
 
  copyLink(i:any) {
    this.currentChain=this.ChainIDs[i]
    console.log(i,this.currentChain)
    this.Copied=true
      const url = this.currentChain.contractaddress;
      this.clipboardApi.copyFromContent(url);
      this.toastr.success('Contract Address Copied');
   
  }



}

