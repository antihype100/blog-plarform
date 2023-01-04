import './Header.scss'
import {Link} from "react-router-dom";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {logout} from "../../redux/reducers/authSlice";
import {useDispatch} from "react-redux";
import avatar from '../Posts/PostLink/avatar.png'


const Header = () => {


    const {isLogin} = useTypedSelector(state => state.isLogin)
    const username = localStorage.getItem('username')
    const userimg = localStorage.getItem('image')
    const dispatch = useDispatch()

    const logoutOnclick = () => {
        localStorage.removeItem('auth');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('token')
        dispatch(logout())
    }

    if (isLogin || localStorage.getItem('auth')) {
        return (
            <header className='header'>
                <Link className='header__blogName' to='/'>Realworld Blog</Link>

                <div className="header__authWrapper">

                    <Link className='header__createPost' to='/'>Create post</Link>

                    <Link className='header__profile' to='/profile'>
                        <span>{username}</span>
                        <img style={{width: '46px', height: '42px', borderRadius: '50px'}} src={userimg ? userimg : avatar} alt=""/>
                    </Link>

                    <Link onClick={logoutOnclick} className='header__logout' to='/posts'>Log Out</Link>
                </div>
            </header>
        )
    }

    return (
        <header className='header'>
            <Link className='header__blogName' to='/'>Realworld Blog</Link>
            <div className="header__authWrapper">
                <Link className='header__signIn' to='/sign-in'>Sign In</Link>
                <Link className='header__signUp' to='/sign-up'>Sign Up</Link>
            </div>
        </header>
    )
}

export {
    Header
}