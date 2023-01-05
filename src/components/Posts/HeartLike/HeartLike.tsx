import heart from "./heart.svg";
import {
    useDislikePostMutation,
    useGetPostQuery,
    useLikePostMutation
} from "../../../redux/reducers/postsApi";
import {FC, useState} from "react";
import likedHeart from './liked.svg'

const HeartLike: FC<{slug: string}> = ({slug}) => {

    const [reload, setReload] = useState(0)

    const [likePost] = useLikePostMutation()
    const [dislikePost] = useDislikePostMutation()
    const {isSuccess, data} = useGetPostQuery(slug)


    const like = () => {
        likePost([slug, localStorage.getItem('token')])
        setReload(reload + 1)
    }

    const dislike = () => {
        dislikePost([slug, localStorage.getItem('token')])
        setReload(reload + 1)
    }

    if (isSuccess) {
        if (data.article.favorited) {
            return <img onClick={dislike} src={likedHeart} alt="" className="postLinkWrapper__likesOnPostImg"/>
        }
    }

    return (
        <img onClick={like} src={heart} alt="" className="postLinkWrapper__likesOnPostImg"/>
    )
}

export {HeartLike}