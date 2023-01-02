import { row, UserKeys } from "./interfaces"

function prepareRow() {

}

export function getRoWSize() {
    return Object.keys(row).reduce((p, c) => {
        const entry = row[c as UserKeys];
        return p + entry.size;
    }, 0)
}

