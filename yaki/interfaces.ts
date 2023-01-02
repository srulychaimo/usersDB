export interface User {
    id: string;
    userId: string;
    firstName: string;
    lastName: string;
    birthday: string;
    address: string;
}

export type UserKeys = keyof User

type Row = {
    [key in keyof User]: {
        size: number,
        indexInRow: number
    }
}

// [id,userId,birthday,firstName,lastName]
export const row: Row = {
    id: {
        indexInRow: 0,
        size: 36,
    },
    userId: {
        indexInRow: 1,
        size: 16,
    },
    birthday: {
        indexInRow: 2,
        size: 16,
    },
    firstName: {
        indexInRow: 3,
        size: 40
    },
    lastName: {
        indexInRow: 4,
        size: 40
    },
    address: {
        indexInRow: 5,
        size: 200
    }
}

export interface Operations {
    insert: (user: User) => Promise<boolean>;
    search?: (id: string) => User;
    update?: (user: User) => boolean;
    delete?: (id: string) => boolean
}