import './SignIn.scss'
import {Link} from "react-router-dom";

const SignIn = () => {

    return (
        <form className='sigInForm'>
            <h2>Sign In</h2>
            <div>
                <label htmlFor="">Email address</label>
                <input type="text" placeholder='Email address'/>
            </div>
            <div>
                <label htmlFor="">Password</label>
                <input type="text" placeholder='Password'/>
            </div>
            <button>Login</button>
            <span>Don’t have an account? <Link to='/sign-up'>Sign Up.</Link></span>
        </form>
    )
}

export {SignIn}