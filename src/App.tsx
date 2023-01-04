import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {Layout} from "./components/Layout/Layout";
import {Posts} from "./components/Posts/Posts";
import {Post} from "./components/Posts/Post/Post";
import {HomePage} from "./components/HomePage/HomePage";
import {Provider} from "react-redux";
import {store} from "./redux";
import {SignIn} from "./components/Auth/SignIn/SignIn";
import {SignUp} from "./components/Auth/SignUp/SignUp";
import {EditProfile} from "./components/EditProfile/EditProfile";

const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
        <Route path='' element={<HomePage/>}/>
        <Route path='posts' element={<Posts/>}/>
        <Route path='posts/:slug' element={<Post/>}/>
        <Route path='sign-in' element={<SignIn/>}/>
        <Route path='sign-up' element={<SignUp/>}/>
        <Route path='profile' element={<EditProfile/>}/>

    </Route>
))

const App = () => {

    return (
            <Provider store={store}>
                <RouterProvider router={router}/>
            </Provider>
    )
}

export {App}