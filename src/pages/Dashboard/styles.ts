import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr 200px;
  grid-template-rows: 20vh 70vh 10vh;
  grid-template-areas: "header header header"
                        "NCP PAR STS"
                        "footer footer footer";

  background: var(--color-line-in-white);
  padding: 20px;
  grid-column-gap: 30px; 
`;

export const Header = styled.div`
  grid-area: header;
  display: flex;
  justify-content: flex-start;
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
  overflow-y: scroll;

  >table {
    width: 100%;
  }

  table > tbody > tr:hover {
    background: var(--color-text-in-primary);
    cursor: pointer;
  }

  table > tbody > tr {
    
    margin-top: 10px;

    >td, th {
      text-align: center;
      align-items: center;
      border-bottom: 1px solid var(--color-text-base);
      height: 30px;
    }
  }
`;

export const Status = styled.div`
  grid-area: STS;
  display: flex;
  flex-direction: column;
`;

export const Divider = styled.div`
  width: 70%;
  height: 1px;
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

