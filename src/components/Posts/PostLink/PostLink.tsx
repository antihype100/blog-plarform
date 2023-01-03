import './PostLink.scss'
import heart from './heart.svg'
import {Link} from "react-router-dom";
import {FunctionComponent} from "react";
import {IPost} from "../Posts";

const PostLink: FunctionComponent<IPost> = ({title, slug, favoritesCount, author, tagList, description}: IPost) => {
    const imgLink = author?.image
    return (
        <div className='postLinkWrapper'>

            <div className="postLinkWrapper__leftContent">
                <div className="postLinkWrapper__titleWrapper">
                    <Link to={`${slug}`} className='postLinkWrapper__title'>{title}</Link>
                    <img src={heart} alt="" className="postLinkWrapper__likesOnPostImg"/>
                    <span className='postLinkWrapper__amountLikes'>{favoritesCount}</span>
                </div>

                <ul className="postLinkWrapper__tagsList">
                    {tagList?.length > 0
                        ? tagList?.map(el => {
                            if (el !== '') {
                                return (
                                    <li key={tagList.indexOf(el)}>{el}</li>
                                )
                            }
                            return <li key={Date.now()}>Нет тегов</li>
                        })
                        : <li key={Date.now()}>Нет тегов</li>

                    }
                </ul>

                <p className="postLinkWrapper__overview">
                    {description}
                </p>
            </div>

            <div className="postLinkWrapper__rightContent">

                <div className="postLinkWrapper__postAuthor">
                    <span className="postLinkWrapper__author">{author?.username}</span>
                    <span className="postLinkWrapper__date">March 5, 2020 </span>
                </div>

                <img src={imgLink} alt="" className="postLinkWrapper__authorAvatar"/>

            </div>
        </div>
    )
}

export {PostLink}