import Navbar from "../components/Navbar";

function NotFound() {
  return (
    <>
      <Navbar />

      <div
        style={{
          textAlign: "center",
          marginTop: "120px",
        }}
      >
        <h1 style={{ fontSize: "80px" }}>404</h1>

        <h2>Page Not Found</h2>

        <p>The page you requested doesn't exist.</p>
      </div>
    </>
  );
}

export default NotFound;