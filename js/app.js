function mostrar(){
    
    // obtengo los datos del localstorage
    let obtengoLocal = JSON.parse(localStorage.getItem('curso'))

    // obtengo el contenedor para mostrar los cursos
    let contenedorCursos = document.getElementById('panel')

    // limpio el HTML
    contenedorCursos.innerHTML = ''

    // itero lo que obtuve de localstorage para obtener los valores

    for (const cursos of obtengoLocal) {
        
        let {anio, curso, idCurso} = cursos

        let cantidadAlumnos = cursos.contenedor.length

        // agrego al HTML
        contenedorCursos.innerHTML += `
            
            <div class="contenidoCursos">
            <div class="info">
                <h2>${anio}°${curso}</h2>
                <p>Cantidad de alumnos: ${cantidadAlumnos}</p>
            </div>
             <div class="opciones">
                <button class="btn-borrar" onclick="borrar('${idCurso}')"><i class="fa-solid fa-trash fa-2x"></i></button>
                <button class="btn-agregar" onclick="formAlumno('${idCurso}')"><i class="fa-solid fa-circle-plus fa-2x"></i></button>
                <button class="btn-editar" onclick="editarCurso('${idCurso}', '${anio}')"><i class="fa-solid fa-pen fa-2x"></i></button>
                <button class="btn-ver" onclick="mostrarAlumno('${idCurso}')"> <i class="fa-solid fa-eye fa-2x"></i> </button>
            </div>
            </div>
        `
    }

}

// menu navegacion
nav()
function nav(){
    let btnMenu = document.querySelectorAll('.btn_menu')
    for(let i = 0; i < btnMenu.length; i++){
        btnMenu[i].addEventListener('click', () => {
            if(btnMenu[i].textContent == 'Cursos'){
                let panel = document.getElementById('panel')
                let crear = document.getElementById('crear')
                crear.classList.remove('hidden')
                panel.classList.remove('profesores', 'materias')
                panel.classList.add('cursos')
                let lista = document.querySelector('.menu__mobile')
                lista.classList.add('hidden')
                mostrar()
            }else if(btnMenu[i].textContent == 'Profesores'){
                let panel = document.getElementById('panel')
                let crear = document.getElementById('crear')
                crear.classList.add('hidden')
                panel.classList.remove('cursos', 'materias')
                panel.classList.add('profesores')
                let lista = document.querySelector('.menu__mobile')
                lista.classList.add('hidden')
                profesores()
            }else{
                let panel = document.getElementById('panel')
                let crear = document.getElementById('crear')
                crear.classList.add('hidden')
                panel.classList.remove('profesores', 'cursos')
                panel.classList.add('materias')
                let lista = document.querySelector('.menu__mobile')
                lista.classList.add('hidden')
                materias()
            }

        })
    }
}

window.addEventListener("resize", () => {
    if (window.innerWidth > 480){
        let menu = document.querySelector('.menu__mobile')
       menu.classList.add('hidden')
    }
})

// menu hamburguesa

let bars = document.querySelector('.bars')
bars.addEventListener('click', () => {
    let lista = document.querySelector('.menu__mobile')
    lista.classList.toggle('hidden')
})

// let cerrarMenuMobile = document.querySelector('.menu__mobile__close')
// cerrarMenuMobile.addEventListener('click', () => {
//     let lista = document.querySelector('.menu__mobile')
//     lista.classList.add('hidden')
// })

function alerta(mensaje, clase){
    let alertaExiste = document.querySelector('.alerta')
    if(alertaExiste){
        alertaExiste.remove();
    }

    let nuevaAlerta = document.createElement('P')
    nuevaAlerta.textContent = mensaje
    nuevaAlerta.classList.add('alerta')

    let alerta = document.querySelector(clase)
    alerta.classList.add('margin')
    alerta.appendChild(nuevaAlerta)

    setTimeout(() => {
        let alertaExiste = document.querySelector('.alerta')
        alertaExiste.remove()
        let alerta = document.querySelector(clase)
        alerta.classList.remove('margin')
    }, 2000)

}

