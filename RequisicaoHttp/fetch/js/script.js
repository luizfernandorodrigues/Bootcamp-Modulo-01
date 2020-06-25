window.addEventListener('load', () => {
  const luizFernando = fetch(
    'https://api.github.com/users/luizfernandorodrigues'
  )
    .then((res) => {
      res.json().then((data) => {
        mostraDados(data);
      });
    })
    .catch((erro) => {
      console.log(erro);
    });
});

const mostraDados = function showData(data) {
  console.log(data);
};
