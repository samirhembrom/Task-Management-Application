import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.log(error);

  return (
    <div className="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occured.</p>
      <p>
        <i>{error.statusText||error.message}</i>
      </p>
    </div>
  )
}