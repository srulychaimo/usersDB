import { User } from "./interfaces"
import { FileHandle } from "fs/promises";
import { getRoWSize } from "./loadIndex"

const LINE_SIZE = getRoWSize();

function insert(usersFH: FileHandle, indexFH: FileHandle, inMemoryIndex: Map<string, number>) {
    /**
     * 
     */
    async function insertUserIntoFile(user: User): Promise<number> {
        // stats file. => row number
        const { size } = await usersFH.stat();
        // append to file

        const lineNumber = size / LINE_SIZE;
        return lineNumber;
    }

    async function insertUserIntoIndex(id: string, location: number) {
        // append to index file
        // set user in in-memory map 
    }
    /**
     * insert a new user into the system
     * 1. insert into users file
     * 2. insert into index.
     * 
     * @param user 
     * @returns 
     */
    return async function insert(user: User): Promise<boolean> {
        try{
            const location = await insertUserIntoFile(user);
            await insertUserIntoIndex(user.id, location);
            return true;
        } catch(e) {
            console.error(e);
            return false;
        }
    }
}


export default insert;