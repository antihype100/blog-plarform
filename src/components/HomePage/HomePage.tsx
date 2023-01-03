import {Link} from "react-router-dom";



const HomePage = () => {
    return (
        <>
            <h1>HomePage</h1>
            <Link to='/posts'>К постам</Link>
        </>
    )
}

export {HomePage}