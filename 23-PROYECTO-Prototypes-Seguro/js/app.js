//constructores

function Seguro(marca, year, tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

Seguro.prototype.cotizarSeguro = function () {

    // 1 = Amaericano 1.15
    // 2 = Asatico 1.05
    // 3 = Europeo 1.35


   let cantidad;
   const base = 2000;

   switch(this.marca){
       case '1':
           cantidad = base * 1.15;
           break;
       case '2':
           cantidad = base * 1.05;
           break;
        case '3':
            cantidad = base * 1.35;
            break;
        default:
            break; 
   }

   //Leer el año
   const diferencia = new Date().getFullYear() - this.year;

   //Baja el precio en 3% por cada año de antiguedad
   cantidad -= ((diferencia * 3) * cantidad) / 100;

   //si el seguro es basico se multiplica por 30%, si es completo se multiplica por 50%
   if(this.tipo === 'basico'){
       cantidad *= 1.30;
   }else{
       cantidad *= 1.50;
   }

   return cantidad;

   console.log(cantidad);

}

function UI(){}

//Llenar opciones de los años

UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear(),
          min = max - 20;

    const selectYear = document.querySelector('#year');

    for(let i = max; i > min; i-- ){
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}

UI.prototype.mostrarMensajes = (mensaje, tipo) => {

        const div = document.createElement('div');

        if(tipo === 'error'){
            div.classList.add('error');
        }else {
            div.classList.add('correcto');
        }

        div.classList.add('mensaje', 'mt-10');
        div.textContent = mensaje;

        //inertar el HTML
        const formulario = document.querySelector('#cotizar-seguro');
        formulario.insertBefore(div, document.querySelector('#resultado'));

        setTimeout(() => {
            div.remove();
        }, 3000);
}

UI.prototype.mostrarResultado = (total, seguro) =>{

    const {marca, year, tipo} = seguro;

    let textoMarca;

    switch(marca) {
        case '1':
            textoMarca ='Americano';
            break;
        case '2':
            textoMarca ='Asiatico';
            break;
        case '3':
            textoMarca ='Europeo';
            break;
        

        default:
            break;
    }

    const div = document.createElement('div');
    div.classList.add('mt-10');

    div.innerHTML = `
    <p class='header'>Tu Resumen</p>
    <p class='font-bold'>Total: <spam class='font-normal'>$ ${total}</spam></p>
    <p class='font-bold'>Marca: <spam class='font-normal'> ${textoMarca}</spam></p>
    <p class='font-bold'>Año: <spam class='font-normal'> ${year}</spam></p>
    <p class='font-bold'>Tipo: <spam class='font-normal capitalize'> ${tipo}</spam></p>


    `;
    const resultadoDiv = document.querySelector('#resultado');
    

    //mostrar spiner
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';

    setTimeout(() => {
        spinner.style.display = 'none';
        resultadoDiv.appendChild(div);
    }, 3000);

}

// instanciar UI (User Interface)
const ui = new UI();


document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones();

});

eventListener();
    function eventListener() {
        const formulario = document.querySelector('#cotizar-seguro');
        formulario.addEventListener('submit', cotizarSeguro);
    }

function cotizarSeguro(e) {
    e.preventDefault();

    //leer la marca
    const marca = document.querySelector('#marca').value;

    //leer el año
    const year = document.querySelector('#year').value;

    //leer la cobertura
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    
    if(marca === '' || year === '' || tipo === ''){
        ui.mostrarMensajes('Faltan campos por seleccionar', 'error');
    } else {
        ui.mostrarMensajes('Cotizando Seguro', 'correcto')
    }

    const resultados = document.querySelector('#resultado div')
    if(resultados != null){
        resultados.remove();
    }

    //instanciar Seguro
    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();


    ui.mostrarResultado(total, seguro);

}