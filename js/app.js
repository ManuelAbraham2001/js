// contedor de cursos
let arrCursos = []

// contenedor de alumnos 
let contenedor = []

// contador para el id de los cursos
let idCurso = 0;

// contador id de alumnos
let idAlumno = 0;

// evento con el boton de agregar
let nuevoCurso = document.getElementById('crear')
nuevoCurso.addEventListener('click', () => {
    let mostrarFormulario = document.getElementById('popup')
    mostrarFormulario.classList.add('show')

    let cerrarForm = document.getElementById('cerrar')
    cerrarForm.addEventListener('click', () => {
        let mostrarFormulario = document.getElementById('popup')
        mostrarFormulario.classList.remove('show')
    })
})

let agregarCurso = document.getElementById('create')
agregarCurso.addEventListener('click', crear)

function crear(){
    
    // obtengo los datos del form
    let anio = document.getElementById('anio').value
    let cantidadAlumnos = document.getElementById('cantidad').value
    let curso = document.getElementById('curso').value

    // objeto constructor
    class Curso {
        constructor(idCurso, anio, cantidadAlumnos, curso, contenedor = []) {
            this.idCurso = idCurso
            this.anio = anio
            this.cantidadAlumnos = cantidadAlumnos
            this.curso = curso
            this.contenedor = contenedor
        }
    }

    // creo un nuevo curso 
    let agregoCurso = new Curso(idCurso++, anio, cantidadAlumnos, curso, contenedor = [])

    // compruebo localstorage
    if(localStorage.getItem('curso') === null){
        // si esta vacio, creo el array para guardar los cursos como objetos
        arrCursos = []
        // agrego el objeto al array
        arrCursos.push(agregoCurso)
        // guardo en localstorage
        localStorage.setItem('curso', JSON.stringify(arrCursos))
    }else{
        // si ya hay datos en localstorage, obtengo los datos del localstorage
        let arrCursos = JSON.parse(localStorage.getItem('curso'))
        // agrego los nuevos objetos al array
        arrCursos.push(agregoCurso)
        // guardo en localstorage
        localStorage.setItem('curso', JSON.stringify(arrCursos))
    }

    // cierro el formulario de crear
    let mostrarFormulario = document.getElementById('popup')
    mostrarFormulario.classList.remove('show')

    // asd
    mostrar()
    
}

function mostrar() {
    
    // obtengo los datos del localstorage
    let obtengoLocal = JSON.parse(localStorage.getItem('curso'))

    // obtengo el contenedor para mostrar los cursos
    let contenedorCursos = document.getElementById('panel')

    // limpio el HTML
    contenedorCursos.innerHTML = ''

    // itero lo que obtuve de localstorage para obtener los valores
    for (let i = 0; i < obtengoLocal.length; i++){

        let anio = obtengoLocal[i].anio
        let cantidad = obtengoLocal[i].cantidadAlumnos
        let curso = obtengoLocal[i].curso
        let idCurso = obtengoLocal[i].idCurso

        // agrego al HTML
        contenedorCursos.innerHTML += `
            
            <div class="contenidoCursos">
            <div class="info">
                <h2>${anio}°${curso}</h2>
                <p>Cantidad de alumnos: ${cantidad}</p>
            </div>
             <div class="opciones">
                <button class="btn-borrar" onclick="borrar('${idCurso}')"><i class="fa-solid fa-trash fa-2x"></i></button>
                <button class="btn-agregar" onclick="formAlumno('${idCurso}')"><i class="fa-solid fa-circle-plus fa-2x"></i></button>
                <button class="btn-editar" onclick="editarCurso('${idCurso}')"><i class="fa-solid fa-pen fa-2x"></i></button>
                <button class="btn-ver" onclick="mostrarAlumno('${idCurso}')"> <i class="fa-solid fa-eye fa-2x"></i> </button>
            </div>
            </div>
        `
        
    }
}

