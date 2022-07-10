import {readdirSync, PathLike} from 'fs'
import { AdbClient } from 'adb-ts';
require('dotenv/config');

const env = process.env
const originPath = env.ORIGIN
const destinyPath = env.DESTINY
const adb = new AdbClient();
const numberOfFiles = 14


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

const mountFileList = (numberOfFiles: number) =>{
    const arquivos = readdirSync(originPath as PathLike)
    const arquivosSelecionados: string[] = []
    for (let index = 0; index < numberOfFiles; index++) {
        const selectedFile = arquivos[randomIntFromInterval(0, arquivos.length)]
        if(arquivosSelecionados.includes(selectedFile)){
            arquivosSelecionados.push(arquivos[randomIntFromInterval(0, arquivos.length)])
        }
        else{
            arquivosSelecionados.push(selectedFile)
        }
    }
    return arquivosSelecionados
}

const main = async () =>{
    if(originPath && destinyPath) {
        const fileList = mountFileList(numberOfFiles);
        const deviceId = await getDeviceId();
        console.log('Arquivos Selecionados', fileList)
        for (const nomeArquivo of fileList) {
            try {
                await uploadFile(deviceId, `${originPath}${nomeArquivo}`, `${destinyPath}${nomeArquivo}`)
                console.log(`File ${nomeArquivo} done!`)
            } catch (e) {
                console.log(`Fail to transfer file ${nomeArquivo}!`)
            }
        }
        console.log('All done!')
    }else{
        console.log('.env vars not defined')
    }
}

main()