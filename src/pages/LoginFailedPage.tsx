import { Button } from "@heroui/react"
import { NavLink } from "react-router"

function LoginFailedPage() {
  return (
    <div>
      <h1>This is failed login page. Please get back to where you were to login again.</h1>
      <Button color="primary" size="lg">
        <NavLink to={"/login"}>
          Return to login Page.
        </NavLink>
      </Button>
    </div>
  )
}

export default LoginFailedPage
