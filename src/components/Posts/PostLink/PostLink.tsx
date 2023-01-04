import './PostLink.scss'
import {Link} from "react-router-dom";
import {FunctionComponent} from "react";
import {IPost} from "../Posts";
import {parseISO} from "date-fns";
import {HeartLike} from "../HeartLike/HeartLike";

const PostLink: FunctionComponent<IPost> = ({createdAt, title, slug, favoritesCount, author, tagList, description}: IPost) => {
    const imgLink = author?.image
    tagList = tagList.filter(el => el.length < 10)





    return (
        <div className='postLinkWrapper'>

            <div className="postLinkWrapper__leftContent">
                <div className="postLinkWrapper__titleWrapper">
                    <Link to={`${slug}`} className='postLinkWrapper__title'>{title}</Link>
                    <HeartLike slug={slug as string}/>
                    <span className='postLinkWrapper__amountLikes'>{favoritesCount}</span>
                </div>

                <ul className="postLinkWrapper__tagsList">
                    {tagList?.length > 0
                        ? tagList.map(el => {
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
                    <span className="postLinkWrapper__date">{parseISO(createdAt as string).toString().slice(0, 25)}</span>
                </div>

                <img src={imgLink} alt="" className="postLinkWrapper__authorAvatar"/>

            </div>
        </div>
    )
}

export {PostLink}