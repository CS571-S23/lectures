console.log("Hello world!");

fetch("https://cs571.org/s23/week3/api/data", {
    headers: {
        "X-CS571-ID": "bid_00000000000000000000"
    }
})
.then(res => res.json())
.then(prezData => {
    console.log(prezData);

    console.log("Who were the first 3 presidents of the USA?");
    console.log(prezData.slice(0, 3).map(p => p.name));

    console.log("Was there some president named Thomas?");
    console.log(prezData.some(prez => prez.name.toLowerCase().includes("thomas")));

    console.log("Were all the presidents born in the 18th century?");
    console.log(prezData.every(prez => Math.trunc(prez.birth_year / 100) === 17));

    console.log("How many terms were served in total?");
    console.log(prezData.reduce((prevTotal, currPrez) => prevTotal + currPrez.terms_in_office.length, 0))

    console.log("What are the unique political parties?");
    console.log(prezData.reduce((prevParties, currPrez) => {
        // You could make this a one-liner using the spread operator and ternary operator!
        const polParty = currPrez.political_party;
        if (!prevParties.includes(polParty)) {
            return [...prevParties, polParty]
        } else {
            return prevParties
        }
    }, []));

    console.log("Construct an object mapping president name to political affiliation.");
    console.log(prezData.reduce((prevMapping, currPrez) => {
        const prezName = currPrez.name;
        const prezParty = currPrez.political_party;
        return {
            ...prevMapping,
            [prezName]: prezParty // NOTE: [prezName] not just prezName. Do you know why?
        };
    }, {}))

 });