import "./App.css";
import MainComponent from "./components/MainComponent";
import Container from '@mui/material/Container';

function App() {
  return (
    <>
      <div
        style={{
          width: "100vw",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="xl">
          <MainComponent />
        </Container>
      </div>
    </>
  );
}

export default App;
