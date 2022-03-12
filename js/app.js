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

// contador para el id de los cursos
let idCurso = 0;

let agregarCurso = document.getElementById('create')
agregarCurso.addEventListener('click', crear)

function crear(){
    
    // obtengo los datos del form
    let anio = document.getElementById('anio').value
    let cantidadAlumnos = document.getElementById('cantidad').value
    let curso = document.getElementById('curso').value

    // objeto constructor
    class Curso {
        constructor(idCurso, anio, cantidadAlumnos, curso) {
            this.idCurso = idCurso
            this.anio = anio
            this.cantidadAlumnos = cantidadAlumnos
            this.curso = curso
        }
    }

    // creo un nuevo curso 
    let agregoCurso = new Curso(idCurso++, anio, cantidadAlumnos, curso)

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

        // agrego al HTML
        contenedorCursos.innerHTML += `
            
            <div class="contenidoCursos">
                <h2>${anio}°${curso}</h2>
                <p>Cantidad de alumnos: ${cantidad}</p>
                <button onclick="borrar('${anio}')">Eliminar</button>
            </div>
        `
        
    }
}

mostrar()

// paso el parametro a comparar
function borrar(anio){
    // obtengo los datos de localstorage
    let obtengoLocal = JSON.parse(localStorage.getItem('curso'));
    // itero sobre los objetos en la propiedad anio y lo comparo
    for (let i = 0; i < obtengoLocal.length; i++) {
        if (obtengoLocal[i].anio == anio) {
           obtengoLocal.splice(i, 1);
        }
    }
    console.log(anio)

    // guardo los resultados actualizados a localstorage
    localStorage.setItem('curso', JSON.stringify(obtengoLocal));
    mostrar()
}


