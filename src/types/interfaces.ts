export interface IFormInput {
    firstName?: string;
    lastName?: string;
    age?: number;
}

type Author = {
    username: string,
    image: string,
    following: boolean
}

export interface IPost {
    author?: Author,
    body?: string,
    createdAt?: string,
    description?: string,
    favorited?: boolean,
    favoritesCount?: number,
    slug?: string,
    tagList: string[],
    title?: string,
    updatedAt?: string
}