import styled from "styled-components";

export const Root = styled.div`
  background: #b0bec5;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
`;

export const SizeMonitor = styled.div<{ scale: number }>`
  transition: transform 0.5s ease;
  transform: scale(${props => props.scale});
`;