function notificacion(mensaje, color){
    Toastify({
        text: mensaje,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: color,
        },
        onClick: function(){} // Callback after click
    }).showToast();
}

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
    let idCurso = 0
    if(JSON.parse(localStorage.getItem('curso')) === null){
        idCurso = 1
    }else{
        let obtengoLocal = JSON.parse(localStorage.getItem('curso'))
            for(let x = 0; x < obtengoLocal.length; x++){
                let ultimoId = obtengoLocal[obtengoLocal.length - 1].idCurso
                idCurso = ultimoId + 1
            }
        localStorage.setItem('curso', JSON.stringify(obtengoLocal))
    }

    // obtengo los datos del form
    let anio = document.getElementById('anio').value
    let curso = document.getElementById('curso').value

    if(anio < 1){
        alerta('Año invalido', '.div-alerta')
        return
    }

    // objeto constructor
    class Curso {
        constructor(idCurso, anio, curso, contenedor = []) {
            this.idCurso = idCurso
            this.anio = anio
            this.curso = curso
            this.contenedor = contenedor
        }
    }

    // creo un nuevo curso 
    let agregoCurso = new Curso(idCurso++, anio, curso, contenedor = [])

    // compruebo localstorage
    if(localStorage.getItem('curso') === null){
        // si esta vacio, creo el array para guardar los cursos como objetos
        let arrCursos = []
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
    notificacion('Curso creado con exito', 'linear-gradient(to right, #68ce60, #55c868, #41c270, #29bc76, #00b67c)')
    mostrar()
    
}



