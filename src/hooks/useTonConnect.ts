import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { Sender } from "ton-core";

export function useTonConnect(): { sender: Sender; connected: boolean } {
  const [tonConnectUI] = useTonConnectUI();
  const friendlyAddress = useTonAddress();

  return {
    friendlyAddress,
    sender: {
      send: async (address, amount, payload) => {
        tonConnectUI.sendTransaction({
          messages: [
            {
              address: address.toString(),
              amount: amount.toString(),
              payload: payload.toBoc().toString("base64"),
            },
          ],
          validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
        });
      },
    },
    connected: tonConnectUI.connected,
  };
}
