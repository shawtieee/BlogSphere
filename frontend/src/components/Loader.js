import { ClipLoader } from "react-spinners";

function Loader() {
  return (
    <div
      style={{
        display:"flex",
        justifyContent:"center",
        marginTop:"100px"
      }}
    >
      <ClipLoader
        size={60}
        color="#2563eb"
      />
    </div>
  );
}

export default Loader;