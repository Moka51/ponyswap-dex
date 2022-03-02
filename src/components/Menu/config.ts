import { MenuEntry } from '@ponyswapdex/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    initialOpenState: true,
    items: [
      {
        label: 'Exchange',
        href: '/swap',
      },
      {
        label: 'Liquidity',
        href: '/pool',
      },
    ],
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: 'Pools',
    icon: 'PoolIcon',
    href: '/pools',
  },
  {
    label: "Tracker",
    icon: "FarmIcon",
    href: "/tracker",
  },
  // {
  //   label: 'Jungles',
  //   icon: 'JungleIcon',
  //   href: '/jungles',
  // },
  // {
  //   label: 'Lottery',
  //   icon: 'TicketIcon',
  //   href: '/lottery',
  // },
  // {
  //   label: 'IPO',
  //   icon: 'IfoIcon',
  //   href: '/ipo',
  // },
  // {
  //   label: 'Referrals',
  //   icon: 'ReferralIcon',
  //   href: '/referrals',
  // },
  {
    label: 'Features',
    icon: 'FeatureIcon',
    items: [
      {
        label: 'Automatic LP',
        href: 'https://docs.ponyswap.com/tokenomics/automatic-liquidity',
      },
      {
        label: 'Automatic Burning',
        href: 'https://docs.ponyswap.com/tokenomics/automatic-burning',
      },
      {
        label: 'Harvest Lockup',
        href: 'https://docs.ponyswap.com/tokenomics/harvest-lockup',
      },
      {
        label: 'Anti-Whale',
        href: 'https://docs.ponyswap.com/tokenomics/anti-whale',
      },
    ],
  },
  // {
  //   label: 'Price Charts',
  //   icon: 'ChartIcon',
  //   items: [
  //     {
  //       label: 'DexGuru',
  //       href: 'https://dex.guru/token/0x1f546ad641b56b86fd9dceac473d1c7a357276b7-bsc',
  //     },
  //     {
  //       label: 'PooCoin',
  //       href: 'https://poocoin.app/tokens/0x1f546ad641b56b86fd9dceac473d1c7a357276b7',
  //     },
  //     {
  //       label: 'BoggedFinance',
  //       href: 'https://charts.bogged.finance/?token=0x1f546aD641B56b86fD9dCEAc473d1C7a357276B7',
  //     },
  //     {
  //       label: 'DexTools',
  //       href: 'https://www.dextools.io/app/pancakeswap/pair-explorer/0xecc11a78490866e0073ebc4a4dcb6f75673c8685',
  //     },
  //   ],
  // },
  {
    label: 'Listings',
    icon: 'ListingIcon',
    items: [
      {
        label: 'BscScan',
        href: 'https://bscscan.com/token/0x1f546ad641b56b86fd9dceac473d1c7a357276b7',
      },
      {
        label: 'DappRadar',
        href: 'https://dappradar.com/binance-smart-chain/defi/ponyswap',
      },
      {
        label: 'CoinGecko',
        href: 'https://www.coingecko.com/en/coins/ponyswap',
      },
      {
        label: 'CoinMarketCap',
        href: 'https://coinmarketcap.com/currencies/ponyswap/',
      },
      {
        label: 'LiveCoinWatch',
        href: 'https://www.livecoinwatch.com/price/PonySwap-PONY',
      },
      {
        label: 'Vfat',
        href: 'https://vfat.tools/bsc/pony',
      },
    ],
  },
  // {
  //   label: 'Analytics',
  //   icon: 'InfoIcon',
  //   items: [
  //     {
  //       label: 'Overview',
  //       href: 'https://ponyswap.info',
  //     },
  //     {
  //       label: 'Tokens',
  //       href: 'https://ponyswap.info/tokens',
  //     },
  //     {
  //       label: 'Pairs',
  //       href: 'https://ponyswap.info/pairs',
  //     },
  //     {
  //       label: 'Accounts',
  //       href: 'https://ponyswap.info/accounts',
  //     },
  //   ],
  // },
  // {
  //   label: 'IFO',
  //   icon: 'IfoIcon',
  //   href: 'https://pancakeswap.finance/ifo',
  // },
  {
    label: 'More',
    icon: 'MoreIcon',
    items: [
      // {
      //   label: 'Voting',
      //   href: 'https://voting.pancakeswap.finance',
      // },
      {
        label: 'Github',
        href: 'https://github.com/ponyswap',
      },
      {
        label: 'Docs',
        href: 'https://docs.ponyswap.com',
      },
      {
        label: 'Roadmap',
        href: 'https://docs.ponyswap.com/roadmap',
      },
      {
        label: 'Blog',
        href: 'https://ponyswap.medium.com',
      },
      {
        label: 'Voting',
        href: 'https://voting.ponyswap.com/',
      },
    ],
  },
]

export default config
