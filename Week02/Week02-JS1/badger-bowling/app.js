document.getElementById("avail-btn").addEventListener("click", () => {
    const randAvail = Math.trunc(Math.random() * 10);
    // alert("There are " + randAvail + " open lanes!");
    alert(`There are ${randAvail} open lanes!`);
})