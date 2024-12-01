import axios from 'axios'

export async function downloadPdf(pdf) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/rewriter/download-blob/${pdf.name}`,
      {
        params: { documentId: pdf.id },
        responseType: 'blob',
      }
    )

    const fileURL = window.URL.createObjectURL(new Blob([response.data]))
    const fileLink = document.createElement('a')
    fileLink.href = fileURL
    fileLink.setAttribute('download', pdf.name || 'document.pdf')
    document.body.appendChild(fileLink)
    fileLink.click()
    fileLink.parentNode.removeChild(fileLink)

    console.log('PDF download triggered successfully')
  } catch (error) {
    console.error('Error downloading PDF:', error)
  }
}

export async function downloadWord(pdf) {
  try {
    const pdfFileName = pdf.name?.replace(/\.pdf$/i, "")

    if (!pdfFileName) {
      console.error("PDF name is missing or invalid.")
      return
    }

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/rewriter/download-pdf/${pdf.name}`,
      { responseType: "blob" }
    )

    const contentType = response.headers["content-type"]
    if (!contentType?.includes("application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
      console.error("Unexpected file type received:", contentType)
      return
    }

    const fileURL = window.URL.createObjectURL(
      new Blob([response.data], { type: contentType })
    )
    const fileLink = document.createElement("a")
    fileLink.href = fileURL
    fileLink.setAttribute("download", `${pdfFileName}.docx`)
    document.body.appendChild(fileLink)
    fileLink.click()
    fileLink.parentNode.removeChild(fileLink)

    console.log("Word document download triggered successfully")
  } catch (error) {
    console.error("Error downloading Word document:", error)
  }
}

