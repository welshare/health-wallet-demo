import Image from "next/image";

export default function Home() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="max-w-2xl text-center space-y-8">
        <div className="w-32 h-32 mx-auto  flex items-center justify-center">
          <span className="text-4xl">
            <Image src="/logo.png" alt="Logo" width={250} height={250} />
          </span>
        </div>

        <h1 className="text-5xl font-bold mb-4">Welshare &raquo; Wallet</h1>

        <p className="text-xl mb-6">
          safely store health related information, access cryptographic
          protocols, support research agents helping your conditions, globally.
        </p>

        <div className="bg-secondary/10 rounded-lg p-6 transform hover:scale-105 transition-transform duration-300">
          <p className="text-secondary font-medium">
            Lets collectively support global health research without losing
            control over our data.
          </p>
        </div>
      </div>
    </div>
  );
}
