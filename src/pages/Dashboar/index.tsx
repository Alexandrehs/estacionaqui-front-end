import React, {useState, useEffect} from 'react';
import api from '../../config/connection';

import Header from '../../components/Header';

import {Container, Body, CarInsert, CarList} from './styles';

interface CarProps {
  id: string;
  plate: string;
}

const Dashboad = () => {
  const [carsList, setCarsList] = useState<CarProps[]>([]); 
  const [newCar, setNewCar] = useState<string>('');
  
  useEffect(() => {
    api.get('/cars').then(response => {
      if(response.data.length > 0) {
        setCarsList(response.data);
      }
    });
  }, [carsList]);

  const insertNewCar = () => {
    api.post('/cars', {
      plate: newCar
    }).then(response => {
      if(response.data.length > 0) {
        setCarsList(response.data);
      }
    });    
  }

  const removeCar = (id: string) => {
    api.post(`/cars/${id}`).then(response => {
      if(response.data.length > 0) {
        console.log('deu');
      }
    });
  }

  return (
    <Container>
      <Header title="EstacionaQui" />

      <Body>
        <CarInsert>
          <span>Placa</span>
          <input type="text" placeholder="digite a placa" value={newCar} onChange={e => setNewCar(e.target.value)}/>
          <button onClick={insertNewCar}>Incluir</button>
        </CarInsert>

        <CarList>
          <table>
            <thead>
              <tr>
                <th><strong>id</strong></th>
                <th><strong>placa</strong></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                carsList.map(item => {
                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.plate}</td>
                      <td><button onClick={() => removeCar(item.id)}>baixa</button></td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </CarList>
      </Body>
    </Container>
  );
}

export default Dashboad;