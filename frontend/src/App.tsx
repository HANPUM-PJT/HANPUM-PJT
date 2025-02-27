import styled from 'styled-components';
import Router from '@pages/Router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Container>
      <ToastContainer position="top-center" autoClose={500} />
      <Router />
    </Container>
  );
}

export default App;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;
