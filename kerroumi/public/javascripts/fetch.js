
function makeTable(table,data){
    for(let e of data)
    {
        let u={
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
              if (j === "modifier") {
                btn = document.createElement("BUTTON");
                btn.innerHTML=j;
                btn.classList.add('btn');
                btn.classList.add('btn-outline-danger');
                btn.onclick = function() {
                    document.querySelector("#modal1").classList.add("is-visible");
                    document.querySelector("#update").setAttribute('action', `/users/:${e.id}`)
                    cell.appendChild(btn);
                }}
            else if (j === "supprimer") {
                btn = document.createElement("BUTTON");
                btn.innerHTML=key;
                btn.classList.add('btn');
                btn.onclick = function() {
                    fetch(`http://localhost:3000/users/:${e.id}`, {
                        method: 'DELETE',
                    }).then(location.reload())
                    cell.appendChild(btn);
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

let response = await fetch("localhost:1331/");

let commits = await response.json(); // read response body and parse as JSON

makeTable(table,data);