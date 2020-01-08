//Axios goes here...eventually!

export default {
    signup: function (email, password) {

        return new Promise((resolve, reject) => {
            try {
                //first, generate a random amount of time it will take to resolve...
                const timeToTake = Math.floor(Math.random() * 20);

                //next, see if our email and password are okay...
                if(password.length < 8) {
                    reject(new Error("Password too short!"));
                    return;
                }

                //Set a timeout for how long we should pretend to be talking to the back end
                setTimeout(() => {
                    console.log("Fake axios call resolves!");
                    resolve( //and we will 'resolve' with a fake new user!
                        {
                            _id: 1,
                            email: email
                        }
                    )
                }, 100 * timeToTake);

            } catch (error) {
                //if there are any problems, we should reject the promise
                reject(error);
            }
        });
    }
};