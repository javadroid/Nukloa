import { Component, OnDestroy, OnInit } from '@angular/core';
import { NukFirestoreService } from '../core/nuk-firestore.service';

import { ethers, BigNumber, Wallet } from 'ethers'

import sale from '../../public/buytoken.json'
import buchi from '../../public/coin.json'
import stake from '../../public/stake.json'
import claim from '../../public/claim.json'

import { WinRefService } from '../core/win-ref.service';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { ToastrService } from 'ngx-toastr';
import { CountdownConfig } from 'ngx-countdown';
import { doc, Firestore, FirestoreModule, updateDoc } from '@angular/fire/firestore';
import { ServiceService } from '../share/service.service';
import { gsap } from 'gsap';


@Component({
  selector: 'app-dapp',
  templateUrl: './dapp.component.html',
  styleUrls: ['./dapp.component.css']
})
export class DappComponent implements OnInit,OnDestroy {

  title = 'Nukloa';
  setWalletAddress: string | undefined;
  setwalletBalance: string | undefined;
  setStakeBalance: string | undefined;
  setTotalStak: string | undefined;
  setearnd: string | undefined;
  setBalanceInfo: any = []
  setContractInfo: any = []
  user = [] as any


  amountToBuy = new FormControl('');
  amountTowithdraw = new FormControl('');
  amountToStake = new FormControl('');
  amountToClaim = new FormControl('');
  config: CountdownConfig = {};
  notify = '';
  ready = true
  dailyClaim = 0;
  refferal = 0;

  current = new Date();
  timestamp = this.current.getTime();
  newTimestamp = 0;
  account =null as any
  constructor(private readonly api: ServiceService, private db: FirestoreModule, private toastr: ToastrService, private clipboardApi: ClipboardService, private store: NukFirestoreService, private route: ActivatedRoute, private winRef: WinRefService) {

  }


  ngOnDestroy() {
    gsap.to(".headerPlay_button", {
      display: 'block'
    })
  }

  async ngOnInit(): Promise<void> {
    this.account= await this.winRef.window.ethereum.request({ method: "eth_requestAccounts" })
    if(this.account){

      this.isConnected=true
      this.amountToBuy.reset()
      this.amountToClaim.reset()
      this.amountToStake.reset()
      this.amountTowithdraw.reset()

      this.switchN()
    }else{
      this.isConnected=false
      this.toastr.error("Yeah")
      this.amountToBuy.reset()
      this.amountToClaim.reset()
      this.amountToStake.reset()
      this.amountTowithdraw.reset()
      this.switchN()
    }



  }

  CONTRACTADDRESS = '0x0FdFdb9bc31186E229B6D198346dca54b0a70599'
  SALECONTRACTADDRESS = '0x4632d3304dB173692e8A4666fc106B0B1D6E4862'
  STAKECONTRACTADDRESS = '0x8DC4d4D66AdCb05aFc0284E7bC74716E9eb5d444'
  CLAIMCONTRACTADDRESS = '0x5d7cE23d67309b8E8b5e2F5a7317E245E6a3A57E'

  date = new Date('2019-01-26T00:00:00');
  isConnected=false;


  //  sleep(ms:any) {
  //   return new Promise((resolve) => {
  //     setTimeout(resolve, ms);
  //   });
  // }

