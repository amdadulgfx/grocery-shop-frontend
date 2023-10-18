import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ErrorBoundary({ children }) {
    const [hasError, setError] = useState(false);
    const [error, setErrorInfo] = useState(null);
    const navigate = useNavigate();

  useEffect(() => {
    // Catch any errors that occur in the descendant components of the error boundary component.
    window.addEventListener("error", (event) => {
      setError(true);
      setErrorInfo(event.error);
    });

    return () => {
      window.removeEventListener("error", (event) => {
        setError(true);
        setErrorInfo(event.error);
      });
    };
  }, []);


  const reloadPage = () => {
    navigate('/');
    window.location.reload();
  };

  if (hasError) {
    return (
      <div>
        <h1>Something went wrong!</h1>
        <p>We're sorry, but an error occurred. Please try reloading the page.</p>
        <p>{error.message}</p>
        <button onClick={reloadPage}>Reload Page</button>
        <div>
      </div>
      </div>
    );
  } else {
    return children;
  }
}

export default ErrorBoundary;
