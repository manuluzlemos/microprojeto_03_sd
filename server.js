const PROTO_PATH = __dirname + '/supermercado.proto';

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Suggested options for similarity to existing grpc.load behavior
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition).supermercado;

// The protoDescriptor object has the full package hierarchy
const supermercadoService = protoDescriptor.SupermercadoService;

const server = new grpc.Server();

const bd = {
    produtos: [],
    carrinho: [],
    pedidos: []
};

// implementação do serviço
server.addService(supermercadoService.service, {
    AdicionarProdutoNaLista: (call, callback) => {
        const produto = call.request;
        bd.produtos.push(produto);

        callback(null, {});
    },

    ListarProdutos: (call, callback) => {
        callback(null, { produtos: bd.produtos });
    },

    ExibirCarrinho: (call, callback) => {
        callback(null, { itens: bd.carrinho });
    },

    AdicionarAoCarrinho: (call, callback) => {
        const item = call.request;
        bd.carrinho.push(item);

        callback(null, {});
    },

    RemoverDoCarrinho: (call, callback) => {
        const produto = call.request;
        for(let i = 0; i < bd.carrinho.length; i++){
            item = bd.carrinho[i];
            if(item.produto.codigo == produto.codigo){
                bd.carrinho.splice(i, 1);
                i--;
            }
        }

        callback(null, {});
    },

    PagarCarrinho: (call, callback) => {
        let valorTotal = 0;
        for(let i = 0; i < bd.carrinho.length; i++){
            item = bd.carrinho[i];
            valorTotal += parseFloat(item.produto.preco) * parseFloat(item.quantidade);
        }

        bd.pedidos.push({
            "codigo" : (bd.pedidos.length + 1),
            "valor" : valorTotal,
            "itens" : bd.carrinho,
            "status" : false
        });

        bd.carrinho = [];

        callback(null, { valorTotal : valorTotal });
    },

    ListarPedidos: (call, callback) => {
        callback(null, { pedidos: bd.pedidos });
    },

    SolicitarEntrega: (call, callback) => {
        const pedido = call.request;
        const codigo = pedido.codigo;
        const valorTotal = pedido.valor;
        for(let i = 0; i < bd.pedidos.length; i++){
            if(bd.pedidos[i].codigo === codigo){
                bd.pedidos[i].status = true;
            }
        }
        callback(null, { valorTotal });
    },
});

server.bindAsync("0.0.0.0:50051", grpc.ServerCredentials.createInsecure(), (error, port) => {
    console.log("Servidor gRPC rodando!");
    server.start();
});