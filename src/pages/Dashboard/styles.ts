import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 20vh 70vh 10vh;
  grid-template-areas: "header header header"
                        "NCP PAR PAR"
                        "footer footer footer";

  background: var(--color-line-in-white);
  padding: 20px;
  grid-column-gap: 30px; 
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center; 
`;

export const NewCarPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  grid-area: NCP;
  padding: 10px;

  >input, button {
    height: 40px;
  }

  >input {
    text-transform: uppercase;
  }

`;

export const Parking = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-area: PAR;
  padding: 10px;
  max-height: 100vh;

  >table {
    width: 100%;
  }

  table > tbody > tr:hover {
    background: var(--color-text-in-primary);
    cursor: pointer;
  }

  table > tbody > tr {
    border-bottom: 1px solid var(--color-text-base);

    >td, th {
      text-align: center;
      align-items: center;
    }
  }
`;

export const Footer = styled.div`
  display: flex;
  grid-area: footer;
  justify-content: flex-end;
  align-items: center;

  >span {
    font-weight: bold;
  }
`;

