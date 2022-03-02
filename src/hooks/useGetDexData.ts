import { useEffect, useState } from 'react'
import axios from 'axios'

type ApiResponse = {
  data: {
    [address: string]: {
      total_liquidity_BNB: string;
      total_liquidity_USD: string;
      total_volume_BNB: string;
      total_volume_USD: string;
      volume_BNB: string;
      volume_USD: string;
      tx_count: number;
    }
  }
  updated_at: string
}

const api = 'https://pony-info-api.vercel.app/api/stats'

const useGetDexData = () => {
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

export default useGetDexData
