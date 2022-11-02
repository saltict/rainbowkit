import {Chain, Wallet} from "@rainbow-me/rainbowkit";
import {SubWalletConnector} from "@subwallet/wagmi-connector";

export interface SWWalletOptions {
  chains: Chain[];
  shimDisconnect?: boolean;
}

export const subWalletWallet = ({
  chains,
  shimDisconnect,
}: SWWalletOptions): Wallet => ({
  id: 'subwallet',
  name: 'SubWallet',
  iconUrl: async () => (await import('./subwallet.svg')).default,
  iconBackground: '#fff',
  hidden: ({ wallets }) =>
    wallets.some(
      wallet =>
        wallet.installed &&
        (wallet.connector instanceof SubWalletConnector ||
          wallet.id === 'coinbase')
    ),
  createConnector: () => ({
    connector: new SubWalletConnector({
      chains,
      options: { shimDisconnect },
    }),
  }),
});
