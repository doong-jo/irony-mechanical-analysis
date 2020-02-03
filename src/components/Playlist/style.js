import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  left: 5%;
  top: 70%;
  width: max-content;
  height: 300px;
  display: flex;
  flex-direction: column;
`;

export const SongWrapper = styled.div`
  border-bottom: ${props =>
    props.currentPlayIndex ? "2px solid #111" : "2px solid transparent"};
  text-align: center;
  padding: 4px;
  margin-bottom: 10px;
  font-size: 20px;
  cursor: pointer;
`;
