import client from "./configuration";

const connectDatabase = async (): Promise<void> => {
    await client.connect()
    console.log("Database connected!")
}

export default connectDatabase