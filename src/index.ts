import {readdirSync, PathLike} from 'fs'
import { AdbClient } from 'adb-ts';
require('dotenv/config');

const env = process.env
const caminhoOrigem = env.ORIGIN
const caminhoDestino = env.DESTINY
const adb = new AdbClient();
const numeroDeArquivos = 14


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

const montaListaDeArquivos = (numberOfFiles: number) =>{
    const arquivos = readdirSync(caminhoOrigem as PathLike)
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
    if(caminhoOrigem && caminhoDestino) {
        const listaDeArquivos = montaListaDeArquivos(numeroDeArquivos);
        const idDispositivo = await getDeviceId();
        console.log('Arquivos Selecionados', listaDeArquivos)
        for (const nomeArquivo of listaDeArquivos) {
            try {
                await uploadFile(idDispositivo, `${caminhoOrigem}${nomeArquivo}`, `${caminhoDestino}${nomeArquivo}`)
                console.log(`Arquivo ${nomeArquivo} finalizado`)
            } catch (e) {
                console.log(`Falha ao transferir arquivo ${nomeArquivo}`)
            }
        }
        console.log('Transferencia Finalizada')
    }else{
        console.log('Variaveis de ambiente não definidas')
    }
}

main()