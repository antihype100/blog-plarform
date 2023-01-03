import {PostLink} from "./PostLink/PostLink";
import {Pagination} from "../Pagination/Pagination";
import './Posts.scss'
import {useGetPostsQuery} from "../../redux/reducers/postsApi";
import {FunctionComponent} from "react";
import {useTypedSelector} from "../../hooks/useTypedSelector";

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

const Posts: FunctionComponent = () => {

    const {page} = useTypedSelector(state => state.page);
    const {data, isSuccess} = useGetPostsQuery((page - 1) * 5)


    let posts
    if (isSuccess) {
        console.log(data)
        posts = data.articles.map((el: IPost) => {
            return (
                <li key={el.slug}>
                    <PostLink {...el}/>
                </li>
            )
        })
    }
    return (
        <div className='postsWrapper'>
            <ul>
                {posts}
            </ul>
            <Pagination/>
        </div>
    )
}

export {Posts}