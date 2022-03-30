//? CONSTANTS
const card = document.querySelectorAll(".cardCustom");
const recetas = document.querySelector("#recetas");
const termino = document.querySelector("#termino");
const contenedor = document.querySelector("#contenedor");

//? EVENT LISTENERS

termino.addEventListener("search", validarFormulario);
//? FUNCTIONS

document.addEventListener("DOMContentLoaded", function () {
  const year = document.querySelector("#year");

  function date() {
    year.innerHTML = new Date().getFullYear();
  }

  date();
});

function validarFormulario(e) {
  const termino = document.querySelector("#termino").value;

  e.preventDefault();

  // remove previous recipes
  while (recetas.firstChild) {
    recetas.removeChild(recetas.firstChild);
  }

  // validar que el input con el ID termino no esté vacío
  if (termino === "") {
    mostrarAlerta("Agrega un termino de busqueda");
    return;
  }

  buscarRecetas();
}

function mostrarAlerta(mensaje) {
  const existeAlerta = document.querySelector(".bg-danger");

  if (!existeAlerta) {
    const alerta = document.createElement("p");

    alerta.classList.add(
      "bg-danger",
      "border",
      "border-danger",
      "text-white",
      "px-4",
      "py-3",

      "max-w-lg",
      "mx-auto",
      "mt-6",
      "text-center"
    );

    alerta.innerHTML = `
    
    <strong class='font-bold'>ERROR!</strong>
    <span class='block sm:inline'>${mensaje}</span>
  `;

    contenedor.appendChild(alerta);

    setTimeout(() => {
      alerta.remove();
    }, 5000);
  }
}

function buscarRecetas() {
  const termino = document.querySelector("#termino").value;

  const appId = "79b407f4";
  const appKey = "a9c0f7e2bb4e3945f629fb614645a535";

  const url = `https://api.edamam.com/search?q=${termino}&app_id=${appId}&app_key=${appKey}&imageSize=REGULAR`;

  fetch(url)
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((resultado) => {
      if (resultado.hits.length === 0) {
        mostrarAlerta("No se encontraron resultados");
      } else {
        imprimirRecetas(resultado.hits);
      }

      // reset input
      document.querySelector("#termino").value = "";
    })
    .catch((error) => {
      console.log(error);
    });
}

function imprimirRecetas(recipes) {
  // remove previous recipes
  while (recetas.firstChild) {
    recetas.removeChild(recetas.firstChild);
  }
  recipes.forEach((receta) => {
    const { label, image, url } = receta.recipe;

    const card = document.createElement("div");
    card.classList.add(
      "align-self-center",
      "col-lg-3",
      "col-md-6",
      "col-sm-12"
    );

    card.innerHTML = `
      
      <div class="card  text-center cardCustom hover-shadow bg-image hover-zoom ">
        <img
          src=${image}
          class="card-img-top"
          alt="Sunset Over the Sea"
        />
        <div class="card-body">
          <p class="card-text">
           ${label}
          </p>
          <a href=${url} target="_blank" ><button type="button" class="btn btn-success btn-rounded">Ver Receta</button></a>
          
  
        </div>
      </div>
    
      `;

    recetas.appendChild(card);
  });
}