// paso el parametro a comparar
function borrar(idCurso){
    // obtengo los datos de localstorage
    let obtengoLocal = JSON.parse(localStorage.getItem('curso'));
    // itero sobre los objetos en la propiedad id y lo comparo
    for (let i = 0; i < obtengoLocal.length; i++) {
        if (obtengoLocal[i].idCurso == idCurso) {
            arrCursos.findIndex(el => el.idCurso == idCurso)
            obtengoLocal.splice(i, 1);
        }
    }

    // guardo los resultados actualizados a localstorage
    localStorage.setItem('curso', JSON.stringify(obtengoLocal));
    mostrar()
}

// obtengo el id del curso para crear un alumno
function formAlumno(idCurso) {
    

    // creo el formulario de nuevo alumno
    let formAlumno = document.getElementById('alumnoNuevo')
    formAlumno.classList.add('show')

    let creaAlumno = document.getElementById('nuevoAlumno')
    creaAlumno.innerHTML = `

    <ul class="ul_form_nuevoAlumno">
    <h2 style="text-align: center">Crear alumno</h2>
    <li class="li_input">
        <input class="input_form_datosAlumno"type="text" id="nombreAlumno" placeholder="Nombre"> 
    </li>
    <li class="li_input">
        <input class="input_form_datosAlumno"type="text" id="apellidoAlumno" placeholder="Apellido">
    </li>
    <li class="li_input">
        <input class="input_form_datosAlumno" type="number" id="nota1" placeholder="Nota 1" min="1" max="10">
    </li>
    <li class="li_input">
        <input class="input_form_datosAlumno" type="number" id="nota2" placeholder="Nota 2" min="1" max="10">
    </li>
    <li class="li_input">
        <input class="input_form_datosAlumno" type="number" id="nota3" placeholder="Nota 3" min="1" max="10">
    </li class="li_input">
    <li class="li_input">
        <button class="btn-cancelar" id="cancelaAlumno"><i class="fa-solid fa-circle-xmark fa-2x"></i></button> <button class="btn-agregar" onclick="crearAlumno('${idCurso}')"><i class="fa-solid fa-circle-plus fa-2x"></i></button>
    </li>
    </ul>
    `

    let cancelarAlumno = document.getElementById('cancelaAlumno')
    cancelarAlumno.addEventListener('click', () => {
        let removeAlumno = document.getElementById('alumnoNuevo')
        removeAlumno.classList.remove('show')
    })

}

// obtengo el id del curso para crear un alumno
function crearAlumno(idCurso) {
    // obtengo los cursos de LS
    let obtengoLocal = JSON.parse(localStorage.getItem('curso'))

    // obtengo los datos del nuevo alumno
    let nombre = document.getElementById('nombreAlumno').value
    let apellido = document.getElementById('apellidoAlumno').value
    let nota1 = parseFloat(document.getElementById('nota1').value)
    let nota2 = parseFloat(document.getElementById('nota2').value)
    let nota3 = parseFloat(document.getElementById('nota3').value)

    // objeto constructor con la info del alumno

    class NuevoAlumno {
        constructor(nombre, apellido, nota1, nota2, nota3) {
            this.nombre = nombre
            this.apellido = apellido
            this.nota1 = nota1
            this.nota2 = nota2
            this.nota3 = nota3
        }
    }

    // creo el nuevo alumno

    let nuevoAlumno = new NuevoAlumno(nombre, apellido, nota1, nota2, nota3)

    // itero sobre el array de cursos, luego agrego el alumno al array que esta dentro del array de cursos

    for (let i = 0; i < obtengoLocal.length; i++){
        if(obtengoLocal[i].idCurso == idCurso){
            obtengoLocal[i].contenedor.push(nuevoAlumno)
        }
    }

    // guardo los cambios

    localStorage.setItem('curso', JSON.stringify(obtengoLocal));

    // cierro el form

    let formAlumno = document.getElementById('alumnoNuevo')
    formAlumno.classList.remove('show')
    
}

