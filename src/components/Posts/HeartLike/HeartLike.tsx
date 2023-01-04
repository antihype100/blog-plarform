import heart from "./heart.svg";
import {
    useDislikePostMutation,
    useGetPostQuery,
    useLikePostMutation
} from "../../../redux/reducers/postsApi";
import {FC} from "react";
import likedHeart from './liked.svg'

const HeartLike: FC<{slug: string}> = ({slug}) => {


    const [likePost] = useLikePostMutation()
    const [dislikePost] = useDislikePostMutation()
    const {isSuccess, data} = useGetPostQuery(slug)
    if (isSuccess) {
        if (data.article.favorited) {
            return <img onClick={() => {dislikePost(slug)}} src={likedHeart} alt="" className="postLinkWrapper__likesOnPostImg"/>
        }
    }
    return (
        <img onClick={() => {likePost(slug)}} src={heart} alt="" className="postLinkWrapper__likesOnPostImg"/>
    )
}

export {HeartLike}