import { useRoutes } from "react-router-dom"
import PageNotFound from "../components/PageNotFound"
import Home from "../components/Home"
import Layout from "../components/Layout"
import ProfileComponent from "../components/Account/components/Profile"

const Router = () => {
    const routing = useRoutes([
        
        {
            path: "*", element: <PageNotFound />
        },
        {
            path: "", element: <Layout />,
            children: [
                {
                    path: "/", element: <Home />
                },
                {
                    path: "/profile", element: <ProfileComponent />
                },
            ]
        }
    ])
    return routing
}
export default Router