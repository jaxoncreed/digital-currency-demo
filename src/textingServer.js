import twilio from 'twilio'

export default function textingServer(server) {
	server.post('/sms', (req, res) => {
		console.log(req.body);
	});
}