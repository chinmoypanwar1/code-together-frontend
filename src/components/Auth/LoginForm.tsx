import { useForm } from "react-hook-form"
import { Form, Input, Button } from "@heroui/react";
import { login } from "../../api/auth";
import { loginResolver } from "../../schemas/Auth/loginSchema";
import { useNavigate } from "react-router";
import { useState } from "react";
import { GoogleIcon } from "../../assets/icons/GoogleIcon";

function LoginForm() {

  // Form Related
  const {
    register,
    handleSubmit,
  } = useForm({ resolver: loginResolver });

  // Handling the server related errors
  const [serverError, setServerError] = useState({
    email: "",
    password: "",
  });

  // Navigation after successful login
  const navigate = useNavigate();

  // OnSubmit function
  const onSubmit = async (data) => {
    try {
      await login(data);
      navigate("/dashboard");
    } catch (error) {
      const res = error.response.data;
      if (res.message.includes("email")) setServerError({ password: "", email: res.message })
      else if (res.message.includes("password")) setServerError({ email: "", password: res.message })
    }
  }

  // Login with google function 
  const loginWithGoogle = () => {
    window.location.href = "http://localhost:8080/auth/google/login"
  }

  return (
    <div>
      <h1>This is the LoginPage</h1>
      <Form className="w-full max-w-xs" onSubmit={handleSubmit(onSubmit)} validationErrors={serverError}>
        <Input
          isRequired
          errorMessage={serverError.email}
          label="Email"
          labelPlacement="outside"
          placeholder="Enter your email"
          name="email"
          type="email"
          {...register("email")}
        />
        <Input
          isRequired
          errorMessage={serverError.password}
          label="Password"
          labelPlacement="outside"
          placeholder="Enter your password"
          name="password"
          type="password"
          {...register("password")}
        />
        <Button type="submit" variant="bordered">
          Submit
        </Button>
      </Form>
      <Button isIconOnly onClick={loginWithGoogle}>
        <GoogleIcon />
      </Button>
    </div>
  )
}

export default LoginForm
