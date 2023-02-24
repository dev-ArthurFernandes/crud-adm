import client from "./configuration";

const connectDatabase = async (): Promise<void> => {
    await client.connect()
}

export default connectDatabase