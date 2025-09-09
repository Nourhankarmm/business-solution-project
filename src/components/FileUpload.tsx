'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { X, Upload, ImageIcon, Video, File, CheckCircle } from 'lucide-react'

interface FileUploadProps {
  onFilesChange: (files: File[]) => void
  maxFiles?: number
  maxSize?: number // in MB
  acceptedTypes?: string[]
  title?: string
  description?: string
}

export default function FileUpload({
  onFilesChange,
  maxFiles = 10,
  maxSize = 10, // 10MB default
  acceptedTypes = ['image/*', 'video/*', '.pdf', '.doc', '.docx'],
  title = "Upload Media Files",
  description = "Upload photos, videos, or documents for your portfolio"
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<Record<string, string>>({})
  const [error, setError] = useState<string>('')
  const [dragging, setDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return <ImageIcon className="w-5 h-5" />
    if (fileType.startsWith('video/')) return <Video className="w-5 h-5" />
    if (fileType.includes('pdf')) return <File className="w-5 h-5" />
    if (fileType.includes('word') || fileType.includes('document')) return <File className="w-5 h-5" />
    return <File className="w-5 h-5" />
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const validateFile = (file: File): { valid: boolean; error?: string } => {
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      return {
        valid: false,
        error: `File size exceeds ${maxSize}MB limit`
      }
    }

    // Check file type
    const isAccepted = acceptedTypes.some(type => {
      if (type.startsWith('.')) {
        return file.name.toLowerCase().endsWith(type.toLowerCase())
      }
      return file.type.match(type.replace('*', '.*'))
    })

    if (!isAccepted) {
      return {
        valid: false,
        error: `File type not supported. Accepted types: ${acceptedTypes.join(', ')}`
      }
    }

    // Check maximum files
    if (files.length >= maxFiles) {
      return {
        valid: false,
        error: `Maximum ${maxFiles} files allowed`
      }
    }

    return { valid: true }
  }

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return

    const newFiles: File[] = []
    const newPreviews: Record<string, string> = { ...previews }
    const errors: string[] = []

    Array.from(selectedFiles).forEach(file => {
      const validation = validateFile(file)
      if (validation.valid) {
        newFiles.push(file)
        
        // Create preview for images
        if (file.type.startsWith('image/')) {
          const reader = new FileReader()
          reader.onload = () => {
            newPreviews[file.name] = reader.result as string
            setPreviews(prev => ({ ...prev, [file.name]: reader.result as string }))
          }
          reader.readAsDataURL(file)
        }
      } else if (validation.error) {
        errors.push(`${file.name}: ${validation.error}`)
      }
    })

    if (errors.length > 0) {
      setError(errors.join('\n'))
      setTimeout(() => setError(''), 5000)
    }

    if (newFiles.length > 0) {
      const updatedFiles = [...files, ...newFiles]
      setFiles(updatedFiles)
      onFilesChange(updatedFiles)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(false)
  }

  const removeFile = (fileName: string) => {
    const updatedFiles = files.filter(file => file.name !== fileName)
    setFiles(updatedFiles)
    onFilesChange(updatedFiles)
    
    // Remove preview if exists
    if (previews[fileName]) {
      const newPreviews = { ...previews }
      delete newPreviews[fileName]
      setPreviews(newPreviews)
    }
  }

  const handleInputClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertDescription className="whitespace-pre-line">{error}</AlertDescription>
          </Alert>
        )}

        {/* Drop Zone */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragging 
              ? 'border-blue-400 bg-blue-50' 
              : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleInputClick}
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <Upload className="w-12 h-12 text-gray-400" />
            <div>
              <p className="font-medium text-gray-900">
                Drag & drop files here or click to browse
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Max {maxFiles} files • Max {maxSize}MB per file
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Supported: Images, Videos, PDF, Word documents
              </p>
            </div>
            <Button type="button" variant="outline" size="sm">
              Select Files
            </Button>
          </div>
          
          <Input
            ref={fileInputRef}
            type="file"
            multiple
            accept={acceptedTypes.join(',')}
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
          />
        </div>

        {/* Uploaded Files List */}
        {files.length > 0 && (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label>Uploaded Files ({files.length}/{maxFiles})</Label>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                <CheckCircle className="w-3 h-3 mr-1" />
                Ready to upload
              </Badge>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {files.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between p-3 border rounded-lg bg-white hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="text-blue-600">
                      {getFileIcon(file.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(file.size)} • {file.type}
                      </p>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile(file.name)}
                    className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Image Previews Grid */}
            {Object.keys(previews).length > 0 && (
              <div className="mt-4">
                <Label>Image Previews</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                  {Object.entries(previews).map(([fileName, previewUrl]) => (
                    <div key={fileName} className="relative group">
                      <Image
                        src={previewUrl}
                        alt={`Preview of ${fileName}`}
                        width={96}
                        height={96}
                        className="w-full h-24 object-cover rounded-lg border"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity rounded-lg flex items-center justify-center">
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                          onClick={() => removeFile(fileName)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Upload Progress (Simulated) */}
        {files.length > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Upload Progress</span>
              <span className="text-gray-500">Simulated</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: '100%' }}
              />
            </div>
            <div className="text-xs text-gray-500 text-center">
              Files will be uploaded to cloud storage when you save your profile
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
