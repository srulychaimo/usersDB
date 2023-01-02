import { open } from "fs/promises";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
const countLines = async (fd) => {
    let numberOfLines = 0;
    for await (const line of fd.readLines()) {
        numberOfLines++;
    }
    return numberOfLines - 1;
};
export const addIndex = async (id) => {
    try {
        const dataFd = await open("./users.txt", "r");
        const idIndexFd = await open("./idIndex.txt", "a+");
        const stat = await countLines(dataFd);
        await idIndexFd.write(`${id}:${stat}\n`);
    }
    catch (err) {
        console.error(`${err}`.red);
    }
};
export const layout = {
    id: {
        start: 0,
        length: 36,
    },
    firstName: {
        start: 37,
        length: 10,
    },
    lastName: {
        start: 48,
        length: 10,
    },
    username: {
        start: 59,
        length: 10,
    },
    age: {
        start: 70,
        length: 2,
    },
    emails: {
        start: 73,
        length: 30,
    },
    address: {
        start: 104,
        length: 100,
    },
    phone: {
        start: 205,
        length: 10,
    },
    website: {
        start: 216,
        length: 20,
    },
    hobbies: {
        start: 237,
        length: 41,
    },
};
export const handleAction = async (action, index) => {
    const dataFd = await open("./users.txt", "r");
    const rl = readline.createInterface({ input, output, terminal: false });
    if (action === "all") {
        const buf = Buffer.alloc(280);
        await dataFd.read(buf, 0, 280, Number(index[1]) * 280);
        const resStr = buf.toString("utf-8");
        for (const item of resStr.split("|")) {
            console.log(`${item.trimEnd()}`.green);
        }
        return;
    }
    if (action === "filed") {
        let field = await rl.question("What is the filed of the user that u want to get ? ".yellow);
        while (!(field in layout)) {
            field = await rl.question("The searched filed must be one of these: ('firstName' | 'lastName' | 'username' | 'age' | 'emails' | 'address' | 'phone' | 'website' | 'hobbies') ? "
                .red);
        }
        const buf = Buffer.alloc(layout[field].length);
        await dataFd.read(buf, 0, layout[field].length, Number(index[1]) * 280 + layout[field].start);
        console.log(buf.toString("utf-8").green);
        return;
    }
};
