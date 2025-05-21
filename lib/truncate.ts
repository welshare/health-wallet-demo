import { Address } from "viem";

export default function truncateEthAddress(
  address: Address,
  front = 4,
  back = 6,
) {
  return `${address.substring(0, 2 + front)}…${address.substring(
    address.length - back,
  )}`;
}
