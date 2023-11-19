import axios from 'axios'

export const serverUrl = 'https://luke-used-cars-backend-19ea42e37e12.herokuapp.com/'

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

export async function getCarsFromSalePost(setCars) {
    try{
        const cars =  await axios.get(`${serverUrl}api/saleposts`)
        setCars(cars.data)
    } catch (error) {
        console.log(error)
    }
}

export function addComma(number) {
    const decimalSplit = `${number}`.split(".")

    const numberString = decimalSplit[0]
    let decimalString = `.${decimalSplit[1]}`
    if (decimalString.includes(`undefined`)) decimalString = ""

    if (numberString.length <= 3) return `${numberString}${decimalString}`

    const reversed = numberString.split("").reverse()
    let comma = 0
    for (let i = 0; i < reversed.length; i++) {
        if (comma === 3) {
            reversed[i] = `${reversed[i]},`
            comma = 0
        }
        comma++
    }

    return `${reversed.reverse().join("")}${decimalString}`
}