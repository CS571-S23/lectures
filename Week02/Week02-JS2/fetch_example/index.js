console.log("Hello world!!!!");

const DO_IMPERATIVE = true;

// They do the same thing, but one is imperative
// while the other is declarative.
if (DO_IMPERATIVE) {
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

        // Note: THIS IS AN ARRAY.
        const semesterData = data.creditHistory;
        let moreThan15Creds = [];
        for (const sem of semesterData) {
            if(sem.cred > 15) {
                moreThan15Creds.push(sem);
            }
        }
        console.log("Semesters with more than 15 credits...");
        console.log(moreThan15Creds);
    
        // Note: THIS IS AN OBJECT.
        const plants = data.plants;
        let numAlive = 0;
        let numPlants = 0;
        for (const plant in plants) {
            numPlants += 1;
            const poorPlant = plants[plant]
            if (poorPlant.alive) {
                numAlive += 1;
            }
        }
        console.log("Plant survivorship probability...");
        console.log(numAlive / numPlants);
    });
} else {
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
        data.favColors.forEach(color => console.log(color));

        console.log("Semesters with more than 15 credits...");
        console.log(data.creditHistory.filter(sem => sem.cred > 15));
    
        // Note: THIS IS AN OBJECT.
        const plants = Object.keys(data.plants);
        console.log("Plant survivorship probability...");
        console.log(plants.filter(p => data.plants[p].alive).length / plants.length);
    });
}

