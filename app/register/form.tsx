"use client";

export default function Form() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });
    console.log({ response });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 mx-auto max-w-md mt-20"
    >
      <input name="email" type="text" placeholder="Email" className="border" />
      <input
        name="password"
        type="password"
        placeholder="Password"
        className="border"
      />
      <button type="submit">Register</button>
    </form>
  );
}
