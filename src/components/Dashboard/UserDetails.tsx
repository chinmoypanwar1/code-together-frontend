import { Button } from "@heroui/react";
import { useAppSelector } from "../../hooks/reduxHooks"
import { NavLink } from "react-router";

function UserDetails() {

  const { email, username, userId, profilePictureUrl, isAuthenticated } = useAppSelector((state) => state.user);

  if(!isAuthenticated) {
    return (
      <div>
        You are not authenticated. Return back to login.
        <Button>
          <NavLink to={"/login"}>
            Go back to login 
          </NavLink>
        </Button>
      </div>
    )
  }

  return (
    <>
      <div className="w-auto h-auto flex flex-col">
        <p>Email: {email}</p>
        <p>Username: {username}</p>
        <p>Profile Picture Url : {profilePictureUrl}</p>
        <p>UserId: {userId}</p>
      </div>
    </>
  )
}

export default UserDetails
