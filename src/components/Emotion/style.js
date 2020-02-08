import styled from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  left: ${props => props.position.left};
  top: ${props => props.position.top};

  color: black;
  font-size: 24px;
  font-weight: bold;

  transform: rotate(${props => props.rotation});
`;
