



function makeTable(table,data){
    for(let e of data)
    {
        let u={
            id:e.id,
            username: e.username,
            email: e.email,
            password: e.password,
            role: e.role,
            supprimer: "supprimer",
            modifier:"modifier"
        }
        // creates a table row
        let row = document.createElement("tr");
        
        for (let j in u) {
              let cell = document.createElement("td");
              if (u[j] === "supprimer") {
                let btn = document.createElement("button");
                btn.innerHTML='X';
                btn.classList.add('btn');
                btn.classList.add('btn-outline-danger');
                cell.appendChild(btn);
                row.appendChild(cell);
                btn.onclick = function() {
                    fetch(`http://localhost:3000/users/${e.id}`, {
                        method: 'delete',
                    }).then(location.reload())
                }
            }
            else if(u[j] === "modifier"){
                let btn = document.createElement("button");
                btn.innerHTML='modifier';
                btn.classList.add('btn');
                btn.classList.add('btn-outline-info');
                cell.appendChild(btn);
                row.appendChild(cell);
                btn.onclick = function() {
                    let UserID=document.getElementById('ID1');
                    document.querySelector('.update').setAttribute('action', `/users/${e.id}`)
                    document.getElementById('btn1').disabled=false;
                    UserID.value=e.id;
                    UserID.disabled=true;
                    document.getElementById('name1').focus();

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

if(table)
{
    fetch('http://localhost:3000/users/all')
        .then(response => response.json())
        .then(data => makeTable(table, data));
}

