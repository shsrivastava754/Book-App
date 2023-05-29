const wbm = require('wbm');

class  MessageController {
    static async sendMessage(req,res){
        const accountSid = process.env.TWILIO_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const client = require('twilio')(accountSid, authToken);
        
        client.messages
            .create({
                body: 'Test message sent',
                from: 'whatsapp:+14155238886',
                to: 'whatsapp:+916306435882'
                // to: 'whatsapp:+919838009193'
            })
            .then(message => console.log(message));

        // wbm.start().then(async () => {
        //     const contacts = [
        //         { phone: '+916306435882', name: 'Shaan', age: 21 },
        //         { phone: '+919838009193', name: 'Biceps', age: 33 }
        //     ];
        //     const message = 'Hi {{name}}, your age is {{age}}';
        //     await wbm.send(contacts, message);
        //     await wbm.end();
        // }).catch(err => console.log(err));

        res.status(201).json({message:"Sent successfully"});
    }
}
module.exports = MessageController;

