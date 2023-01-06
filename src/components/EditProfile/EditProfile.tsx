import './EditProfile.scss'
import {useForm, SubmitHandler} from "react-hook-form";
import {useEditProfileMutation} from "../../redux/reducers/postsApi";
import {useEffect} from "react";
import {IFormInput} from "../../types/interfaces";
import {useNavigate} from "react-router-dom";


const EditProfile = () => {

    const navigate = useNavigate()


    const [editProfile, {error, isSuccess}] = useEditProfileMutation()
    const {register, handleSubmit, formState: {errors}} = useForm();

    useEffect(() => {
        if (isSuccess){
            return navigate(`/articles`);
        }
    },[isSuccess]);

    const onSubmit: SubmitHandler<IFormInput> = (validate: any) => {
        editProfile([{
            'user': {
                'email': validate.Email,
                'password': validate.Password,
                'username': validate.Username,
                'bio': '',
                'image': validate.Image || ''
            }
        }, localStorage.getItem('token')])
    }

    return (
        <form className='sigUpForm' onSubmit={handleSubmit(onSubmit)}>


            <h2>Edit Profile</h2>


            <div className='inputTextWrapper'>
                <label htmlFor="">Username</label>
                <input type="text"
                       {...register('Username', {required: true, minLength: 3, maxLength: 20})}
                       placeholder='Username'/>
                {errors.Username?.type === 'minLength' ?
                <span style={{color: 'red'}}>Your username needs to be at least 6 characters.</span> : null}
                {errors.Username?.type === 'maxLength' ?
                    <span style={{color: 'red'}}>Your username must be 40 characters or less.</span> : null}
                {errors.Username?.type === 'required' && <span style={{color: 'red'}}>Required field</span>}
            </div>


            <div className='inputTextWrapper'>
                <label htmlFor="">Email address</label>
                <input type="text"
                       {...register('Email', {
                           required: true,
                           pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                       })}
                       placeholder='Email address'/>
                {error && <span style={{color: 'red'}}>Is already taken.</span>}
                {errors.Email?.type === 'pattern' ? <span style={{color: 'red'}}>Wrong email format</span> : null}
                {errors.Email?.type === 'required' ? <span style={{color: 'red'}}>Required field</span> : null}
            </div>


            <div className='inputTextWrapper'>
                <label  htmlFor="">New Password</label>
                <input type="password"
                       {...register('Password', {
                           required: true,
                           minLength: 6,
                           maxLength: 40,
                       })}
                       placeholder='Password'/>
                {errors.Password?.type === 'required' ? <span style={{color: 'red'}}>Required field</span> : null}
                {errors.Password?.type === 'minLength' ? <span style={{color: 'red'}}>Your password needs to be at least 6 characters.</span> : null}
                {errors.Password?.type === 'maxLength' ? <span style={{color: 'red'}}>Your password must be 40 characters or less.</span> : null}
            </div>


            <div className='inputTextWrapper'>
                <label htmlFor="">Avatar image (url)</label>
                <input type="text"
                       {...register('Image')}
                       placeholder='Image'/>
            </div>


            <button>Save</button>


        </form>
    )
}

export {EditProfile}