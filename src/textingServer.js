import twilio from 'twilio'
import { findIndex } from 'lodash'
import config from '../config.json'

const client = twilio(config.sid, config.token);


// Error Handling
const error = function(res, message) {
  var twilml = new twilio.TwimlResponse();
  twilml.message('Error: ' + message);
  res.send(twilml.toString());
}

const getMemberByNumber = function(store, number) {
	const members = store.getState().get('members').toJS();
	return members[findIndex(members, { number: number })] || -1;
}

const getMemberByName = function(store, name) {
	const members = store.getState().get('members').toJS();
	return members[findIndex(members, { name: name.toLowerCase() })] || -1;
}

export default function textingServer(server, store) {
	server.post('/sms', (req, res) => {
		const phoneNumber = req.body.From;
		const command = req.body.Body.split(' ');
		switch(command[0].toLowerCase()) {
		case 'join':
			// Add the member to the store
			if (command [1] == null) {
				error(res, 'You must include your username as a second parameter.');
				return;
			}
			if (getMemberByName(store, command[1].toLowerCase()) !== -1) {
				error(res, 'The username ' + command[1].toLowerCase() + ' already exists.');
				return;
			}
			store.dispatch({
			  type: 'ADD_MEMBERS',
			  members: [
			  	{
			  		name: command[1].toLowerCase(),
			  		number: phoneNumber,
			  		amount: 0
			  	}
			  ]
			});
			// Tell the User what happened
			var twilml = new twilio.TwimlResponse();
  			twilml.message('Welcome to the community! Your username is ' + command[1].toLowerCase() + '.');
  			res.send(twilml.toString());
			break;



		case 'send':
			if (command[1] == null || command[2] == null) {
				error(res, "The receiver must be parameter 2 and an amount must be parameter 3.");
				return;
			}
			const sender = getMemberByNumber(store, phoneNumber);
			if (sender == -1) {
				error(res, "Sorry, you don't seem to be a member of the community.");
				return;
			}
			const receiver = getMemberByName(store, command[1].toLowerCase());
			if (receiver == -1) {
				error(res, command[1].toLowerCase() + " is not a member of the community.");
				return;
			}
			const amount = Number(command[2]);
			if (isNaN(amount)) {
				error(res, command[2] + " is not a valid amount.");
				return;
			}
			if (amount > sender.amount) {
				error(res, 'You don\'t have enough money. Account balance: ' + sender.amount);
				return;
			}
			if (amount < 0) {
				error(res, 'Negative values are not allowed.');
				return;
			}
			store.dispatch({
				type: 'TRANSFER_MONEY',
				from: sender.name,
				to: receiver.name,
				amount: amount
			});
			var twilml = new twilio.TwimlResponse();
			twilml.message(amount + ' successfully transfered to ' + receiver.name + '.');
			res.send(twilml.toString());

			client.messages.create({
				to: receiver.number,
				from: config.number,
				body: sender.name + " sent you " + amount + "."
			});

			break;



		case 'account':
			const member = getMemberByNumber(store, phoneNumber);
			if (member === -1) {
				error(res, "Sorry, you don't seem to be a member of the community.");
				return;
			}
			console.log('member')
			var twilml = new twilio.TwimlResponse();
			twilml.message('You, ' + member.name + ', have an account balance of ' + member.amount + '.');
			res.send(twilml.toString());
			break;



		case 'list':
			const members = store.getState().get('members').toJS();
			var message = "Current Members: ";
			members.forEach(member => {
				message += member.name + ", ";
			});		
			var twilml = new twilio.TwimlResponse();
			twilml.message(message);
			res.send(twilml.toString());
			break;


		case 'commands':
			var message = "Commands:\n commands - help menu\n join {username} - Join the community\n account - Check your account balance\n list - Get a list of all people in the community\n send {receiver's username} {amount} - transfer an amount to a user."
			var twilml = new twilio.TwimlResponse();
			twilml.message(message);
			res.send(twilml.toString());
			break;

		default:
			error(res, command[0] + ' is not a valid command.');
			return;
		}
	});

	server.post('/divide', (req, res) => {
		store.dispatch({
			type: 'EVENLY_DIVIDE_MONEY'
		});
		res.sendStatus(200);
	});
}