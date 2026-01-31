// ===== Clase Tarea =====
class Tarea {
    constructor(nombre, completa = false) {
        this.nombre = nombre;
        this.completa = completa;
    }

    toggleEstado() {
        this.completa = !this.completa;
    }

    editar(nuevoNombre) {
        this.nombre = nuevoNombre;
    }
}

// ===== Clase GestorDeTareas =====
class GestorDeTareas {
    constructor() {
        this.tareas = JSON.parse(localStorage.getItem("tareas")) || [];
        this.lista = document.getElementById("lista-tareas");
        this.render();
    }

    agregarTarea(nombre) {
        const tarea = new Tarea(nombre);
        this.tareas.push(tarea);
        this.guardar();
        this.render();
    }

    eliminarTarea(index) {
        this.tareas.splice(index, 1);
        this.guardar();
        this.render();
    }

    editarTarea(index) {
        const nuevoNombre = prompt("Editar tarea:", this.tareas[index].nombre);
        if (nuevoNombre) {
            this.tareas[index].editar(nuevoNombre);
            this.guardar();
            this.render();
        }
    }

    completarTarea(index) {
        this.tareas[index].toggleEstado();
        this.guardar();
        this.render();
    }

    guardar() {
        localStorage.setItem("tareas", JSON.stringify(this.tareas));
    }

    render() {
        this.lista.innerHTML = "";

        this.tareas.forEach((tarea, index) => {
            const li = document.createElement("li");

            li.innerHTML = `
                <span class="${tarea.completa ? 'completa' : ''}">
                    ${tarea.nombre}
                </span>
                <div>
                    <button onclick="gestor.completarTarea(${index})">✔</button>
                    <button onclick="gestor.editarTarea(${index})">✏️</button>
                    <button onclick="gestor.eliminarTarea(${index})">🗑</button>
                </div>
            `;

            this.lista.appendChild(li);
        });
    }
}

// ===== DOM =====
const gestor = new GestorDeTareas();
const input = document.getElementById("nueva-tarea");
const boton = document.getElementById("agregar-tarea");
const mensajeError = document.getElementById("mensaje-error");

boton.addEventListener("click", () => {
    const texto = input.value.trim();

    if (texto === "") {
        mensajeError.textContent = "No puedes agregar una tarea vacía";
        return;
    }

    mensajeError.textContent = "";
    gestor.agregarTarea(texto);
    input.value = "";
});
