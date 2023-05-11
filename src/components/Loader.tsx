import { Container } from "react-bootstrap";
import { PuffLoader } from "react-spinners";

export default function Loader() {
  const loaderStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  } as React.CSSProperties;
  const backgroundStyle = {
    position: "absolute",
    width: "100vw",
    height: "100vh",
    zIndex: "130000",
  } as React.CSSProperties;

  return (
    <Container style={backgroundStyle}>
      <PuffLoader color="#00bd23" style={loaderStyle} />
    </Container>
  );
}
