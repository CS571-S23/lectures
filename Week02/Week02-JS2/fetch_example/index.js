console.log("Hello world!!!!");

const DO_IMPERATIVE = true;

// They do the same thing, but one is imperative
// while the other is declarative.
if (DO_IMPERATIVE) {
    console.log("Doing operations IMPERATIVELY...")
    fetch('https://cs571.org/s23/week2/api/cole', {
        headers: {
            "X-CS571-ID": "bid_00000000000000000000"
        }
    })
    .then(res => {
        console.log(res.status);
        return res.json()
    })
    .then(data => {
        console.log("I recieved data!");
        console.log(data)
        
        document.getElementById('person-name').textContent = data.name
        
        console.log("Favorite colors...");
        for (const color of data.favColors) {
            console.log(color)
        }

        console.log("Semesters with more than 15 credits...");
        for (const sem of data.creditHistory) {
            if(sem.cred > 15) {
                console.log(sem.semester)
            }
        }
    
        // Note: THIS IS AN OBJECT.
        const plants = data.plants;
        let alivePlants = [];
        for (const plant in plants) {
            if(plants[plant].alive) {
                alivePlants.push(plant);
            }
        }
        console.log("Surviving plants...")
        console.log(alivePlants);
    });
} else {
    console.log("Doing operations DECLARATIVELY...")
    fetch('https://cs571.org/s23/week2/api/cole', {
        headers: {
            "X-CS571-ID": "bid_00000000000000000000"
        }
    })
    .then(res => {
        console.log(res.status);
        return res.json()
    })
    .then(data => {
        console.log("I recieved data!");
        console.log(data)
        
        document.getElementById('person-name').textContent = data.name
        
        console.log("Favorite colors...");
        data.favColors.forEach((color) => console.log(color));

        console.log("Semesters with more than 15 credits...");
        data.creditHistory
            .filter(sem => sem.cred > 15)
            .forEach(sem => console.log(sem.semester));
        
        console.log("Surviving plants...");
        // Note: THIS IS AN OBJECT.
        const plantNames = Object.keys(data.plants);
        const alivePlants = plantNames.filter(name => data.plants[name].alive)
        console.log(alivePlants);
    });
}

