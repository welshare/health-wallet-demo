"use client";
import { sequence } from '0xsequence'
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function MainConnect() {

  sequence.initWallet(process.env.NEXT_PUBLIC_ACCESS_KEY!, {defaultNetwork: 'base-sepolia'})
    
    const [isLoggedIn, setIsLoggedIn] = useState<any>(false)
  
    const signIn = async () => {
      const wallet = sequence.getWallet()
      
      const details = await wallet.connect({app: 'Long Covid Labs'})
      console.log('details', wallet, details)
      if(details.connected){
        setIsLoggedIn(true)
      }
    }
  
    useEffect(() => {
      console.log('isLoggedIn', isLoggedIn)
    },[isLoggedIn])
  
  
    return (
      <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col items-center sm:items-start">
        {isLoggedIn && <div className="sign-out-button" onClick={()=> setIsLoggedIn(false)}>sign out</div>}
        <div className="container">
        {!isLoggedIn ? <Button onClick={() => signIn()}>sign in</Button> : 'isConnected'}
        </div>
        </main>
      </div>
    );
  }
  