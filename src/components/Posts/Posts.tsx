import {PostLink} from "./PostLink/PostLink";
import {Pagination} from "../Pagination/Pagination";
import './Posts.scss'

const Posts = () => {
    const posts = [1, 2, 3, 4, 5].map(el => {
        return (
            <li key={el}>
                <PostLink id={el}/>
            </li>
        )
    })
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