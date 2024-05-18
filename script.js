// Array para armazenar os itens no carrinho de compras
let cart = [];
// Variáveis para controlar a chave e a quantidade da pizza selecionada
let pizzaKey = 0;
let pizzaQt = 1;

// Função para selecionar um único elemento no DOM
const c = (e) => document.querySelector(e);

// Função para selecionar todos os elementos correspondentes a um seletor no DOM
const cs = (el) => document.querySelectorAll(el);

// Itera sobre o array pizzaJson para exibir as pizzas na tela
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
        pizzaQt = 1;
        pizzaKey = key;

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
// Função para fechar o modal
function closeModal() {
    document.querySelector('.pizzaWindowArea').style.opacity = 0;
    setTimeout(() => {
        document.querySelector('.pizzaWindowArea').style.display = 'none';
    }, 500);
}

// Adiciona eventos de clique para os botões de cancelar
cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal);
});

// Eventos para aumentar e diminuir a quantidade de pizzas
c('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if (pizzaQt > 1) {
        pizzaQt--;
        c('.pizzaInfo--qt').innerHTML = pizzaQt;
    }
});

c('.pizzaInfo--qtmais').addEventListener('click', () => {
    pizzaQt++;
    c('.pizzaInfo--qt').innerHTML = pizzaQt;
});

// Adiciona eventos de clique para os tamanhos de pizza
cs('.pizzaInfo--size').forEach((size, sizeIndex) => {
    size.addEventListener('click', (e)=>{
        c('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});

// Evento de clique para adicionar pizzas ao carrinho
c('.pizzaInfo--addButton').addEventListener('click', () => {
    let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));
    
    let indentifier = pizzaJson[pizzaKey].id + '@' + size;

    let key = cart.findIndex((item) => item.indentifier == indentifier);

    if (key > -1) {
        cart[key].qt += pizzaQt;
    } else {
        cart.push({
            indentifier,
            id: pizzaJson[pizzaKey].id,
            size,
            qt: pizzaQt
        });
    }

    updateCart();
    closeModal(); 
});

// Eventos para abrir e fechar o carrinho
c('.menu-openner').addEventListener('click', () => {
   if(cart.length > 0){
     c('aside').style.left = '0';
   }
});

c('.menu-closer').addEventListener('click' , () =>{
   c('aside').style.left = '100vw';
});

// Função para atualizar o carrinho
function updateCart(){
    
  c('.menu-openner span').innerHTML = cart.length;

    if(cart.length > 0 ){
        c('aside').classList.add('show');
        c('.cart').innerHTML = '';
       
       let subtotal = 0;
       let desconto = 0; 
       let total = 0;     
       
        cart.forEach((item, index) => {
            let pizzaItem = pizzaJson.find((pizza) => pizza.id == item.id);

            subtotal += pizzaItem.price * item.qt;

            let cartItem = c('.models .cart--item').cloneNode(true);
            let pizzaSizeName;
            switch(item.size) {
                case 0:
                    pizzaSizeName = 'P';
                    break;
                case 1:
                    pizzaSizeName = 'M';
                    break;
                case 2:
                    pizzaSizeName = 'G';
                    break;
            }
            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;
            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = item.qt;
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                if (item.qt > 1) {
                    item.qt--;
                } else {
                    cart.splice(index, 1);
                }
                updateCart();
            });

            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                item.qt++;
                updateCart();
            });

            c('.cart').append(cartItem);
        });

        desconto = subtotal * 0.1;
        total = subtotal - desconto;

        c('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;

    } else {
        c('aside').classList.remove('show');
        c ('aside').style.left = '100vw';
          
        
    }
}

// Evento para fechar o carrinho ao clicar fora dele
document.addEventListener('click', (cartItem) => {
    cartItem
    const cartArea = document.querySelector('.cart');
    const aside = document.querySelector('aside');


});
