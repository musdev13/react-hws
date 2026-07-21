import { Form } from "react-router";

export function LogoutButton() {
  return (
    <Form action="/logout" method="post">
      <button
        type="submit"
        className="text-sm font-bold text-red-600 hover:text-red-700 transition cursor-pointer"
      >
        Вийти
      </button>
    </Form>
  );
}