  async addToken() {
    const tokenImage = 'https://i.ibb.co/QQ79cYn/Whats-App-Image-2022-08-21-at-3-04-36-PM.jpg';
    await this.winRef.window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20', // Initially only supports ERC20, but eventually more!
        options: {
          address: this.setContractInfo?.address, // The address that the token is at.
          symbol: this.setContractInfo.tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
          decimals: this.setContractInfo.decimals, // The number of decimals in the token
          image: tokenImage, // A string url of the token logo
        },
      },
    });
  }

  copyLink() {

    if (this.setWalletAddress) {

      const url = "https://nukleon.netlify.app/app/" + this.setWalletAddress
      this.clipboardApi.copyFromContent(url)
      this.toastr.success("Referral link copied");
    } else this.toastr.error("Please connect wallet");

  }

  async switchN() {

    const provider = this.winRef.window.ethereum;
    const binanceTestChainId = '0x61';

    if (!provider) {
     this.isConnected = true;
      this.toastr.error("Download and connect a desired software wallet.");
    } else {

      const chainId = await provider.request({ method: 'eth_chainId' });

      if (chainId === '0x118') {
        this.contranDetails()
        this.getWalletBalance()
        this.getStakeDetails()
        this.check()

        this.toastr.success("Bravo!, you are on the correct network");
      } else {

        this.toastr.error("oulalal, switch to the correct network");
        try {

          await provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x118' }],
          });
          this.contranDetails()
          this.getWalletBalance()
          this.getStakeDetails()
          this.check()
          this.toastr.success("You have succefully switched to Binance Test network")

        } catch (switchError: any) {
          // This error code indicates that the chain has not been added to MetaMask.
          if (switchError?.code === 4902) {
            this.toastr.error("This network is not available in your metamask, please add it")
            try {
              await provider.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: '0x118',
                    chainName: 'Smart Chain - Testnet',
                    rpcUrls: ['https://testnet.era.zksync.dev'],
                    blockExplorerUrls: ['https://explorer.zksync.io/'],
                    nativeCurrency: {
                      symbol: 'ETH', // 2-6 characters long
                      decimals: 18
                    }

                  }],
              });
            } catch (addError) {
              // handle "add" error
              console.log(addError);
            }
          }

        }
      }
    }
  }

  async check() {


    this.api.findAny('users', 'walletAddress', this.account[0]).subscribe(res => {
      console.log('walletAddress', res)
      this.dailyClaim = res[0].dailyBonus

      this.current = new Date(this.newTimestamp)
      const oldTime = this.timestamp - res[0].start
      const ExpetedTimestamp = res[0].start + (1000 * 60 * 60 * 12)
      const givenTimestamop = res[0].start + oldTime

      const displayTime = ExpetedTimestamp - givenTimestamop

      const min = displayTime / 1000
      const hour = displayTime / (60 * 60 * 1000)
      if (this.timestamp >= ExpetedTimestamp) {
        this.ready = false
        this.config = { leftTime: 0, format: 'mm:ss:ms' };
        return;

      } else {
        this.ready = true
        console.log("display", Math.round(min));
        this.config = { leftTime: Math.round(min), format: 'hh:mm:ss' };
      }

      console.log('test', res[0])
      return;

    })
    this.api.findAny('users', 'referredby', this.account[0]).subscribe(res => {
      console.log('referredby', res)
      this.refferal = res.length

      this.amountToClaim.setValue(String(this.refferal * 30000))
    })

  }

  async contranDetails() {
    if (this.winRef.window.ethereum) {

      try {

        if(this.account){
          this.isConnected = true;
        }
        const provider = new ethers.providers.Web3Provider(this.winRef.window.ethereum)
        const erc20 = new ethers.Contract(this.CONTRACTADDRESS, buchi, provider)

        const balance = await erc20['balanceOf'](this.account[0])
        const tokenName = await erc20['name']()
        const tokenSymbol = await erc20['symbol']()
        const totalSupply = await erc20['totalSupply']()
        const decimals = await erc20['decimals']()
        this.setBalanceInfo = { address: this.account[0], balance: Math.round(balance / 10 ** 18) }
        this.setContractInfo = {
          address: this.CONTRACTADDRESS,
          tokenName,
          tokenSymbol,
          totalSupply: totalSupply / 10 ** 18,
          decimals
        }

        let ids: any[] = [this.route.snapshot.params]

        console.log("ids", ids)

        if (ids[0].id && ids[0].id != this.account[0]) {
          this.user = {
            walletAddress: this.account[0],
            referredby: ids[0].id,
            start: 0,
            referredBonus: 0,
            dailyBonus: 0,
          }
        } else {
          this.user = {
            walletAddress: this.account[0],
            referredby: 'null',
            start: 0,
            referredBonus: 0,
            dailyBonus: 0,
          }
        }
        console.log("id", this.user)

        this.api.findAny('users', 'walletAddress', this.account[0]).subscribe(res => {
          if (res[0]) {

            this.getWalletBalance()
            this.getStakeDetails()
            this.check()
          } else {
            this.api.create('users', this.user).subscribe(res => {
              console.log('create', res)
            })
            this.getWalletBalance()
            this.getStakeDetails()
            this.check()
          }
        })


      } catch (error: any) {
        this.toastr.error(error!.error.data.message);
      }
    }else{
      this.isConnected = true;
    }
  }

  async getWalletBalance() {
    if (this.winRef.window.ethereum) {

      try {

        this.setWalletAddress = (this.account[0])

        let Wbalance = await this.winRef.window.ethereum.request({ method: 'eth_getBalance', params: [this.account[0]] }).catch((err: any) => { console.log(err) })
        let mainBalance = parseInt(Wbalance) / Math.pow(10, 18)
        this.setwalletBalance = mainBalance.toLocaleString()
        console.log(mainBalance)


      } catch (error: any) {
        this.toastr.error(error!.error.data.message);
      }
    }

  }

  async getStakeDetails() {
    if (this.winRef.window.ethereum) {

      try {

        const provider = new ethers.providers.Web3Provider(this.winRef.window.ethereum)
        const erc20 = new ethers.Contract(this.STAKECONTRACTADDRESS, stake, provider)

        const stakeBalance = await erc20['balanceOf'](this.account[0]);
        const stakeTotal = await erc20['totalSupply']();
        const stakeEarn = await erc20['earned'](this.account[0]);


        this.setStakeBalance = String(Math.round(stakeBalance / 10 ** 18))
        this.setTotalStak = String(Math.round(stakeTotal / 10 ** 18))
        this.setearnd = String(Math.round(stakeEarn / 10 ** 18))

      } catch (error: any) {
        this.toastr.error(error!.error.data.message);
      }
    }

  }

  async withdraw() {
    try {
      const provider = new ethers.providers.Web3Provider(this.winRef.window.ethereum)
      await provider.send("eth_requestAccounts", [])

      const signer = await provider.getSigner(this.account[0])
      const erc20 = new ethers.Contract(this.STAKECONTRACTADDRESS, stake, signer);
      await erc20.connect(signer)
      const amountToBuy = ethers.utils.parseEther(this.amountTowithdraw.value!)

      const waits = await erc20['withdraw'](amountToBuy);
      const receipt = await waits.wait();

      if (receipt) {

        this.ngOnInit()
      }
    } catch (error: any) {
      this.toastr.error(error!.error.data.message);
    }


  }

  async getReward() {

    // this.toastr.error("Rewards coming soon");
    try {
      const provider = new ethers.providers.Web3Provider(this.winRef.window.ethereum)
      await provider.send("eth_requestAccounts", [])

      const signer = await provider.getSigner(this.account[0])
      const erc20 = new ethers.Contract(this.STAKECONTRACTADDRESS, stake, signer);
      await erc20.connect(signer)

      const waits = await erc20['getReward']();
      const receipt = await waits.wait();

      if (receipt) {


        this.ngOnInit()
      }
    } catch (error: any) {
      this.toastr.error(error!.error.data.message);
    }


  }

  async approve(any: any) {
    try {
      const provider = new ethers.providers.Web3Provider(this.winRef.window.ethereum)
      await provider.send("eth_requestAccounts", [])

      const signer = await provider.getSigner(this.account[0])
      const erc20 = new ethers.Contract(this.CONTRACTADDRESS, buchi, signer);
      await erc20.connect(signer)
      if (any) {
        const a: number = parseFloat(any) * 10000000
        console.log("a", a)
        const amountToBuy = ethers.utils.parseEther(String(a))

        await erc20['approve'](this.STAKECONTRACTADDRESS, amountToBuy)

      }


    } catch (error: any) {
      this.toastr.error(error!.data.message);
    }


  }

  async handleEvent() {



    this.api.findAny('users', 'walletAddress', this.account[0]).subscribe(res => {
      console.log('walletAddressfindAny', res)
      localStorage.setItem("id", res[0]._id);
      localStorage.setItem("user", res[0].dailyBonus);
    })

    const res = localStorage.getItem("id");
    const daiyclicks = localStorage.getItem("user");
    const currents = new Date();
    const timestamps = currents.getTime();
    if (res && daiyclicks) {

      if(this.setBalanceInfo.balance<16){
        this.user = {

          start: timestamps,

          dailyBonus: Number(daiyclicks) + 10000

        }
        console.log("user", daiyclicks + 10000);
        console.log("res", res);
        this.api.update('users', res, this.user).subscribe(res => {
          console.log('update', res)
          this.check()
        })
      }else{
        this.toastr.error(" have a mininum of 16 $NUKN to be eligible for daily claim ");
      }




    }


  }
  async handleSale() {
    try {

      const provider = new ethers.providers.Web3Provider(this.winRef.window.ethereum)
      await provider.send("eth_requestAccounts", []).catch((error: any) => {
        this.toastr.error(error!.message);
        console.log(error);
      })
      const signer = await provider.getSigner(this.account[0])
      const Erc20 = new ethers.Contract(this.SALECONTRACTADDRESS, sale, signer)
      await Erc20.connect(signer)
      const amountToBuy = ethers.utils.parseEther(this.amountToBuy.value!)
      const waits = await Erc20['buyTokens'](this.account[0], { value: amountToBuy, from: this.account[0] })
      const receipt = await waits.wait();

      if (receipt) {

        this.approve(this.amountToBuy.value!)
        this.ngOnInit()
      }
    } catch (error: any) {
      this.toastr.error(error!.data.message);
    }


  }

  async handleClaim() {
    this.toastr.error("claim coming soon");
    // try {
    //
    //     const provider = new ethers.providers.Web3Provider(this.winRef.window.ethereum)
    //     await provider.send("eth_requestAccounts", [])
    //     const signer = await provider.getSigner(this.account[0])
    //     const Erc20 = new ethers.Contract(this.CLAIMCONTRACTADDRESS, claim, signer)
    //     await Erc20.connect(signer)
    //     console.log(this.amountToClaim.value)
    //     const amountToBuy = ethers.utils.parseEther(this.amountToClaim.value!)
    //     const waits=await Erc20['buyTokens'](this.account[0], amountToBuy)
    //     const receipt = await waits.wait();

    //     if(receipt){

    //       this.approve(this.amountToClaim.value!)
    //       this.ngOnInit()
    //     }
    // } catch (error:any) {
    //   this.toastr.error(error!.error.data.message);
    // }


  }
  async handleStake() {
    try {

      const provider = new ethers.providers.Web3Provider(this.winRef.window.ethereum)
      await provider.send("eth_requestAccounts", [])
      const signer = await provider.getSigner(this.account[0])
      const Erc20 = new ethers.Contract(this.STAKECONTRACTADDRESS, stake, signer)

      await Erc20.connect(signer)
      const amountToStake = ethers.utils.parseEther(this.amountToStake.value!)
      const waits = await Erc20['stake'](amountToStake);
      const receipt = await waits.wait();

      if (receipt) {


        this.ngOnInit()
      }

    } catch (error: any) {
      console.log(error!.error.data.message)
      this.toastr.error(error!.error.data.message);
    }

  }
  async isTransactionMined(transactionHash: any) {
    const provider = new ethers.providers.Web3Provider(this.winRef.window.ethereum)
    provider.getSigner();
    const txReceipt = await provider.getTransactionReceipt(transactionHash);
    console.log('transactionHash', transactionHash)
    if (txReceipt && txReceipt.blockNumber) {
      console.log(txReceipt)
      return txReceipt;
    } return 'null'
  }




}
