// Inicializa a quantidade de pizzas como 1
let pizzaQt = 1;

// Função para selecionar um único elemento no DOM
const c = (e) => document.querySelector(e);

// Função para selecionar todos os elementos correspondentes a um seletor no DOM
const cs = (el) => document.querySelectorAll(el);

// Itera sobre o array pizzaJson
pizzaJson.map((item, index) => {
   // Clona o modelo de item de pizza do DOM
   let pizzaItem = c('.models .pizza-item').cloneNode(true);
   
   // Configura um atributo data-key para identificar cada pizza
   pizzaItem.setAttribute('data-key', index);
   
   // Atualiza a imagem, nome, descrição e preço da pizza no item clonado
   pizzaItem.querySelector('.pizza-item--img img').src = item.img;
   pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
   pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
   pizzaItem.querySelector('.pizza-item--price').innerHTML = 'R$ ' + item.price.toFixed(2);
   
   // Adiciona um ouvinte de eventos de clique para cada item de pizza
   pizzaItem.querySelector('a').addEventListener('click', (e) => {
      e.preventDefault();
      
      // Obtém a chave da pizza clicada
      let key = e.target.closest('.pizza-item').getAttribute('data-key');
      
      // Reseta a quantidade de pizzas para 1
      pizzaQt = 1;
      
      // Atualiza a imagem, nome, descrição e preço da pizza na área de informações
      c('.pizzaBig img').src = pizzaJson[key].img;
      c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
      c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
      c('.pizzaWindowArea').style.opacity = 0;
      c('.pizzaWindowArea').style.display = 'flex';
      c('.pizzaInfo--actualPrice').innerHTML = 'R$ ' + pizzaJson[key].price.toFixed(2);
      c('.pizzaInfo--size.selected').classList.remove('selected');
      
      // Atualiza os tamanhos disponíveis da pizza na área de informações
      cs('.pizzaInfo--size').forEach((size, sizeIndex) => {
         if (sizeIndex == 2) {
            size.classList.add('selected');
         }
         size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
      });
      
      // Atualiza a quantidade de pizzas na área de informações
      c('.pizzaInfo--qt').innerHTML = pizzaQt;
      
      // Define a opacidade da área da janela da pizza como 1 após um atraso
      setTimeout(() => {
         c('.pizzaWindowArea').style.opacity = 1;
      }, 200);
   });
   
   // Adiciona o item de pizza clonado à área de pizzas
   c('.pizza-area').append(pizzaItem);
});

// Eventos do Modal
function closeModal() {
   document.querySelector('.pizzaWindowArea').style.opacity = 0;
   setTimeout(() => {
         document.querySelector('.pizzaWindowArea').style.display = 'none';
   }, 500);
}

cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
   item.addEventListener('click', closeModal);
});