import { useRoutes } from "react-router-dom"
import PageNotFound from "../components/PageNotFound"
import Home from "../components/Home"
import Layout from "../components/Layout"
import ProfileComponent from "../components/Account/components/Profile"

const Router = () => {
    // make routing
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
    // export routing
    return routing
}
// export router
export default Router