"use client";
import { useWalletKit } from "@/app/context/WalletkitContext";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function WalletConnectDialog() {
  const [connectionString, setConnectionString] = useState<string>('')
  const [open, setOpen] = useState(false)
  const {walletKit} = useWalletKit()


  // const handleSubmit = () => {
  //   onConnect()
  //   //onSubmit(connectionString)
  //   //setOpen(false)
  
  const onConnect = async () => { 
    console.log("onConnect", walletKit)
    if (!walletKit) return
    try {
      console.log("PAIRING", connectionString)
      await walletKit.core.pairing.pair({ uri: connectionString })
    } catch (error) {
      console.error("Error pairing wallet:", error)
    }
   
    //setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={!walletKit}>WalletConnect</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
          <DialogDescription>
            Enter your wallet connection string to connect.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="connectionString" className="text-right">
              Connection String
            </Label>
            <Input 
              id="connectionString" 
              aria-label="wc url connect input"
              placeholder="e.g. wc:a281567bb3e4..."
              value={connectionString} 
              className="col-span-3" 
              onChange={(e) => setConnectionString(e.target.value)} 
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={onConnect}>Connect</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

/*

async function onConnect() {
    const { topic: pairingTopic } = parseUri(connectionString)
    // if for some reason, the proposal is not received, we need to close the modal when the pairing expires (5mins)
    if (!walletKit) { return }

    const pairingExpiredListener = ({ topic }: { topic: string }) => {
      if (pairingTopic === topic) {
        // styledToast('Pairing expired. Please try again with new Connection URI', 'error')
        // ModalStore.close()
        walletKit.core.pairing.events.removeListener('pairing_expire', pairingExpiredListener)
      }
    }
    walletKit.once('session_proposal', () => {
      walletKit.core.pairing.events.removeListener('pairing_expire', pairingExpiredListener)
    })
    try {
      //setLoading(true)
      walletKit.core.pairing.events.on('pairing_expire', pairingExpiredListener)
      await walletKit.pair({ uri: connectionString })
    } catch (error) {
      console.error('Error connecting to wallet:', error)
      //styledToast((error as Error).message, 'error')
      //ModalStore.close()
    } finally {
      setConnectionString("")
    }
  }

  */