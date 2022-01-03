# Microprojeto 03 - Sistemas Distribuídos 2021.2

***Emanuelle da Luz Lemos***


### **Descrição:**

Implementação de um serviço de supermercado delivery com ***gRPC*** para fins de comunicação entre um cliente e o servidor.


### **Funcionalidades obrigatórias:**

* Listar os produtos disponíveis (ListarProdutos):
    - listar o código, a descrição e o preço os produtos cadastrados no arquivo 'db.json'.
* Adicionar produto ao carrinho (AdicionarAoCarrinho):
    - adicionar o código e a quantidade de itens do produto.
* Remover produto do carrinho (RemoverDoCarrinho):
    - remover com base no código do produto.
* Pagar o pedido (PagarCarrinho):
    - insere o código, o valor total do pedido e os itens/produtos em uma lista para posterior solicitação de entrega;
    - seta o status de entrega como ***false***;
    - remove os produtos do carrinho;
    - fornece o total pago.
* Solicitar entrega (SolicitarEntrega):
    - solicitar a entrega de pedido existente na lista de pedidos.


### **Funcionalidades extras:**

* Adicionar produtos (AdicionarProdutosNaLista).
    - adicionar produtos na lista de modo que os mesmos estarão disponíveis para serem adicionados ao carrinho de compras.
* Listar os produtos adicionados ao carrinho (ExibirCarrinho):
    - listar o código, a descrição, a quantidade e o preço dos produtos do carrinho;
    - apresentar o preço total dos produtos do carrinho.
* Listar os pedidos realizados (ListarPedidos):
    - listar o código do pedido, o preço total, a quantidade de produtos e o status de entrega dos pedidos efetuados.


***Observação***: Os testes são melhores visualizados com o auxílio do BloomRCP.
