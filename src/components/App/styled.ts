import styled from "styled-components";

export const Root = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;

  @media only screen and (min-width: 640px) {
    grid-template-columns: 1fr 300px;
    grid-template-rows: 1fr;
    height: 100vh;
  }
`;
