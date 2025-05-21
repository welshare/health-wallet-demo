"use client";

import * as blockies from "blockies-ts";
import clsx from "clsx";

interface EthAvatarProps {
  address: string;
  className?: string;
}

export const EthAvatar = ({ address, className }: EthAvatarProps) => {
  const imgSrc = blockies.create({ seed: address.toLowerCase() }).toDataURL();
  return (
    <img
      src={imgSrc}
      alt="Eth Avatar"
      className={clsx("align-middle rounded-full h-4 w-4", className)}
    />
  );
};
