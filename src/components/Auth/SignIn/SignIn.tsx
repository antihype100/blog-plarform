import './SignIn.scss'
import {Link, Navigate} from "react-router-dom";
import {useLoginMutation} from "../../../redux/reducers/postsApi";
import {useDispatch} from "react-redux";
import {SubmitHandler, useForm} from "react-hook-form";
import {login} from "../../../redux/reducers/authSlice";
import {IFormInput} from "../../../types/interfaces"


const SignIn = () => {

    const dispatch = useDispatch()

    const [loginOnServer, { isSuccess, data, error}] = useLoginMutation()
    const {register, handleSubmit, formState: {errors}} = useForm()
    const onSubmit: SubmitHandler<IFormInput> = (validate: any) => {

        loginOnServer({
            'user': {
                'email': validate.Email,
                'password': validate.Password
            }
        })

    }


    if (isSuccess) {
        console.log('Авторизация прошла успешно')
        localStorage.setItem('image', data.user.image)
        localStorage.setItem('token', data.user.token)
        localStorage.setItem('auth', 'true')
        localStorage.setItem('username', data.user.username)
        localStorage.setItem('email', data.user.email)
        dispatch(login())
        setTimeout(() => window.location.reload(), 100)
        return <Navigate to='/articles' replace/>
    }



    return (
        <form className='sigInForm' onSubmit={handleSubmit(onSubmit)}>
            <h2>Sign In</h2>
            <div>
                <label htmlFor="">Email address</label>
                <input type="text"
                       {...register('Email', {
                           required: true,
                           pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                       })}
                       placeholder='Email address'/>
                {errors.Email?.type === 'pattern' ? <span style={{color: 'red'}}>Wrong email format</span> : null}
                {errors.Email?.type === 'required' ? <span style={{color: 'red'}}>Required field</span> : null}
            </div>
            <div>
                <label htmlFor="">Password</label>
                <input type="text"
                       {...register('Password', {
                           required: true,
                           minLength: 6,
                           maxLength: 40,
                       })}
                       placeholder='Password'/>
                {errors.Password?.type === 'minLength' ?
                    <span style={{color: 'red', marginBottom: '15px'}}>Your password needs to be at least 6 characters.</span> : null}
                {errors.Password?.type === 'maxLength' ?
                    <span style={{color: 'red', marginBottom: '15px'}}>Your password must be 40 characters or less.</span> : null}
                {errors.Password?.type === 'required' ? <span style={{color: 'red'}}>Required field</span> : null}
            </div>
            {error && <span style={{color: 'red'}}>Wrong password or email</span>}
            <button>Login</button>
            <span>Don’t have an account? <Link to='/sign-up'>Sign Up.</Link></span>
        </form>
    )
}

export {SignIn}