const c = (e)=> document.querySelector(e);
const cs = (el) => document.querySelectorAll(el);






pizzaJson.map((item, index) =>{

   let PizzaItem = c ('.models .pizza-item').cloneNode(true);
   // preencher as informações em pizzaitem
   PizzaItem.querySelector('.pizza-item--img img ').src = item.img;
   PizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
   PizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
   PizzaItem.querySelector('.pizza-item--price').innerHTML = 'R$ ' + item.price.toFixed(2);
   PizzaItem.querySelector('a').addEventListener('click', (e)=>{
      e.preventDefault();

   c ('.pizzaWindowArea').style.opacity = 0;
   c ('.pizzaWindowArea').style.display ='flex';
   setTimeout(()=>{
    c ('.pizzaWindowArea').style.opacity = 1;
   }, 200);

  

   });
   
   



  c ('.pizza-area').append(PizzaItem);

});
