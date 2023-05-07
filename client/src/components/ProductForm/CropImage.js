import React, { useState, useRef } from 'react'
import Button from '../common/Button'
import Image from 'next/image'
import clsx from 'clsx'

const ImageUpload = ({ defaultValue, setValue, name = 'image' }) => {
  const [imageSrc, setImageSrc] = useState(defaultValue)
  const [loading, setLoading] = useState(false)
  const [uploadData, setUploadData] = useState()
  const [croppedImage, setCroppedImage] = useState()
  const [isCropping, setIsCropping] = useState(false)
  const [cropDimensions, setCropDimensions] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })
  const canvasRef = useRef(null)

  const handleOnChange = (changeEvent) => {
    const reader = new FileReader()
    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result)
      setUploadData(undefined)
      setIsCropping(true)
    }
    reader.readAsDataURL(changeEvent.target.files[0])
  }

  const handleCropImage = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const { x, y, width, height } = cropDimensions

    const scaleX = imageSrc.width / canvas.width
    const scaleY = imageSrc.height / canvas.height

    const cropX = Math.round(x * scaleX)
    const cropY = Math.round(y * scaleY)
    const cropWidth = Math.round(width * scaleX)
    const cropHeight = Math.round(height * scaleY)

    canvas.width = cropWidth
    canvas.height = cropHeight

    ctx.drawImage(imageSrc, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight)

    setCroppedImage(canvas.toDataURL('image/jpeg'))
    setIsCropping(false)
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
      setValue(name, data.secure_url)
      setUploadData(data)
      setImageSrc(undefined)
      setCroppedImage(undefined)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  const handleCancelCrop = () => {
    setIsCropping(false)
    setImageSrc(undefined)
  }

  const handleImageLoad = (event) => {
    setCropDimensions({
      x: 0,
      y: 0,
      width: event.target.width,
      height: event.target.height,
    })
  }

  const handleCanvasMouseMove = (event) => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    const scaleX = imageSrc.width / canvas.width
    const scaleY = imageSrc.height / canvas.height
    // Calculate mouse position on canvas
    const mouseX = (event.clientX - rect.left) * scaleX
    const mouseY = (event.clientY - rect.top) * scaleY

    // Calculate rectangle coordinates
    const rectX = Math.min(startX, mouseX)
    const rectY = Math.min(startY, mouseY)
    const rectWidth = Math.abs(startX - mouseX)
    const rectHeight = Math.abs(startY - mouseY)

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw image
    ctx.drawImage(imageSrc, 0, 0, canvas.width, canvas.height)

    // Draw rectangle
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 2
    ctx.strokeRect(rectX, rectY, rectWidth, rectHeight)

    // Set crop data
    setCropData({
      x: rectX * scaleX,
      y: rectY * scaleY,
      width: rectWidth * scaleX,
      height: rectHeight * scaleY,
    })
  }

  const handleCanvasMouseUp = (event) => {
    setIsCropping(false)
  }
  const handleCanvasMouseDown = (event) => {
    setIsCropping(false)
  }

  const handleCrop = async () => {
    setLoading(true)
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    // Create cropped image
    const croppedImage = document.createElement('canvas')
    croppedImage.width = cropData.width
    croppedImage.height = cropData.height
    croppedImage
      .getContext('2d')
      .drawImage(
        imageSrc,
        cropData.x,
        cropData.y,
        cropData.width,
        cropData.height,
        0,
        0,
        cropData.width,
        cropData.height
      )

    try {
      // Upload cropped image
      const formData = new FormData()
      // adding upload preset
      formData.append('upload_preset', 'gqv25gzj')
      formData.append('file', croppedImage.toDataURL('image/jpeg', 0.9))

      const res = await fetch('https://api.cloudinary.com/v1_1/scrapbook/image/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      setImageSrc(data.secure_url)
      setValue(name, data.secure_url)
      setUploadData(data)
    } catch (error) {
      console.log(error)
    }

    setLoading(false)
  }
  return (
    <form className="relative">
      <input
        name="file"
        type="file"
        onChange={handleOnChange}
        className="mb-3 w-full rounded-md border p-3 focus:border-sky-300 focus:ring-sky-300"
      />
      {imageSrc && (
        <>
          <canvas
            ref={canvasRef}
            width={name === 'profileImage' ? 426 : 640}
            height={name === 'profileImage' ? 426 : 360}
            className={clsx(
              'mb-2 w-full rounded',
              name === 'profileImage' ? 'aspect-square' : 'aspect-video'
            )}
            onMouseDown={handleCanvasMouseDown}
            onMouseMove={isCropping ? handleCanvasMouseMove : undefined}
            onMouseUp={handleCanvasMouseUp}
            onMouseLeave={handleCanvasMouseUp}
          />
          {!uploadData && !defaultValue && (
            <Button
              type="button"
              variant="secondary"
              className="w-full"
              loading={loading}
              loadingText="Cropping..."
              onClick={handleCropImage}
            >
              Crop
            </Button>
          )}
        </>
      )}

      {imageSrc && !uploadData && !defaultValue && (
        <Button
          type="submit"
          variant="secondary"
          className="w-full"
          loading={loading}
          loadingText="Uploading..."
          onClick={handleUpload}
        >
          Upload
        </Button>
      )}
    </form>
  )
}

export default ImageUpload
