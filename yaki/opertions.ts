import { Operations } from "./interfaces"
import _insertHandler from "./insert"
import { FileHandle } from "fs/promises";

function operations(usersFH: FileHandle, indexFH: FileHandle, inMemoryIndex: Map<string, number>): Operations {
    const insertHandler = _insertHandler(usersFH, indexFH, inMemoryIndex)
    return {
        insert: async (user) => {
            return insertHandler(user)
        },
        // search: function(id) {
    
        //     return {}
        // },
        // update: function() {
    
        // },
        // delete: function() {
    
        // }
    }
}


export default operations;