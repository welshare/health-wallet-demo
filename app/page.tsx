import { SigninControl } from "./_/components/SigninControl";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Fullscreen backdrop image */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat bg-fixed opacity-40"
        style={{
          backgroundImage: "url('/tenants/claw-bg.webp')"
        }}
      />

      <div className="flex items-center justify-center p-8 flex-col space-y-8 relative z-10 text-base">
        <div className="max-w-2xl text-center space-y-8">
          <h1 className="text-5xl font-bold mb-4">Connect your wallet</h1>

          <p className="text-xl mb-6">
            Securely prove your survey participation and control your data.
          </p>
        </div>
        <div className="space-y-4">
          <p>
            To selectively disclose and reuse the information you're providing
            during the study, you're going to need a cryptographic keypair, also
            know as an account (or referred to as "wallet" sometimes).
          </p>
          <p>
            While being usable as a fully featured crypto wallet, signing up
            here is basically fully unrelated to interacting with a crypto
            currency - your account is simply a means of authentication against
            other system components that make use of blockchain technology or
            cryptography in general.
          </p>
          <div className="flex justify-center mx-auto my-8">
            <SigninControl />
          </div>
        </div>
      </div>
    </div>
  );
}
