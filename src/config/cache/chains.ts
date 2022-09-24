import {
  ChainInfo,
  FEATURES,
  GAS_PRICE_TYPE,
  getChainsConfig,
  RPC_AUTHENTICATION,
} from '@gnosis.pm/safe-react-gateway-sdk'
import { setWeb3ReadOnly } from 'src/logic/wallets/getWeb3'

// Cache is required as loading Redux store directly is an anit-pattern
let chains: ChainInfo[] = []

export const getChains = (): ChainInfo[] => chains

export const loadChains = async () => {
  const { results = [] } = await getChainsConfig()
  chains = [
    {
      transactionService: 'https://safe-transaction.mainnet.staging.gnosisdev.com',
      chainId: '21',
      chainName: 'Cortex Chain',
      shortName: 'ctxc',
      l2: false,
      description: 'Cortex chain by cortexlabs.ai',
      rpcUri: {
        authentication: RPC_AUTHENTICATION.NO_AUTHENTICATION,
        value: 'https://cortex.logistic.ml/',
      },
      safeAppsRpcUri: {
        authentication: RPC_AUTHENTICATION.NO_AUTHENTICATION,
        value: 'https://cortex.logistic.ml/',
      },
      publicRpcUri: {
        authentication: RPC_AUTHENTICATION.NO_AUTHENTICATION,
        value: 'https://cortex.logistic.ml/',
      },
      blockExplorerUriTemplate: {
        address: 'https://cerebro.logistic.ml/address/{{address}}',
        txHash: 'https://cerebro.logistic.ml/tx/{{txHash}}',
        api: 'https://cerebro.logistic.ml/api?module={{module}}&action={{action}}&address={{address}}&apiKey={{apiKey}}',
      },
      nativeCurrency: {
        name: 'CTXC',
        symbol: 'CTXC',
        decimals: 18,
        logoUri: 'https://artemis.logistic.ml/cortex_logo.png',
      },
      theme: {
        textColor: '#001428',
        backgroundColor: '#DDDDDD',
      },
      ensRegistryAddress: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
      gasPrice: [
        {
          type: GAS_PRICE_TYPE.FIXED,
          weiValue: '1000000000',
        },
      ],
      disabledWallets: ['lattice'],
      features: [
        FEATURES.CONTRACT_INTERACTION,
        FEATURES.DOMAIN_LOOKUP,
        FEATURES.EIP1559,
        FEATURES.ERC721,
        FEATURES.SAFE_APPS,
        FEATURES.SAFE_TX_GAS_OPTIONAL,
        FEATURES.SPENDING_LIMIT,
        FEATURES.TX_SIMULATION,
      ],
    },
  ]
  console.log(chains)
  // Set the initail web3 provider after loading chains
  setWeb3ReadOnly()
}

// An empty template is required because `getChain()` uses `find()` on load
export const emptyChainInfo: ChainInfo = {
  transactionService: '',
  chainId: '',
  chainName: '',
  shortName: '',
  l2: false,
  description: '',
  rpcUri: { authentication: '' as RPC_AUTHENTICATION, value: '' },
  publicRpcUri: { authentication: '' as RPC_AUTHENTICATION, value: '' },
  safeAppsRpcUri: { authentication: '' as RPC_AUTHENTICATION, value: '' },
  blockExplorerUriTemplate: {
    address: '',
    txHash: '',
    api: '',
  },
  nativeCurrency: {
    name: '',
    symbol: '',
    decimals: 0,
    logoUri: '',
  },
  theme: { textColor: '', backgroundColor: '' },
  ensRegistryAddress: '',
  gasPrice: [],
  disabledWallets: [],
  features: [],
}
