'use client'

import { useEffect, useState } from 'react'

export default function Home() {
  const [datas, setDatas] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/scrap')
        
        if (!response.ok) {
          throw new Error('wrong response')
        }
        
        const result = await response.json()

        console.log('scraped data:', result.data)
        setDatas(result.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h1>Scraped Data</h1>
      <ul>
        {datas.map((data, index) => (
          <li key={index}>{data}</li>
        ))}
      </ul>
    </div>
  )
}
