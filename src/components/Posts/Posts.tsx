import {PostLink} from "./PostLink/PostLink";
import {Pagination} from "../Pagination/Pagination";
import './Posts.scss'
import {useGetPostsQuery} from "../../redux/reducers/postsApi";
import {FunctionComponent} from "react";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {IPost} from "../../types/interfaces";
import {setMaxCountPages} from "../../redux/reducers/paginationSlice";
import {useDispatch} from "react-redux";
import {findRenderedComponentWithType} from "react-dom/test-utils";


const Posts: FunctionComponent = () => {

    const {page} = useTypedSelector(state => state.page);
    const {data, isSuccess} = useGetPostsQuery((page - 1) * 5)
    const dispatch = useDispatch()


    let posts
    if (isSuccess) {
        const maxPages = Math.floor(Number(data.articlesCount / 5 + 1))
        if (maxPages === 0) {
            return <h1>Сегодня постов нет, приходите завтра</h1>
        }
        dispatch(setMaxCountPages(maxPages))
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

            <ul>{posts}</ul>

            <Pagination/>

        </div>
    )
}

export {Posts}