// paso el parametro a comparar
function borrar(idCurso){
    // obtengo los datos de localstorage
    let obtengoLocal = JSON.parse(localStorage.getItem('curso'));
    // itero sobre los objetos en la propiedad id y lo comparo
    for (let i = 0; i < obtengoLocal.length; i++) {
        if (obtengoLocal[i].idCurso == idCurso) {
            obtengoLocal.findIndex(el => el.idCurso == idCurso)
            obtengoLocal.splice(i, 1);
        }
    }

    // guardo los resultados actualizados a localstorage
    localStorage.setItem('curso', JSON.stringify(obtengoLocal));
    mostrar()
    notificacion('Curso eliminado con exito', 'linear-gradient(to right, #ce6060, #c95d67, #c35a6d, #bc5873, #b45778)')
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
        <input class="input_form_datosAlumno" type="text" id="nombreAlumno" placeholder="Nombre"> 
    </li>
    <li class="li_input">
        <input class="input_form_datosAlumno" type="text" id="apellidoAlumno" placeholder="Apellido">
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
    <div class="div-alerta-alumno">
    </div>
    <li class="li_input">
        <button class="btn-cancelar" id="cancelaAlumno"><i class="fa-solid fa-circle-xmark fa-2x"></i></button> <button class="btn-agregar" onclick="crearAlumno('${idCurso}')"><i class="fa-solid fa-circle-plus fa-2x" style="color: #fff;
        background-color: #94B49F;"></i></button>
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

    if(nombre.length === 0 && apellido.length === 0){
        alerta('Nombre y Apellido invalidos', '.div-alerta-alumno')
        return
    }

    if(nombre.length === 0){
        alerta('Nombre invalido', '.div-alerta-alumno')
        return
    }

    if(apellido.length === 0){
        alerta('Apellido invalido', '.div-alerta-alumno')
        return
    }

    if(nota1 > 10 || nota1 < 1 || nota2 > 10 || nota2 < 1 || nota3 > 10 || nota3 < 1 || document.getElementById('nota1').value.length == 0 || document. getElementById('nota2').value.length == 0 || document.getElementById('nota3').value.length == 0){
        alerta('Las notas debe ser de 1 a 10', '.div-alerta-alumno')
        return
    }

    // objeto constructor con la info del alumno
    class NuevoAlumno {
        constructor(nombre, apellido, nota1, nota2, nota3, promedio) {
            this.nombre = nombre
            this.apellido = apellido
            this.nota1 = nota1
            this.nota2 = nota2
            this.nota3 = nota3
            this.promedio = promedio = parseFloat(((nota1 + nota2 + nota3) / 3).toFixed(2))
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
    notificacion('Alumno creado con exito', 'linear-gradient(to right, #68ce60, #55c868, #41c270, #29bc76, #00b67c)')
    mostrar()
    
}

// muestro los alumnos del curso
function mostrarAlumno(idCurso){
    // obtengo los cursos de LS
    let obtengoLocal = JSON.parse(localStorage.getItem('curso'))

    let mostrarContainer = document.getElementById('container')
    mostrarContainer.classList.add('show')

    let ordenar = document.getElementById('ordenar')
    ordenar.innerHTML = `<button id="ordenaNombre" onclick="ordenar('${idCurso}')">Ordenar por nombre</button> 
    <button id="ordenaApellido" onclick="ordenarApellido('${idCurso}')">Ordenar por apellido</button>
    <button id="ordenaPromedio" onclick="ordenarPromedio('${idCurso}')">Ordenar por promedio</button>
    <button id="ordenaAprobados" onclick="mostrarAprobados('${idCurso}')">Mostrar aprobados</button> 
    <button id="ordenaDesaprobados" onclick="mostrarDesaprobados('${idCurso}')">Mostrar desaprobados</button>
    <button id="restablecer" onclick="restablecerFiltros('${idCurso}')">Restablecer</button>
    `
    
    let mostrarAlumno = document.getElementById('tablaAlumnos')
    mostrarAlumno.innerHTML = ''
    // itero el array de cursos
    for (let i = 0; i < obtengoLocal.length; i++){
        
        // comparo el id del click con el id del curso del objeto
        if(obtengoLocal[i].idCurso == idCurso){
            if(obtengoLocal[i].contenedor.length == 0){
                notificacion('No hay alumnos para mostrar', 'linear-gradient(to right, #ce6060, #c95d67, #c35a6d, #bc5873, #b45778)')
                let mostrarContainer = document.getElementById('container')
                mostrarContainer.classList.remove('show')
            }
            // si son iguales, por cada curso recorro el array de alumnos
            for(let x = 0; x < obtengoLocal[i].contenedor.length; x++){
                // obtengo los datos
                // let nombre = obtengoLocal[i].contenedor[x].nombre
                // let apellido = obtengoLocal[i].contenedor[x].apellido
                // let nota1 = obtengoLocal[i].contenedor[x].nota1
                // let nota2 = obtengoLocal[i].contenedor[x].nota2
                // let nota3 = obtengoLocal[i].contenedor[x].nota3


                let {nombre, apellido, nota1, nota2, nota3, promedio} = obtengoLocal[i].contenedor[x]
                // let promedio = ((obtengoLocal[i].contenedor[x].nota1 + obtengoLocal[i].contenedor[x].nota2 + obtengoLocal[i].contenedor[x].nota3) / 3).toFixed(2)
                
                // muestro en el html
                mostrarAlumno.innerHTML += `
                <div class="info_alumno">
                    <p>Nombre: <span>${nombre}</span></p>
                    <p>Apellido: <span>${apellido}</span></p>
                    <p>Nota 1: <span>${nota1}</span></p>
                    <p>Nota 2: <span>${nota2}</span></p>
                    <p>Nota 3: <span>${nota3}</span></p>
                    <p>Promedio: <span>${promedio}</p>
                    <div class="btns__info__alumnos">
                        <button class="btn-editar" onclick="alumnoForm('${nombre}', '${apellido}', '${idCurso}')"id="formAlumno"><i class="fa-solid fa-pen fa-2x"></i></button> 
                        <button class="btn-cancelar" onclick="borrarAlumno('${nombre}', '${apellido}', '${idCurso}')"id="borrarAlumno"><i class="fa-solid fa-circle-xmark fa-2x"></i></button>
                    </div>
                </div>
                
                `
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
function borrarAlumno(nombre, apellido, idCurso){

    // obtengo los datos de LS
    let obtengoLocal = JSON.parse(localStorage.getItem('curso'))
    let mostrarContainer = document.getElementById('container')
    
    // recorro el array de cursos
    for (let i = 0; i < obtengoLocal.length; i++){
        // por cada curso recorro el array de alumnos
        for(let x = 0; x < obtengoLocal[i].contenedor.length; x++){
            // comparo el nombre y apellido del click con el nombre del objeto
            if(obtengoLocal[i].contenedor[x].nombre == nombre && obtengoLocal[i].contenedor[x].apellido == apellido){
                // si son iguales, obtengo el index y lo borro
                obtengoLocal[i].contenedor.findIndex(el => el.apellido == apellido && el.nombre == nombre)
                obtengoLocal[i].contenedor.splice(x, 1);
                mostrarContainer.innerHTML += ` `
            }
        }
        
    }
    // actualizo LS
    localStorage.setItem('curso', JSON.stringify(obtengoLocal));
    mostrarAlumno(idCurso)
    notificacion('Alumno eliminado con exito', 'linear-gradient(to right, #ce6060, #c95d67, #c35a6d, #bc5873, #b45778)')
    mostrar()
}

function editarCurso(idCurso, anio){
    let editar = document.getElementById('editar')
    editar.classList.add('show')

    let form = document.getElementById('editarCurso')
    form.innerHTML = `
    
    <div class="formNuevo">
        <h2>Editar Curso</h2>
    <input type="number" class="input_form_nuevo" id="editarAnio" placeholder="Año" value="${anio}">
    <select class="input_form_nuevo" id="editarCurso">
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
    </select>
    <div class="div-alerta-anio"></div>
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
    let nuevoCurso = document.getElementById('editarCurso').value

    if(nuevoAnio < 1){
        alerta('Anio invalido', '.div-alerta-anio')
        return
    }

    // recorro el arrat de cursos
    for (let i = 0; i < obtengoLocal.length; i++) {
        if (obtengoLocal[i].idCurso == idCurso) {
            // si son iguales reemplazo los valores
            obtengoLocal[i].anio = nuevoAnio
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
function alumnoForm(nombre, apellido, idCurso){
    let remuevoEditar = document.getElementById('container')
    remuevoEditar.classList.remove('show')
    let editar = document.getElementById('alumnoForm')
    editar.classList.add('show')

    let form = document.getElementById('alumnoEditar')
    form.innerHTML = `
    
    <ul class="ul_form_nuevoAlumno">
    <li><h2 style="text-align: center;">Editar Alumno</h2></li>
    <li class="li_input"><input class="input_form_datosAlumno" type="text"  id="editarNombre" placeholder="Nuevo nombre" value="${nombre}"></li>
    <li class="li_input"><input class="input_form_datosAlumno" type="text" id="nuevoApellido" placeholder="Apellido" value="${apellido}"></li>
    <li class="li_input"><input class="input_form_datosAlumno" type="number" id="nuevaN1" placeholder="Nota 1"></li>
    <li class="li_input"><input class="input_form_datosAlumno" type="number" id="nuevaN2" placeholder="Nota 2"></li>
    <li class="li_input"><input class="input_form_datosAlumno" type="number" id="nuevaN3" placeholder="Nota 3"></li>
    <div class="div-alerta-nuevoAlumno"></div>
    <li class="li_input"><button class="btn-update" onclick="alumnoEditar('${nombre}', '${apellido}', '${idCurso}')"><i class="fa-solid fa-circle-arrow-up fa-2x"></i></button>
    <button class="btn-cancelar" id="cancelarAlumnoActualizar"><i class="fa-solid fa-circle-xmark fa-2x"></i></button></li>
    </ul>
    `

    let cancelarAlumnoActualizar = document.getElementById('cancelarAlumnoActualizar')
    cancelarAlumnoActualizar.addEventListener('click', () => {
        let cerrarAlumnoActualizar = document.getElementById('alumnoForm')
        cerrarAlumnoActualizar.classList.remove('show')
        mostrarAlumno(idCurso)
    })
}

// recibo el nombre por parametro y actualizo

function alumnoEditar(nombre, apellido, idCurso){
    
    // obtengo LS
    let obtengoLocal = JSON.parse(localStorage.getItem('curso'))

    // obtengo los nuevos datos
    let nuevoNombre = document.getElementById('editarNombre').value
    let nuevoApellido = document.getElementById('nuevoApellido').value
    let nuevaN1 = parseFloat(document.getElementById('nuevaN1').value)
    let nuevaN2 = parseFloat(document.getElementById('nuevaN2').value)
    let nuevaN3 = parseFloat(document.getElementById('nuevaN3').value)

    if(nuevoNombre.length === 0 && nuevoApellido.length === 0){
        alerta('Nombre y Apellido invalidos', '.div-alerta-nuevoAlumno')
        return
    }

    if(nuevoNombre.length === 0){
        alerta('Nombre invalido', '.div-alerta-nuevoAlumno')
        return
    }

    if(nuevoApellido.length === 0){
        alerta('Apellido invalido', '.div-alerta-nuevoAlumno')
        return
    }

    if(nuevaN1 > 10 || nuevaN1 < 1 || nuevaN2 > 10 || nuevaN2 < 1 || nuevaN3 > 10 || nuevaN3 < 1 || document.getElementById('nuevaN1').value.length == 0 || document. getElementById('nuevaN2').value.length == 0 || document.getElementById('nuevaN3').value.length == 0){
        alerta('Las notas debe ser de 1 a 10', '.div-alerta-nuevoAlumno')
        return
    }

    // recorro el array de cursos
    for (let i = 0; i < obtengoLocal.length; i++){
        // por cada curso reccorro el array de alumnos
        for(let x = 0; x < obtengoLocal[i].contenedor.length; x++){
            if(obtengoLocal[i].contenedor[x].nombre == nombre && obtengoLocal[i].contenedor[x].apellido == apellido){
                // si el nombre del click es igual al del objeto, actualizo los datos
                obtengoLocal[i].contenedor[x].nombre = nuevoNombre
                obtengoLocal[i].contenedor[x].apellido = nuevoApellido
                obtengoLocal[i].contenedor[x].nota1 = nuevaN1
                obtengoLocal[i].contenedor[x].nota2 = nuevaN2
                obtengoLocal[i].contenedor[x].nota3 = nuevaN3    
                obtengoLocal[i].contenedor[x].promedio = parseFloat(((nuevaN1 + nuevaN2 + nuevaN3) / 3).toFixed(2))
            }
        }
    }
        
    // actualizo LS
    localStorage.setItem('curso', JSON.stringify(obtengoLocal));

    let editar = document.getElementById('alumnoForm')
    editar.classList.remove('show')

    mostrarAlumno(idCurso)
    notificacion('Alumno actualizado con exito', 'linear-gradient(to right, #68ce60, #55c868, #41c270, #29bc76, #00b67c)')
}

let ordenaNombre = document.getElementById('ordenaNombre')
function ordenar(idCurso){
    let obtengoLocal = JSON.parse(localStorage.getItem('curso'))

    let mostrarAlumno = document.getElementById('tablaAlumnos')
    mostrarAlumno.innerHTML = ''
    
    for (let i = 0; i < obtengoLocal.length; i++){
        if(obtengoLocal[i].idCurso == idCurso){
            obtengoLocal[i].contenedor.sort(function(a, b){
                if(a.nombre > b.nombre) return 1
                
                if(a.nombre < b.nombre) return -1
        
                return 0
            })

            for(let x = 0; x < obtengoLocal[i].contenedor.length; x++){
                
                let {nombre, apellido, nota1, nota2, nota3, promedio} = obtengoLocal[i].contenedor[x]
                // let promedio = ((obtengoLocal[i].contenedor[x].nota1 + obtengoLocal[i].contenedor[x].nota2 + obtengoLocal[i].contenedor[x].nota3) / 3).toFixed(2)
                
                // muestro en el html
                mostrarAlumno.innerHTML += `
                <div class="info_alumno">
                <p>Nombre: <span>${nombre}</span></p>
                <p>Apellido: <span>${apellido}</span></p>
                <p>Nota 1: <span>${nota1}</span></p>
                <p>Nota 2: <span>${nota2}</span></p>
                <p>Nota 3: <span>${nota3}</span></p>
                <p>Promedio: <span>${promedio}</p>
                <div class="btns__info__alumnos">
                    <button class="btn-editar" onclick="alumnoForm('${nombre}', '${apellido}', '${idCurso}')"id="formAlumno"><i class="fa-solid fa-pen fa-2x"></i></button> 
                    <button class="btn-cancelar" onclick="borrarAlumno('${nombre}', '${apellido}', '${idCurso}')"id="borrarAlumno"><i class="fa-solid fa-circle-xmark fa-2x"></i></button>
                </div>
                </div>
                
                `
            
            }   
        }
    }
}

let ordenaApellido = document.getElementById('ordenaApellido')
function ordenarApellido(idCurso){
    let obtengoLocal = JSON.parse(localStorage.getItem('curso'))

    let mostrarAlumno = document.getElementById('tablaAlumnos')
    mostrarAlumno.innerHTML = ''

    for (let i = 0; i < obtengoLocal.length; i++){
        if(obtengoLocal[i].idCurso == idCurso){
            obtengoLocal[i].contenedor.sort(function(a, b){
                if(a.apellido > b.apellido) return 1
                    
                if(a.apellido < b.apellido) return -1
            
                return 0
            })
    
            for(let x = 0; x < obtengoLocal[i].contenedor.length; x++){
                
                let {nombre, apellido, nota1, nota2, nota3, promedio} = obtengoLocal[i].contenedor[x]
                // let promedio = ((obtengoLocal[i].contenedor[x].nota1 + obtengoLocal[i].contenedor[x].nota2 + obtengoLocal[i].contenedor[x].nota3) / 3).toFixed(2)
                
                // muestro en el html
                mostrarAlumno.innerHTML += `
                <div class="info_alumno">
                <p>Nombre: <span>${nombre}</span></p>
                <p>Apellido: <span>${apellido}</span></p>
                <p>Nota 1: <span>${nota1}</span></p>
                <p>Nota 2: <span>${nota2}</span></p>
                <p>Nota 3: <span>${nota3}</span></p>
                <p>Promedio: <span>${promedio}</p>
                <div class="btns__info__alumnos">
                    <button class="btn-editar" onclick="alumnoForm('${nombre}', '${apellido}', '${idCurso}')"id="formAlumno"><i class="fa-solid fa-pen fa-2x"></i></button> 
                    <button class="btn-cancelar" onclick="borrarAlumno('${nombre}', '${apellido}', '${idCurso}')"id="borrarAlumno"><i class="fa-solid fa-circle-xmark fa-2x"></i></button>
                </div>
                </div>
                
                `
            
            }   
        }
    
    }

}

let ordenaPromedio = document.getElementById('ordenaPromedio')
function ordenarPromedio(idCurso){
    // obtengo los cursos de LS
    let obtengoLocal = JSON.parse(localStorage.getItem('curso'))

    let mostrarAlumno = document.getElementById('tablaAlumnos')
    mostrarAlumno.innerHTML = ''

    for (let i = 0; i < obtengoLocal.length; i++){
        if(obtengoLocal[i].idCurso == idCurso){
            
            for(let x = 0; x < obtengoLocal[i].contenedor.length; x++){
                
                obtengoLocal[i].contenedor.sort(function(a, b){return b.promedio - a.promedio})
                let {nombre, apellido, nota1, nota2, nota3, promedio} = obtengoLocal[i].contenedor[x]
                // let promedio = ((obtengoLocal[i].contenedor[x].nota1 + obtengoLocal[i].contenedor[x].nota2 + obtengoLocal[i].contenedor[x].nota3) / 3).toFixed(2)
                
                // muestro en el html
                mostrarAlumno.innerHTML += `
                <div class="info_alumno">
                <p>Nombre: <span>${nombre}</span></p>
                <p>Apellido: <span>${apellido}</span></p>
                <p>Nota 1: <span>${nota1}</span></p>
                <p>Nota 2: <span>${nota2}</span></p>
                <p>Nota 3: <span>${nota3}</span></p>
                <p>Promedio: <span>${promedio}</p>
                <div class="btns__info__alumnos">
                    <button class="btn-editar" onclick="alumnoForm('${nombre}', '${apellido}', '${idCurso}')"id="formAlumno"><i class="fa-solid fa-pen fa-2x"></i></button> 
                    <button class="btn-cancelar" onclick="borrarAlumno('${nombre}', '${apellido}', '${idCurso}')"id="borrarAlumno"><i class="fa-solid fa-circle-xmark fa-2x"></i></button>
                </div>
                </div>
                
                `
            
            }   
        }
        
    }

}

let muestraAprobados = document.getElementById('ordenaAprobados')
function mostrarAprobados(idCurso){
    // obtengo los cursos de LS
    let obtengoLocal = JSON.parse(localStorage.getItem('curso'))

    let mostrarAlumno = document.getElementById('tablaAlumnos')
    mostrarAlumno.innerHTML = ''

    for (let i = 0; i < obtengoLocal.length; i++){
        if(obtengoLocal[i].idCurso == idCurso){
            
            for(let x = 0; x < obtengoLocal[i].contenedor.length; x++){
                

                let {nombre, apellido, nota1, nota2, nota3, promedio} = obtengoLocal[i].contenedor[x]
                // let promedio = ((obtengoLocal[i].contenedor[x].nota1 + obtengoLocal[i].contenedor[x].nota2 + obtengoLocal[i].contenedor[x].nota3) / 3).toFixed(2)
                
                // muestro en el html
                if(promedio >= 7){
                    mostrarAlumno.innerHTML += `
                    <div class="info_alumno">
                    <p>Nombre: <span>${nombre}</span></p>
                    <p>Apellido: <span>${apellido}</span></p>
                    <p>Nota 1: <span>${nota1}</span></p>
                    <p>Nota 2: <span>${nota2}</span></p>
                    <p>Nota 3: <span>${nota3}</span></p>
                    <p>Promedio: <span>${promedio}</p>
                    <div class="btns__info__alumnos">
                        <button class="btn-editar" onclick="alumnoForm('${nombre}', '${apellido}', '${idCurso}')"id="formAlumno"><i class="fa-solid fa-pen fa-2x"></i></button> 
                        <button class="btn-cancelar" onclick="borrarAlumno('${nombre}', '${apellido}', '${idCurso}')"id="borrarAlumno"><i class="fa-solid fa-circle-xmark fa-2x"></i></button>
                    </div>
                    </div>
                    `
                }

            }   

        }
        
    }

}

let muestraDesaprobados = document.getElementById('ordenaDesaprobados')
function mostrarDesaprobados(idCurso){
    // obtengo los cursos de LS
    let obtengoLocal = JSON.parse(localStorage.getItem('curso'))

    let mostrarAlumno = document.getElementById('tablaAlumnos')
    mostrarAlumno.innerHTML = ''

    for (let i = 0; i < obtengoLocal.length; i++){
        if(obtengoLocal[i].idCurso == idCurso){
            
            for(let x = 0; x < obtengoLocal[i].contenedor.length; x++){
                

                let {nombre, apellido, nota1, nota2, nota3, promedio} = obtengoLocal[i].contenedor[x]
                // let promedio = ((obtengoLocal[i].contenedor[x].nota1 + obtengoLocal[i].contenedor[x].nota2 + obtengoLocal[i].contenedor[x].nota3) / 3).toFixed(2)
                
                // muestro en el html
                if(promedio < 7){
                    mostrarAlumno.innerHTML += `
                    <div class="info_alumno">
                    <p>Nombre: <span>${nombre}</span></p>
                    <p>Apellido: <span>${apellido}</span></p>
                    <p>Nota 1: <span>${nota1}</span></p>
                    <p>Nota 2: <span>${nota2}</span></p>
                    <p>Nota 3: <span>${nota3}</span></p>
                    <p>Promedio: <span>${promedio}</p>
                    <div class="btns__info__alumnos">
                        <button class="btn-editar" onclick="alumnoForm('${nombre}', '${apellido}', '${idCurso}')"id="formAlumno"><i class="fa-solid fa-pen fa-2x"></i></button> 
                        <button class="btn-cancelar" onclick="borrarAlumno('${nombre}', '${apellido}', '${idCurso}')"id="borrarAlumno"><i class="fa-solid fa-circle-xmark fa-2x"></i></button>
                    </div>
                    </div>
                    `
                }

            }   

        }
        
    }

}

let restablecer = document.getElementById('restablecer')
function restablecerFiltros(idCurso){
    mostrarAlumno(idCurso)
}

function profesores(){
    let fetchDatosProfesores = async () =>{

        let panel = document.getElementById('panel')
        panel.innerHTML = ''
    
        try {
            let res = await fetch('json/profesores.json')
            let data = await res.json()
            data.forEach((producto) => {
                panel.innerHTML += `
                <div class="profesores__content">
                    <p>Nombre: <span>${producto.nombre}</span></p>
                    <p>Apellido: <span>${producto.apellido}</span></p>
                    <p>Materia: <span>${producto.materia}</span></p>
                    <p>Sueldo: <span>$${producto.sueldo}</span></p>
                </div>
                `
            });
    
        } catch (error) {
            console.log(error)
        }
    }
    
    fetchDatosProfesores()
}

function materias(){
    let fetchDatosMaterias = async () =>{

        let panel = document.getElementById('panel')
        panel.innerHTML = ''
    
        try {
            let res = await fetch('json/materias.json')
            let data = await res.json()
            data.forEach((materias) => {
                panel.innerHTML += `
                <div class="materias__content">
                    <p>Materia: <span>${materias.materia}</span></p>
                    <p>Alumnos inscriptos: <span>${materias.AlumnosInscriptos}</span></p>
                    <p>Horarios: <span>${materias.horarios}</span></p>
                    <p>Dias: <span>${materias.dias}</span></p>
                </div>
                `
            });
    
        } catch (error) {
            console.log(error)
        }
    }
    
    fetchDatosMaterias()
}

mostrar()
