
function makeTable(table,data){
    for(let e of data)
    {
        let u={
            id:e.id,
            username: e.username,
            email: e.email,
            password: e.password,
            role: e.role,
            modifier: "update",
            supprimer: "delete"
        }
        // creates a table row
        let row = document.createElement("tr");
        
        for (let j in u) {
              let cell = document.createElement("td");
              if (u[j] === "update") {
                let btn = document.createElement("button");
                btn.innerHTML=j;
                btn.classList.add('btn');
                btn.classList.add('btn-outline-info');
                cell.appendChild(btn);
                row.appendChild(cell);
                btn.onclick = function() {
                    fetch(`http://localhost:3000/users/${e.id}`, {
                        method: 'put',
                    }).then(location.reload())
                }}
            else if (u[j] === "delete") {
                let btn = document.createElement("button");
                btn.innerHTML = j;
                cell.appendChild(btn);
                row.appendChild(cell);
                btn.classList.add('btn');
                btn.classList.add("btn-outline-danger");
                btn.onclick = function() {
                    fetch(`http://localhost:3000/users/${e.id}`, {
                        method: 'delete',
                    }).then(location.reload())
                }
            }
            else{
                let cellText = document.createTextNode(u[j]);
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            }    
            table.appendChild(row);
    }
}

let table = document.querySelector("table");

fetch('http://localhost:3000/users/all')
    .then(response => response.json())
    .then(data => makeTable(table, data));
