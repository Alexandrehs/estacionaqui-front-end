import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;

  background: var(--color-box-base);

  width: 90vw;
  max-width: 700px;
  padding: 10px;

  button {
    width: 80px;
    height: 30px;
    background: var(--color-primary-lighter);
    border: none;
    border-radius: 8px;
  }

  input {
    text-transform: uppercase;

    &:focus {
      border: none;
    }
  }
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;  
`;

export const CarInsert = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding-left: 10px;

  width: 100vw;
  max-width: 500px;

  > input {
    height: 30px;
    padding: 10px;
  }
`;

export const CarList = styled.div`
  display: flex;
  padding-top: 20px;
  
  table {
    width: 100vw;
    max-width: 600px;

    td, th {
      padding: 10px;
      text-align: left;
      border-bottom: 1px solid var(--color-text-base);
    }
  }
`;