import avatar from './avatar.png'
import './PostLink.scss'
import heart from './heart.svg'
import {Link} from "react-router-dom";

const PostLink = ({id} : {id: number})  => {

    return (
        <div className='postLinkWrapper'>

            <div className="postLinkWrapper__leftContent">
                <div className="postLinkWrapper__titleWrapper">
                    <Link to={`${id}`} className='postLinkWrapper__title'>Some article title</Link>
                    <img src={heart} alt="" className="postLinkWrapper__likesOnPostImg"/>
                    <span className='postLinkWrapper__amountLikes'>12</span>
                </div>

                <ul className="postLinkWrapper__tagsList">
                    <li>Tag 1</li>
                </ul>

                <p className="postLinkWrapper__overview">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                    ex ea commodo consequat.
                </p>
            </div>

            <div className="postLinkWrapper__rightContent">

                <div className="postLinkWrapper__postAuthor">
                    <span className="postLinkWrapper__author">John Doe</span>
                    <span className="postLinkWrapper__date">March 5, 2020 </span>
                </div>

                <img src={avatar} alt="" className="postLinkWrapper__authorAvatar"/>

            </div>
        </div>
    )
}

export {PostLink}