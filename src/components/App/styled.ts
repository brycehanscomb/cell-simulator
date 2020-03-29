import styled from "styled-components";

export const Root = styled.div`
  display: grid;

  // on mobile, stack the view vertically
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;

  // for larger screens with room to show the board
  // in all its glory, we can stick the toolbar over
  // to the side.
  @media only screen and (min-width: 640px) {
    grid-template-columns: 1fr 300px;
    grid-template-rows: 1fr;

    // make sure we always fill the whole screen where possible
    height: 100vh;
  }
`;
