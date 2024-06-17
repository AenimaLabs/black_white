// const express = require('express');
// const jimp = require('jimp');
// const uuid = require('uuid');
// const app = express();
// const port = 3000;

// app.use(express.json());

// // Define la ruta raíz del servidor
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

// // Define la ruta para procesar la imagen
// app.post('/process', (req, res) => {
//   const url = req.body.url; // Obtén la URL de la imagen del formulario

//   // Genera un identificador único para la imagen
//   const id = uuid.v4();

//   // Descarga la imagen desde la URL
//   jimp.read(url)
//     .then(image => {
//       // Convierte la imagen a escala de grises y redimensionala
//       image.grayscale()
//         .resize(350, jimp.AUTO)
//         .write(`images/${id}.jpg`, () => {
//           // Envía la imagen procesada al cliente
//           res.sendFile(__dirname + `/images/${id}.jpg`);
//         });
//     })
//     .catch(err => {
//       console.error(err);
//       res.status(500).send('Error al procesar la imagen');
//     });
// });

// // Inicia el servidor
// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });
const express = require('express');
const jimp = require('jimp');
const uuid = require('uuid');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Define the root route of the server
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Define the route for processing the image
app.post('/process', (req, res) => {
  const url = req.body.url; // Get the image URL from the form

  // Genera un identificador único para la imagen
  const id = uuid.v4();

  // Descarga la imagen desde la URL
  jimp.read(url)
    .then(image => {
      // Convierte la imagen a escala de grises y redimensionala
      image.grayscale()
        .resize(350, jimp.AUTO)
        .write(`images/${id}.jpg`, () => {
          // Envía la imagen procesada al cliente
          res.sendFile(__dirname + `/images/${id}.jpg`);
        });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error al procesar la imagen');
    });
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});