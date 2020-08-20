import React, {useState} from 'react';

import {Container, NewCarPanel, Parking, Footer, Header} from './styles';

interface Parking {
	id: string;
	placa: string;
	entrada: string;
}

const Dashboard = () => {
	const [car, setCar] = useState<string>('');
	const [parking, setParking] = useState<Parking[]>([]);
	const date = new Date();

	const insertCarInParking = () => {
		if(car !== '') {
			if(car.length == 7) {
				setParking([
					...parking,
					{
						id: String(Math.random()),
						placa: car,
						entrada: `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`
					}
				]);	
			}
		}
	}

	const removeCarInParking = (id: string) => {
		let newparking = new Array();
		if(id !== '') {
			for(var i = 0; i < parking.length; i++) {
				if(id !== parking[i].id) {
					newparking.push(
						parking[i]
					)
				}
			}

			setParking(newparking);
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
							<th>id</th>
							<th>placa</th>
							<th>entrada</th>
							<th></th>
						</tr>
					</thead>

					<tbody>
						{
							parking.map(item => {
								return (
									<tr key={item.id}>
										<td>{item.id}</td>
										<td>{item.placa}</td>
										<td>{item.entrada}</td>
										<td><button onClick={() => removeCarInParking(item.id)}>remover</button></td>
									</tr>
								);
							})
						}
					</tbody>
				</table>
			</Parking>

			<Footer>
				<span>feito por <i>Alexandre</i> em 2020.</span>
			</Footer>
		</Container>	
	);
}

export default Dashboard;