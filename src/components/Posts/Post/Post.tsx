import {Link, useNavigate, useParams} from "react-router-dom";
import heart from "../HeartLike/heart.svg";
import './Post.scss'
import {FunctionComponent, useEffect, useState} from "react";
import warning from './warning.svg'
import { parseISO } from 'date-fns'
import {useDeletePostMutation, useGetPostQuery} from "../../../redux/reducers/postsApi";


const Post: FunctionComponent = () => {
    // @ts-ignore
    const {slug}: {slug: string} = useParams()
    const [confirmDelete, setConfirmDelete] = useState(false)
    localStorage.setItem('slug', slug)
    const {isSuccess, isLoading, data} = useGetPostQuery(slug)
    const [deletePost, {isSuccess: postDelete}] = useDeletePostMutation()
    let navigate = useNavigate();
    useEffect(() => {
        if (postDelete){
            return navigate(`/`);
        }
    },[postDelete]);

    const deletePostOnClick = () => {
        deletePost(slug)
    }


    let content
    if (isLoading) {
        content = <h1>Загрузка</h1>
    }
    if (isSuccess) {
        const formatedDate = parseISO(data.article.createdAt).toString().slice(0, 25)
        content = (
            <div className='postWrapper'>

                <div className="postWrapper__leftContent">
                    <div className="postWrapper__titleWrapper">
                        <span className='postWrapper__title'>{data.article.title}</span>
                        <img src={heart} alt="" className="postWrapper__likesOnPostImg"/>
                        <span className='postWrapper__amountLikes'>{data.article.favoritesCount}</span>
                    </div>

                    <ul className="postWrapper__tagsList">
                        {data.article.tagList.length > 0
                            ? data.article.tagList.map((el: string) => {
                                if (el !== '') {
                                    return (
                                        <li style={{marginRight:'10px'}} key={data.article.tagList.indexOf(el)}>
                                            {el}
                                        </li>
                                    )
                                }
                                return <li style={{marginRight:'10px'}} key={Date.now()}>Нет тегов</li>
                            })
                            : <li style={{marginRight:'10px'}} key={Date.now()}>Нет тегов</li>

                        }
                    </ul>

                    <p className="postWrapper__overview">
                        {data.article.description}
                    </p>

                    <div className='div1'>
                        <h2>Est Ampyciden pater patent</h2>
                        <h3>Amor saxa inpiger</h3>
                        <p>Lorem markdownum Stygias neque is referam fudi, breve per. Et Achaica tamen: nescia ista occupat,
                            illum se ad potest humum et.</p>
                    </div>

                    <div className='div2'>
                        <h3>Qua deos has fontibus</h3>
                        <p>Recens nec ferro responsaque dedere armenti opes momorderat pisce, vitataque et fugisse. Et
                            iamque incipiens, qua huius suo omnes ne pendentia citus pedum.</p>
                    </div>

                    <div className='div3'>
                        <h3>Quamvis pronuba</h3>
                        <p>Ulli labore facta. Io cervis non nosterque nullae, vides: aethere Delphice subit, tamen Romane ob
                            cubilia Rhodopen calentes librata! Nihil populorum flava, inrita? Sit hic nunc, hoc formae Esse
                            illo? Umeris eram similis, crudelem de est relicto ingemuit finiat Pelia uno cernunt Venus
                            draconem, hic, Methymnaeae.</p>
                    </div>

                    <ul>
                        <li>  1. Clamoribus haesit tenentem iube Haec munera</li>
                        <li>  2. Vincla venae</li>
                        <li>  3. Paris includere etiam tamen</li>
                        <li>  4. Superi te putria imagine Deianira</li>
                        <li>  5. Tremore hoste Esse sed perstat capillis siqua</li>
                    </ul>

                </div>

                <div className="postWrapper__rightContent">

                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <div className="postWrapper__postAuthor">
                            <span className="postWrapper__author">{data.article.author.username}</span>
                            <span className="postWrapper__date"> {formatedDate} </span>
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
