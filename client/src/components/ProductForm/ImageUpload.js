import React, { useState } from 'react'
import Button from '../common/Button'
import Image from 'next/image'

const ImageUpload = ({ defaultValue, setValue, key = 'image' }) => {
  const [imageSrc, setImageSrc] = useState(defaultValue)
  const [loading, setLoading] = useState(false)
  const [uploadData, setUploadData] = useState()
  const handleOnChange = (changeEvent) => {
    const reader = new FileReader()
    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result)
      setUploadData(undefined)
    }
    reader.readAsDataURL(changeEvent.target.files[0])
  }

  const handleUpload = async (uploadEvent) => {
    uploadEvent.preventDefault()
    setLoading(true)
    const form = uploadEvent.currentTarget
    const fileInput = Array.from(form.elements).find(({ name }) => name === 'file')
    try {
      const formData = new FormData()
      // adding upload preset
      formData.append('upload_preset', 'gqv25gzj')

      for (const file of fileInput.files) {
        formData.append('file', file)
      }
      const res = await fetch('https://api.cloudinary.com/v1_1/scrapbook/image/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      setImageSrc(data.secure_url)
      setValue(key, data.secure_url)
      setUploadData(data)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleUpload}>
      <input
        name="file"
        type="file"
        onChange={handleOnChange}
        className="mb-3 w-full rounded-md border p-3 focus:border-sky-300 focus:ring-sky-300"
      />
      <div>
        {imageSrc && (
          <Image
            width={426}
            height={240}
            className="mb-2 aspect-video w-full rounded"
            src={imageSrc}
            alt=""
          />
        )}
        {imageSrc && !uploadData && !defaultValue && (
          <Button
            type="submit"
            variant="secondary"
            className="w-full"
            loading={loading}
            loadingText="Uploading..."
          >
            Upload
          </Button>
        )}
      </div>
    </form>
  )
}

export default ImageUpload
