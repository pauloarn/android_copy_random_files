import {readdirSync, PathLike} from 'fs'
import { AdbClient } from 'adb-ts';
require('dotenv/config');

const env = process.env
const originPath = env.ORIGIN
const destinyPath = env.DESTINY
const adb = new AdbClient();
const numberOfFiles = 70


//Functiont o get the Id of the first device found
const getDeviceId = async () => {
    const listOfDevices = await adb.listDevices()
    return listOfDevices[0].id
}

//Function to get random value from interval
const randomIntFromInterval = (min: number, max: number) =>{
    return Math.floor(Math.random() * (max - min + 1) + min)
}

//Function to upload file to Device
const uploadFile = async (deviceId: string, originPath: string, destinyPah: string) =>{
    try{
        await adb.pushFile(deviceId, originPath, destinyPah)
    }catch (e: any){
        throw new Error(e.toString())
    }
}

//Function to mount the file list based on the amount of files provided and the list of files on folder
const mountFileList = (numberOfFiles: number) =>{
    const files = readdirSync(originPath as PathLike)
    const selectedFiles: string[] = []
    for (let index = 0; index < numberOfFiles; index++) {
        const selectedFile = files[randomIntFromInterval(0, files.length)]
        if(selectedFiles.includes(selectedFile)){
            selectedFiles.push(files[randomIntFromInterval(0, files.length)])
        }
        else{
            selectedFiles.push(selectedFile)
        }
    }
    return selectedFiles
}

const main = async () =>{
    if(originPath && destinyPath) {
        const fileList = mountFileList(numberOfFiles);
        const deviceId = await getDeviceId();
        console.log('Selected files', fileList)
        for (const fileName of fileList) {
            try {
                await uploadFile(deviceId, `${originPath}${fileName}`, `${destinyPath}${fileName}`)
                console.log(`File ${fileName} done!`)
            } catch (e) {
                console.log(`Fail to transfer file ${fileName}!`)
            }
        }
        console.log('All done!')
    }else{
        console.log('.env vars not defined')
    }
}

main()
