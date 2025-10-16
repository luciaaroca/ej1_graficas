

//GRÁFICA 1 (lineas) -> Pedir peliculas: nombre pelicula (x) +  año pelicula(y)

//1) Función 1: extraer datos
async function getData1(){ 
    try{
    const response = await fetch ("https://swapi.info/api/films"); //cogemos los datos de la api

    if (!response.ok) { //si la respuesta no es ok pasa esto (es general)
      if (response.status === 404) {
        throw new Error("Recurso no encontrado (404)");
      } else if (response.status === 500) {
        throw new Error("Error en el servidor (500)");
      } else {
        throw new Error(`Error HTTP: ${response.status}`);
      }
    }
    const data = await response.json(); //los convertivos a objeto
    console.log(data);//inspeccionar la estructura

    paintGraph1(data); //llamar a la función que pinta la grafuica

    }catch (error){ //errores
     if (error.message.includes("404")) {
      console.error("Error: No se encontró el recurso solicitado.");
    } else if (error.message.includes("500")) {
      console.error("Error: Problemas con el servidor.");
    } else {
      console.error("Hubo un problema:", error.message);
    }
    }
}; //cerramos función

//1) Función 2: representar los datos en la tabla (pintar la tabla)

function paintGraph1 (dataset){ //dataset: obejto de cada array
    const peliNombre =[]; //array vacío con el nombre
    const peliYear= []; //array vacío con el año
    dataset.forEach((peli)=>{ //para cada objeto(peli) - añadimos al array
        peliNombre.push(peli.title);
        peliYear.push(Number(peli.release_date.slice(0, 4))); //slice para que solo coja las 4  1º cifras (ademas nomber convierte string a número)
    })
  
    var data = {
    labels: peliNombre, //eje x
    series: [peliYear] //eje y 
};

    var options = { //altura y anchura (el siguiente tiene más, lo coges directamente de la web y puedes cambiarlo)
    width: 600,
    height: 400
 };

 new Chartist.Line('.ct-chart', data, options); //aqui creas la gráfica en el div (con su clase) que tienes en el html con ese data y esas opciones
};

getData1(); //dispara todo el procesp


////////////////////////////////////////




//GRÁFICA 2 (barras) -> Pedir personaje (20): nombre personaje (x) +  nº peliculas (y)

//2) Función 1: extraer datos
async function getData2 (){
   try{
      const response = await fetch ("https://swapi.info/api/people")
      
      if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Recurso no encontrado (404)");
      } else if (response.status === 500) {
        throw new Error("Error en el servidor (500)");
      } else {
        throw new Error(`Error HTTP: ${response.status}`);
      }
    }

    const data = await response.json();
    console.log(data);
    
    const primeros20 = data.slice(0, 20);//aqui estamos coguiendo los 20 primeros personajes 
    paintGraph2(primeros20); // en vez de data, le pasamos los primeros 20 que es lo que nos interesa

   }catch(error){
      if (error.message.includes("404")) {
      console.error("Error: No se encontró el recurso solicitado.");
    } else if (error.message.includes("500")) {
      console.error("Error: Problemas con el servidor.");
    } else {
      console.error("Hubo un problema:", error.message);
    }
   }
};


//2) Función 2: representar los datos en la tabla (pintar la tabla)
function paintGraph2(dataset){
    const personajeName = [];
    const personajePelis =[];

    dataset.forEach((persona)=>{
        personajeName.push(persona.name);
        personajePelis.push(persona.films.length)
    });

            var data = {
        labels: personajeName, //x
            series: [personajePelis]
        };

        var options = {
        seriesBarDistance: 15
        };

        var responsiveOptions = [
        ['screen and (min-width: 641px) and (max-width: 1024px)', {
            seriesBarDistance: 10,
            axisX: {
            labelInterpolationFnc: function (value) {
                return value;
            }
            }
        }],
        ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
            labelInterpolationFnc: function (value) {
                return value[0];
            }
            }
        }]
        ];

        new Chartist.Bar('.graf2', data, options, responsiveOptions);


}
getData2();