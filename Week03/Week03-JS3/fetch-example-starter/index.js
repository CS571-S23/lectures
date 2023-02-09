console.log("Hello world!");

fetch("https://cs571.org/s23/week3/api/data", {
    headers: {
        "X-CS571-ID": "bid_00000000000000000000"
    }
})
.then(res => res.json())
.then(prezData => {
    console.log(prezData);

    // TODO: Do the 3 questions
});