import { useState } from "react";
import { useForm } from "react-hook-form"
import { signupResolver } from "../../schemas/Auth/signupSchema";
import { signup } from "../../api/auth";
import { useNavigate } from "react-router";
import { Form, Input, Button } from "@heroui/react";

function SignupForm() {

  // Set up the form
  const { register, handleSubmit } = useForm({ resolver: signupResolver });

  // Set up the errors
  const [serverError, setServerError] = useState({
    email: "",
  });

  // Setting up the navigation
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await signup(data);
      navigate('/dashboard');
    } catch (error) {
      const res = error.response.data;
      if (res.message.includes("email")) setServerError(prev => ({ ...prev, email: res.message }))
    }
  }

  return (
    <>
      <Form className="w-full max-w-xs" onSubmit={handleSubmit(onSubmit)} validationErrors={serverError}>
        <Input
          isRequired
          errorMessage={serverError.email}
          label="Email"
          labelPlacement="outside"
          placeholder="Enter your email"
          type="email"
          {...register("email")}
        />
        <Input
          isRequired
          label="Username"
          labelPlacement="outside"
          placeholder="Enter your username"
          type="username"
          {...register("username")}
        />
        <Input
          isRequired
          label="Password"
          labelPlacement="outside"
          placeholder="Enter your password"
          type="password"
          {...register("password")}
        />
        <Button type="submit" variant="bordered">
          Submit
        </Button>
      </Form>
    </>
  )
}

export default SignupForm
