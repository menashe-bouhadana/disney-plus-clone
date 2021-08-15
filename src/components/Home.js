import styled from "styled-components";
import ImgSlider from "./imgSlider";

const Home = (props) => {
    return(
        <Container>
            <ImgSlider />
        </Container>
    );
}

const Container = styled.main`
  position:relative;
  background: rgb(24,26,39);
  background: linear-gradient(54deg, rgba(24,26,39,1) 0%, rgba(38,42,58,1) 23%, rgba(43,48,65,1) 39%, rgba(43,48,65,1) 62%, rgba(24,26,39,1) 85%, rgba(24,26,39,1) 100%);
  min-height:calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top:72px;
  padding:0 calc(3.5vw + 5px);
  
  &:after {
    background: rgb(24,26,39);
    background: linear-gradient(54deg, rgba(24,26,39,1) 0%, rgba(38,42,58,1) 23%, rgba(43,48,65,1) 39%, rgba(43,48,65,1) 62%, rgba(24,26,39,1) 85%, rgba(24,26,39,1) 100%);
    background-position: center center;
    background-repeat: no-repeat;
    content:'';
    position:absolute;
    inset: 0px;
    opacity:1;
    z-index: -1;
  }
`

export default Home;