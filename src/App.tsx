import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {Layout} from "./components/Layout/Layout";
import {Posts} from "./components/Posts/Posts";
import {Post} from "./components/Posts/Post/Post";
import {HomePage} from "./components/HomePage/HomePage";
import {Provider} from "react-redux";
import {store} from "./redux";

const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
        <Route path='' element={<HomePage/>}/>
        <Route path='posts' element={<Posts/>}/>
        <Route path='posts/:slug' element={<Post/>}/>

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