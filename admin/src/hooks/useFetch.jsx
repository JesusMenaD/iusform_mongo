import { useState, useEffect } from 'react'

export const useFetch = (url, options = {}) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetch(url, options)
      const json = await response.json()
      setData(json)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }
  const refresh = () => fetchData()

  useEffect(() => {
    fetchData()
  }, [])

  return { data, error, loading, refresh }
}
