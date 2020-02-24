import styled from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  left: ${props => props.position.left};
  top: ${props => props.position.top};
`;

export const ImageSprite = styled.div`
  background: url(${props => props.sprite});
  width: 256px;
  height: 256px;
`