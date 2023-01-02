import {useParams} from "react-router-dom";
import heart from "../PostLink/heart.svg";
import avatar from "../PostLink/avatar.png";
import './Post.scss'


const Post = () => {
    const {id} = useParams()
    return (
        <div className='postWrapper'>

            <div className="postWrapper__leftContent">
                <div className="postWrapper__titleWrapper">
                    <span className='postWrapper__title'>Some article title</span>
                    <img src={heart} alt="" className="postWrapper__likesOnPostImg"/>
                    <span className='postWrapper__amountLikes'>{id}</span>
                </div>

                <ul className="postWrapper__tagsList">
                    <li>Tag 1</li>
                </ul>

                <p className="postWrapper__overview">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et
                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip
                    ex ea commodo consequat.
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

                <div className="postWrapper__postAuthor">
                    <span className="postWrapper__author">John Doe</span>
                    <span className="postWrapper__date">March 5, 2020 </span>
                </div>

                <img src={avatar} alt="" className="postWrapper__authorAvatar"/>

            </div>
        </div>
    )
}

export {Post}