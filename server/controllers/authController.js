const bcrypt = require('bcryptjs')

module.exports = {
    login: async (req, res) => {
        const {username, password} = req.body;
        const db = req.app.get('db');
        let foundUser = await db.check_username(username)
        foundUser=foundUser[0]
        if(!foundUser){
            res.status(401).send('user does not exist')
        }
        const authenticated = bcrypt.compareSync(password, foundUser.password)
        if(authenticated){
            delete foundUser.password;
            req.session.user = foundUser;
            
            res.status(202).send(req.session.user)
        } else {
            res.status(401).send('Password is incorrect')
        }
    },

    register: async(req, res) => {
        let { username, email, password, phone_number } = req.body;
        console.log('email', email)
        console.log(username, email, password, phone_number)
        const db = req.app.get('db');
        let foundUser = await db.check_username(username);
        foundUser = foundUser[0]
        console.log('foundUser', foundUser)
        if(foundUser){
            res.status(409).send('User already exists');
        } else {
            const salt = bcrypt.genSaltSync(10);
            const hash= bcrypt.hashSync(password, salt);
            if (!phone_number) {phone_number = 0}
            let newUser = await db.register( username, email, hash, phone_number );
            newUser = newUser[0];
            delete newUser.password;
            req.session.user = {...newUser};
            console.log(req.session.user)
            res.status(200).send(req.session.user);
        }
    },

    logout: async (req, res) => {
        req.session.destroy()
        res.sendStatus(200);
    },

    getUser: async (req, res) => {
        if (req.session.user) {
            res.status(200).send(req.session.user)
        } else {
            res.sendStatus(200)
        }
    },
}