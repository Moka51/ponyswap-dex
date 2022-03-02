import { useEffect, useState } from 'react'
import axios from 'axios'

type ApiResponse = {
  data: {
    [address: string]: {
      name: string
      symbol: string
      price:string
      price_BNB:string
    }
  }
  updated_at: string
}

/**
 * Due to Cors the api was forked and a proxy was created
 * @see https://github.com/pancakeswap/gatsby-pancake-api/commit/e811b67a43ccc41edd4a0fa1ee704b2f510aa0ba
 */
const api = 'https://pony-info-api.vercel.app/api/tokens'

const useGetPriceData = () => {
  const [data, setData] = useState<ApiResponse | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api)
        const res: ApiResponse = await response.json()
        console.log(res)
        setData(res)
      } catch (error) {
        console.error('Unable to fetch price data:', error)
      }
    }

    fetchData()
  }, [setData])

  return data
}

export const getBnbPrice = async () => {
  const url = "https://api.bscscan.com/api?module=stats&action=bnbprice&apikey=Q9ZQ3W73JY63ATR9Y5AIXZTGA3Q68TCZ1C"
  const response = await axios.get(url)
  const data = response.data.result
  return data.ethusd
}

export default useGetPriceData
