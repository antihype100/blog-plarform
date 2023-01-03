import './Header.scss'
import {Link} from "react-router-dom";

const Header = () => {

    return (
        <header className='header'>
            <Link className='header__blogName' to='/' >Realworld Blog</Link>
            <div className="header__authWrapper">
                <Link className='header__signIn' to='/sign-in'>Sign In</Link>
                <Link className='header__signUp' to='/sign-up'>Sign Up</Link>
            </div>
        </header>
    )
}

export {Header}