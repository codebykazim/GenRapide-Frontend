import axios from 'axios'

export async function fetchPdfData() {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/rewriter/files/42`)
    console.log('API Response:', response.data)

    return response.data.data.reverse().map((item, index) => ({
      id: index + 1,
      name: item.file_name,
      pages: item.pages,
      size: item.file_size,
      date: item.created_at,
      extractedData: item.data ? JSON.parse(item.data) : []
    }))
  } catch (err) {
    console.error('Error occurred:', err.response?.data || err.message)
    throw new Error('An error occurred while fetching data')
  }
}

