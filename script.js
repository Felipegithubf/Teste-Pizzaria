const c = (e) => document.querySelector(e);
const cs = (el) => document.querySelectorAll(el);

pizzaJson.map((item, index) => {
   let PizzaItem = c('.models .pizza-item').cloneNode(true);
   // informações em pizzaitem
   PizzaItem.setAttribute('data-key', index);
   PizzaItem.querySelector('.pizza-item--img img').src = item.img;
   PizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
   PizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
   PizzaItem.querySelector('.pizza-item--price').innerHTML = 'R$ ' + item.price.toFixed(2);
   PizzaItem.querySelector('a').addEventListener('click', (e) => {
      e.preventDefault();
      let key = e.target.closest('.pizza-item').getAttribute('data-key');
      c('.pizzaBig img').src = pizzaJson[key].img;
      c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
      c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
      c('.pizzaWindowArea').style.opacity = 0;
      c('.pizzaWindowArea').style.display = 'flex';
      c ('.pizzaInfo--actualPrice').innerHTML = 'R$ '+ pizzaJson[key].price.toFixed(2);
      cs('.pizzaInfo--size').forEach((size, sizeIndex) => {
         
         
         
         size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
     });
      setTimeout(() => {
         c('.pizzaWindowArea').style.opacity = 1;
      }, 200);
   });
   c('.pizza-area').append(PizzaItem);
});