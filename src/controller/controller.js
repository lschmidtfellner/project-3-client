import axios from 'axios'

export const serverUrl = 'http://127.0.0.1:8000/'//'https://luke-used-cars-backend-19ea42e37e12.herokuapp.com/'

export function uploadImage(file, setFileData, setPostReady) {
    if (file.length === 0) {
        setPostReady(false)
        return false
    }

    const cloudinaryName = 'djwk2wjue'
    const uploadPreset = 'nyfw81ky'

    const formData = new FormData()
    formData.append("file", file[0])
    formData.append("upload_preset", uploadPreset)

    axios.post(`https://api.cloudinary.com/v1_1/${cloudinaryName}/image/upload`, formData)
        .then((response) => {
            const data = response.data
            setFileData({
                filename: data.original_filename,
                format: data.format,
                width: data.width,
                height: data.height,
                bytes: data.bytes,
                url: data.url
            })
            setPostReady(true)
        })
}

export function fileSizeCheck(fileSize) {
    const fileLimit = 1000000 //1MB
    if (fileSize > fileLimit) return false
    return true
}