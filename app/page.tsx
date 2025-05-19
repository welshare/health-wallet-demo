import { AllWallets } from "./_/components/AllWallets";
import { ConnectButton } from "./_/components/ConnectButton";

export default function Home() {
  return (
    <div className="flex items-center justify-center p-8 flex-col space-y-8">
      <div className="max-w-2xl text-center space-y-8">
        <h1 className="text-5xl font-bold mb-4">Connect your wallet</h1>

        <p className="text-xl mb-6">
          Register for Your Long Covid Labs Survey Participation Reward
        </p>
      </div>
      <div>
        <p className="text-foreground/80">
          Thank you for contributing to our{" "}
          <a
            className="text-secondary"
            href="https://www.longcovidlabs.org/long-covid-patient-survey"
            target="_blank"
          >
            initial Long Covid survey
          </a>
          . As part of our community-first approach, survey participants will
          receive governance token rewards for their early involvement. If you
          completed the survey before <strong>May 15, 2025</strong>, you may be
          eligible for a token reward. Connect your web3 wallet or create a new
          one using your prefered social login. This step lets us link your
          survey submission to a wallet.
        </p>
      </div>

      <div>
        <p className="text-foreground/70">
          This step is only to register for potential eligibility - actual
          rewards will be distributed manually and communicated via email. If
          you don&apos;t hear from us, your survey submission may not qualify
          for this reward round.
        </p>
        <div className="flex justify-center mx-auto my-8">
          <AllWallets />
          <ConnectButton>connect, link or create wallet</ConnectButton>
        </div>
        <p>
          Connecting a wallet here does <strong>not</strong> guarantee a reward.
          LCL reserves the right to validate and determine eligibility
          case-by-case based on individual submissions.
        </p>
      </div>

      <div className="flex bg-primary/10 rounded-lg p-6 flex-1">
        <p className="text-primary-foreground font-medium">
          This reward is part of Long Covid Labs&apos; ongoing effort to empower
          patients through decentralized, community-owned research. We believe
          in data dignity, patient ownership, and collective healing. 💙
        </p>
      </div>
    </div>
  );
}

//zora
//0xa52ca0b6269414916b6f0fd0a0bb9fbebdfae248
//0x926954825a4f844b9e8bc829ceae73b53c20576e
//0x8abf3dab535d512cba820ee05adc72657def0f80
