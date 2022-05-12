import mongoose, { ConnectionStates } from 'mongoose'

let status: ConnectionStates = ConnectionStates.disconnected
const url = process.env.MONGO_URL

const connect = async (): Promise<void> => {
  if (!url) {
    throw new Error('Configurar string de conexión en variable de entorno')
  }
  
  if (status === ConnectionStates.connected) {
    console.log('Ya existe una conexión abierta')
    return
  }
  
  await mongoose.connect(url)
  status = ConnectionStates.connected
  console.log('Conectado a MongoDB: ', url)
  console.log(`Conexiones activas: ${mongoose.connections.length}`)
}

const disconnect = async () => {
  if(status !== ConnectionStates.disconnected) {
    await mongoose.disconnect()
    status = ConnectionStates.disconnected
    console.log('Desconectado de MongoDB')
  }
}

export const db = {
  connect,
  disconnect
}