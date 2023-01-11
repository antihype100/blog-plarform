import {Link, useNavigate, useParams} from "react-router-dom";
import './Post.scss'
import {FunctionComponent, useEffect, useState} from "react";
import warning from './warning.svg'
import { parseISO } from 'date-fns'
import {useDeletePostMutation, useGetPostQuery} from "../../../redux/reducers/postsApi";
import {HeartLike} from "../HeartLike/HeartLike";


const Post: FunctionComponent = () => {

    const [confirmDelete, setConfirmDelete] = useState(false)

    // @ts-ignore
    const {slug}: {slug: string} = useParams()
    let navigate = useNavigate();
    localStorage.setItem('slug', slug)

    const {isSuccess, isLoading, data} = useGetPostQuery(slug)
    const [deletePost, {isSuccess: postDelete}] = useDeletePostMutation()


    useEffect(() => {
        if (postDelete){
            return navigate(`/articles`);
        }
    },[postDelete]);

    const deletePostOnClick = () => {
        deletePost([slug, localStorage.getItem('token')])
    }

    let content
    if (isLoading) {
        content = <h1>Загрузка</h1>
    }
    if (isSuccess) {
        const formatDate = parseISO(data.article.createdAt).toString().slice(0, 25)
        content = (
            <div className='postWrapper'>


                <div className="postWrapper__leftContent">

                    <div className="postWrapper__titleWrapper">
                        <span className='postWrapper__title'>{data.article.title.slice(0,60)}</span>
                        <HeartLike slug={slug}/>
                        <span className='postWrapper__amountLikes'>{data.article.favoritesCount}</span>
                    </div>

                    <ul className="postWrapper__tagsList">
                        {data.article.tagList.length > 0
                            ? data.article.tagList.map((el: string) => {
                                if (el !== '' && el !== null) {
                                    return (
                                        <li style={{marginRight:'10px'}} key={data.article.tagList.indexOf(el)}>
                                            {el.slice(0, 20)}
                                        </li>
                                    )
                                }
                                return <li style={{marginRight:'10px'}} key={Date.now()}>Нет тегов</li>
                            })
                            : <li style={{marginRight:'10px'}} key={Date.now()}>Нет тегов</li>
                        }
                    </ul>

                    <p className="postWrapper__overview">
                        {data.article.description.slice(0, 300)}
                    </p>

                    <p>{data.article.body}</p>

                </div>



                <div className="postWrapper__rightContent">

                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <div className="postWrapper__postAuthor">
                            <span className="postWrapper__author">{data.article.author.username}</span>
                            <span className="postWrapper__date"> {formatDate} </span>
                        </div>

                        <img src={data.article.author.image} alt="" className="postWrapper__authorAvatar"/>
                    </div>

                    {data.article.author.username === localStorage.getItem('username')
                        ? (
                            <div style={{marginTop: '25px', position: 'relative'}}>
                                <button onClick={() => setConfirmDelete(true)}  className='deleteButton'>Delete</button>
                                <Link to={`/articles/${slug}/edit`} className='editButton'>Edit</Link>
                                {!confirmDelete ? null : (
                                    <div className="confirmDelete">
                                        <div className="leftContent">
                                            <img src={warning} alt=""/>
                                            <span>Are you sure to delete this article?</span>
                                        </div>
                                        <div className="rightContent">
                                            <button className='noButton' onClick={() => setConfirmDelete(false)}>
                                                No
                                            </button>
                                            <button className='yesButton' onClick={deletePostOnClick}>
                                                Yes
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                        : null}
                </div>


            </div>
        )

    }


    return (
        <>
            {content}
        </>
    )
}

export {Post}
