import React, {useState, useEffect} from 'react';

import api from '../../config/api';

import {Container, NewCarPanel, Parking, Footer, Header} from './styles';

interface CarInParking {
	id: string;
	plate: string;
	time_in: string;
	parking_id: string;
}

const Dashboard = () => {
	const [car, setCar] = useState<string>('');
	const [carInParking, setCarInParking] = useState<CarInParking[]>([]);
	const [parking, setParking] = useState<string>('');
	const date = new Date().toLocaleString('pt-BR', {
		day: 'numeric',
		month: 'numeric',
		year: 'numeric'
	});
	
	useEffect(() => {
		if(parking === '') {
			api.get(`/parking?date=${date}`).then(response => {
				setParking(response.data[0].id);

				if(response.data[0].id) {
					api.get(`/car_parking/${response.data[0].id}`).then(response => {
						setCarInParking(response.data);
					});
				}
			});
		}

		if(parking !== '') {
			api.get(`/car_parking/${parking}`).then(response => {
				setCarInParking(response.data);
			});
		} 
	}, [carInParking]);

	const insertCarInParking = () => {
		if(car !== '' && car.length === 7) {
			api.post('/cars', {plate: car}).then(response => {

				setCarInParking([...carInParking, response.data]);
			});
			setCar('');
		}
	}

	const removeCarInParking = (parking_id: string) => {
		if(parking_id !== '') {
			api.post(`/cars/${parking_id}`).then(response => {

				if(response.data) {
					api.get(`/car_parking/${parking}`).then(response => {
						setCarInParking(response.data);
					});
				}
			});
		}
	}

	return (
		<Container>
			<Header>
				<h1>Estacionaqui.</h1>
			</Header>
			<NewCarPanel>
				<h3>Adicionar</h3>
				<input 
					type="text" 
					placeholder="digite a placa"
					value={car}
					onChange={e => setCar(e.target.value)}
				/>
				<button onClick={insertCarInParking}>confirma</button>
			</NewCarPanel>
			<Parking>
				<h3>Parking</h3>
				<table>
					<thead>
						<tr>
							<th>code</th>
							<th>placa</th>
							<th>entrada</th>
							<th></th>
						</tr>
					</thead>

					<tbody>
						{
							carInParking.map(item => {
								return (
									<tr key={item.id}>
										<td>{item.parking_id}</td>
										<td>{item.plate}</td>
										<td>{item.time_in}</td>
										<td><button onClick={() => removeCarInParking(item.parking_id)}>remover</button></td>
									</tr>
								);
							})
						}
					</tbody>
				</table>
			</Parking>

			<Footer>
					<strong>create - {parking}</strong>
				<span>feito por <i>Alexandre</i> em 2020.</span>
			</Footer>
		</Container>	
	);
}

export default Dashboard;