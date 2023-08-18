let infoForm={};// para la tabla.
let tabla = document.getElementById("tablacontacs"); // tabla
function agregarcliente() {      
    const id= document.getElementById('txtid').value
    const nombre= document.getElementById('txtnombre').value
    const Apellido = document.getElementById('txtapellido').value
    const Cedula = document.getElementById('txtcedula').value
    const Telefono = document.getElementById('txttelefono').value
    const Direccion = document.getElementById('txtdireccion').value
                
            axios ({
                method: 'POST',
                url: 'http://127.0.0.1:3000/register',
                data: {id:id,
                       nombre:nombre,
                       Apellido:Apellido,
                       Cedula:Cedula,
                       Telefono:Telefono,
                       Direccion:Direccion,
                    },
              }).then(function (response) {
                alert("cliente agregado ")
                window.location.href = './index.html';
              }).catch(err => console.log('Error: ', err))
             
        }

function consultar_total() {
    /////////////////////// Cantidad /////////////////////////////////
    axios ({
        method: 'GET',
        url: 'http://127.0.0.1:3000/getcount',
        
      }).then(function (response) {
        //console.log(response.data[0].total)
        document.getElementById('num_contactos').innerHTML=response.data[0].total            
      }).catch(err => console.log('Error: ', err))
     ////////////////////////////////////////////////////////////////////////


     //////////////////////// CONSULTA TODOS ///////////////////////////////
     axios ({
        method: 'GET',
        url: 'http://127.0.0.1:3000/getAll',
        
      }).then(function (response) {
       
        //console.log(response)
            for (let i = 0; i < response.data.length; i++) {
                              
                let nuevaFila = tabla.insertRow(tabla.lenght);
    
                cell0 = nuevaFila.insertCell(0);
                cell0.innerHTML = response.data[i].Id; /// primer elemento
    
                cell1 = nuevaFila.insertCell(1);
                cell1.innerHTML = response.data[i].Nombre; /// segundo elemento
    
                cell2 = nuevaFila.insertCell(2);
                cell2.innerHTML = response.data[i].Apellido;  /// tercer elemento
    
                cell3 = nuevaFila.insertCell(3);
                cell3.innerHTML = response.data[i].Cedula;  /// tercer elemento

                cell3 = nuevaFila.insertCell(4);
                cell3.innerHTML = response.data[i].Telefono;

                cell3 = nuevaFila.insertCell(5);
                cell3.innerHTML = response.data[i].Direccion;
    
                cell4  = nuevaFila.insertCell(6);
                cell4.innerHTML =   `<a class="btn btn-warning mx-5 " onClick="onEdit(this)">Edit</a>
                    <a class= "btn btn-danger " onClick="onDelete(this)">Delete</a>`;
                    
            } 
              
      }).catch(err => console.log('Error: ', err))


     /////////////////////////////////////////////////////////////////////
    
}
       
  