// muestro los alumnos del curso
function mostrarAlumno(idCurso){
    // obtengo los cursos de LS
    let obtengoLocal = JSON.parse(localStorage.getItem('curso'))

    let mostrar = document.getElementById('container')
    mostrar.classList.add('show')

    let mostrarAlumno = document.getElementById('tablaAlumnos')
    mostrarAlumno.innerHTML = ''
    // itero el array de cursos
    for (let i = 0; i < obtengoLocal.length; i++){
        // comparo el id del click con el id del curso del objeto
        if(obtengoLocal[i].idCurso == idCurso){
            // si son iguales, por cada curso recorro el array de alumnos
            for(let x = 0; x < obtengoLocal[i].contenedor.length; x++){
                // obtengo los datos
                let nombre = obtengoLocal[i].contenedor[x].nombre
                let apellido = obtengoLocal[i].contenedor[x].apellido
                let nota1 = obtengoLocal[i].contenedor[x].nota1
                let nota2 = obtengoLocal[i].contenedor[x].nota2
                let nota3 = obtengoLocal[i].contenedor[x].nota3
                let promedio = (obtengoLocal[i].contenedor[x].nota1 + obtengoLocal[i].contenedor[x].nota2 + obtengoLocal[i].contenedor[x].nota3) / 3

                // muestro en el html
                mostrarAlumno.innerHTML += `<h2>Nombre: ${nombre}</h2> <br>
                <p>Apellido: ${apellido}</p>
                <p>Nota 1: ${nota1}</p>
                <p>Nota 2: ${nota2}</p>
                <p>Nota 3: ${nota3}</p>
                <p>Promedio: ${promedio}</p>

                <button onclick="alumnoForm('${nombre}')"id="formAlumno">Editar</button> 
                <button onclick="borrarAlumno('${nombre}', '${apellido}')"id="borrarAlumno">Borrar</button> `
            }
            
        }
        
    }

    
    let cancelaAlumno = document.getElementById('cancelaAlumnoCrear')
    cancelaAlumno.addEventListener('click', () => {
        let cerrar = document.getElementById('container')
        cerrar.classList.remove('show')
    })
}

// borrar alumno, obtengo el nombre y apellido del alumno a borrar (no pude implementarlo con id)
function borrarAlumno(nombre, apellido){

    // obtengo los datos de LS
    let obtengoLocal = JSON.parse(localStorage.getItem('curso'))
    let mostrar = document.getElementById('container')
    
    // recorro el array de cursos
    for (let i = 0; i < obtengoLocal.length; i++){
        // por cada curso recorro el array de alumnos
        for(let x = 0; x < obtengoLocal[i].contenedor.length; x++){
            // comparo el nombre del click con el nombre del objeto
            if(obtengoLocal[i].contenedor[x].nombre == nombre && obtengoLocal[i].contenedor[x].apellido == apellido){
                // si son iguales, obtengo el index y lo borro
                obtengoLocal[i].contenedor.findIndex(el => el.nombre == nombre)
                obtengoLocal[i].contenedor.splice(x, 1);
                mostrar.innerHTML += ` `
            }
        }
        
    }
    // actualizo LS
    localStorage.setItem('curso', JSON.stringify(obtengoLocal));
    
}

function editarCurso(idCurso){
    let editar = document.getElementById('editar')
    editar.classList.add('show')

    let form = document.getElementById('editarCurso')
    form.innerHTML = `
    
    <div class="formNuevo">

    <input type="number" class="input_form_nuevo" id="editarAnio" placeholder="Año">
    <input type="number" class="input_form_nuevo" id="editarCantidad" placeholder="Cantidad de alumnos">
    <select class="input_form_nuevo" id="editarCurso">
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
    </select>
    <div>
        <button class="btn-update" onclick="actualizarAnio('${idCurso}')"id="actualizar"><i class="fa-solid fa-circle-arrow-up fa-2x"></i></button> 
        <button class="btn-cancelar" id="cancelarEditarCurso"><i class="fa-solid fa-circle-xmark fa-2x fa-2x"></i></button>
    </div>

    </div>
`

    let cancelarEditarCurso = document.getElementById('cancelarEditarCurso')
    cancelarEditarCurso.addEventListener('click', () => {
        let editar = document.getElementById('editar')
        editar.classList.remove('show')
    })
}

