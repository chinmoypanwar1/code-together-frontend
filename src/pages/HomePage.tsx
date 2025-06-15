import { Button } from "@heroui/react"
import { NavLink } from "react-router"

function HomePage() {
  return (
    <div>
      <h1>This is the HomePage</h1>
      <Button color="primary">
        <NavLink to={"/login"}>
          Login Page
        </NavLink>
      </Button>
      <Button color="primary">
        <NavLink to={"/signup"}>
          Getting Started
        </NavLink>
      </Button>
    </div>
  )
}

export default HomePage
