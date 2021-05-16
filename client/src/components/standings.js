let arr = [];

// var obj = {
//     rank: Number,
//     name: String,
//     Solved: Number,
//     Points: Number,
//     a: Number,
//     b: Number,
//     c: Number,
//     d: Number,
//     e: Number,
// };

let sortedCars = [];

window.onload = function () {
    let x = 1;
    document.querySelector(".update-table").addEventListener("click", function () {
        //window.location.reload();
        assign();
        sort();
        document.querySelector(".contest-winner").innerHTML = arr[0].name;
        if (x === 1) {
            table();
            x = 2;
        } else {
            deleteTable()
            table();
        }
    });
    console.log(arr);
    console.log(sortedCars);
}

function sort() {
    sortedCars = arr.sort((c1, c2) => (c1.Points < c2.Points) ? 1 : (c1.Points > c2.Points) ? -1 : 0);
}

function assign() {
    //let newobj = obj;
    arr = [];
    for (let i = 0; i < 10; i++) {
        let a1 = Math.floor((Math.random() * 100) + 1);
        let a2 = Math.floor((Math.random() * 100) + 1);
        let a3 = Math.floor((Math.random() * 100) + 1);
        let a4 = Math.floor((Math.random() * 100) + 1);
        let a5 = Math.floor((Math.random() * 100) + 1);
        let point = a1 + a2 + a3 + a4 + a5;
        let obj = {
            rank: 1,
            name: "Lord_Invincible" + i + i + i + i + i,
            Solved: 5,
            Points: point,
            a: a1,
            b: a2,
            c: a3,
            d: a4,
            e: a5,
        }
        arr.push(obj);
    }
}

function table() {
    //deleteTable();
    for (let i = 0; i < 10; i++) {
        let stand = document.querySelector(".table-body");
        let row = document.createElement("tr");
        for (let j in arr[i]) {
            let cell = document.createElement("td");
            console.log(arr[i][j]);
            let cellText = document.createTextNode(arr[i][j]);
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        stand.appendChild(row);
    }
}

function deleteTable() {
    for (let i = 1; i <= 10; i++) {
        document.querySelector(".striped").deleteRow(1);
    }
}