// recibo el id del curos y actualizo

function actualizarAnio(idCurso){
    // obtengo LS
    let obtengoLocal = JSON.parse(localStorage.getItem('curso'));
    
    // obtengo los nuevos valores
    let nuevoAnio = document.getElementById('editarAnio').value
    let nuevaCantidad = document.getElementById('editarCantidad').value
    let nuevoCurso = document.getElementById('editarCurso').value

    // recorro el arrat de cursos
    for (let i = 0; i < obtengoLocal.length; i++) {
        if (obtengoLocal[i].idCurso == idCurso) {
            // si son iguales reemplazo los valores
            obtengoLocal[i].anio = nuevoAnio
            obtengoLocal[i].cantidadAlumnos = nuevaCantidad
            obtengoLocal[i].curso = nuevoCurso
        }
    }

    // actualizo LS
    localStorage.setItem('curso', JSON.stringify(obtengoLocal));

    let editar = document.getElementById('editar')
    editar.classList.remove('show')
    mostrar()
}

// creo form de editar alumno
function alumnoForm(nombre){
    let remuevoEditar = document.getElementById('container')
    remuevoEditar.classList.remove('show')
    let editar = document.getElementById('alumnoForm')
    editar.classList.add('show')

    let form = document.getElementById('alumnoEditar')
    form.innerHTML = `
    <input type="text"  id="editarNombre" placeholder="Nuevo nombre">
    <input type="text" id="nuevoApellido" placeholder="Apellido">
    <input type="number" id="nuevaN1" placeholder="Nota 1">
    <input type="number" id="nuevaN2" placeholder="Nota 2">
    <input type="number" id="nuevaN3" placeholder="Nota 3">
    <button onclick="alumnoEditar('${nombre}')">Actualizar</button>
    <button id="cancelarAlumnoActualizar" onclick="cancelarAlumno()">Cancelar</button>`

    let cancelarAlumnoActualizar = document.getElementById('cancelarAlumnoActualizar')
    cancelarAlumnoActualizar.addEventListener('click', () => {
        let cerrarAlumnoActualizar = document.getElementById('alumnoForm')
        cerrarAlumnoActualizar.classList.remove('show')
    })
}

// recibo el nombre por parametro y actualizo

function alumnoEditar(nombre){
    // obtengo LS
    let obtengoLocal = JSON.parse(localStorage.getItem('curso'))

    // obtengo los nuevos datos
    let nuevoNombre = document.getElementById('editarNombre').value
    let nuevoApellido = document.getElementById('nuevoApellido').value
    let nuevaN1 = parseFloat(document.getElementById('nuevaN1').value)
    let nuevaN2 = parseFloat(document.getElementById('nuevaN2').value)
    let nuevaN3 = parseFloat(document.getElementById('nuevaN3').value)

    // recorro el array de cursos
    for (let i = 0; i < obtengoLocal.length; i++){
        // por cada curso reccorro el array de alumnos
        for(let x = 0; x < obtengoLocal[i].contenedor.length; x++){
            if(obtengoLocal[i].contenedor[x].nombre == nombre){
                // si el nombre del click es igual al del objeto, actualizo los datos
                obtengoLocal[i].contenedor[x].nombre = nuevoNombre
                obtengoLocal[i].contenedor[x].apellido = nuevoApellido
                obtengoLocal[i].contenedor[x].nota1 = nuevaN1
                obtengoLocal[i].contenedor[x].nota2 = nuevaN2
                obtengoLocal[i].contenedor[x].nota3 = nuevaN3
            }
        }
        
    }

    // actualizo LS
    localStorage.setItem('curso', JSON.stringify(obtengoLocal));

    let editar = document.getElementById('alumnoForm')
    editar.classList.remove('show')
}

mostrar()

