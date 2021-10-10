const app = require('./app');

try {
    app.listen(3001, () => {
      console.log("Serveur à l'écoute port 3001")
    })
  } catch (error) {
    console.error(error);
  }