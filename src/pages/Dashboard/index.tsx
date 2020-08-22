import React, {useState, useEffect} from 'react';

import api from '../../config/api';

import {
	Container, 
	NewCarPanel, 
	Parking, Status, 
	Footer, 
	Header,
	Divider
} from './styles';

interface CarInParking {
	id: string;
	plate: string;
	time_in: string;
	parking_id: string;
}

interface Car {
	id: string;
	plate: string;
	time_in: string;
	valueNow: string;
}

const Dashboard = () => {
	const [car, setCar] = useState<string>('');
	const [carInParking, setCarInParking] = useState<CarInParking[]>([]);
	const [parking, setParking] = useState<string>('');
	const [carStatus, setCarStatus] = useState<Car[]>([]);
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

	const statusCarInParking = (idCar: string) => {
		if(idCar) {
			const hourNow = new Date().toLocaleTimeString('pt-BR');

			carInParking.map(item => {
				if(item.id === idCar) {
					const timeInParking = Math.abs(hourNow - item.time_in);
					setCarStatus([{
						id: item.parking_id,
						plate: item.plate,
						time_in: item.time_in,
						valueNow: timeInParking
					}]);
				}
			})
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

			setCarStatus([]);
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
					placeholder="placa"
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
						</tr>
					</thead>

					<tbody>
						{
							carInParking.map(item => {
								return (
									<tr key={item.id} onClick={() => statusCarInParking(item.parking_id)}>
										<td>{item.parking_id}</td>
										<td>{item.plate}</td>
										<td>{item.time_in}</td>
									</tr>
								);
							})
						}
					</tbody>
				</table>
			</Parking>

			<Status>
				{
					carStatus.map(item => {
						return (
							<>
								<span>Placa -- <strong>{item.plate}</strong></span>
								<span>Entrada -- <strong>{item.time_in}</strong></span>
								<span>Valor Atual -- <strong>{item.valueNow}</strong></span>
								<button onClick={() => removeCarInParking(item.id)}>Baixa</button>
							</>
						);
					})
				}
			</Status>

			<Footer>
					<strong>create - {parking}</strong>
				<span>feito por <i>Alexandre</i> em 2020.</span>
			</Footer>
		</Container>	
	);
}

export default Dashboard;