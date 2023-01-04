import {Link} from "react-router-dom";
import './HomePage.scss'



const HomePage = () => {
    return (
        <div className='homePageWrapper'>
            <h1 className='homePageTitle'>HomePage</h1>
            <Link to='/articles'>К постам</Link>
        </div>
    )
}

export {HomePage}