const PROTO_PATH = __dirname + '/supermercado.proto';

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Suggested options for similarity to existing grpc.load behavior
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition).supermercado;

const client = new protoDescriptor.SupermercadoService("127.0.0.1:50051", grpc.credentials.createInsecure());

client.AdicionarProdutoNaLista({
        "codigo": 1,
        "descricao": "Queijo",
        "preco": 27.89
    }, (err, result) => {
        if (err) {
            console.log("Erro: " + err);
        } else {
            console.log("Produto cadastrado com sucesso!");
        }
    });

client.AdicionarProdutoNaLista({
        "codigo": 2,
        "descricao": "Manteiga",
        "preco": 4.7
    }, (err, result) => {
        if (err) {
            console.log("Erro: " + err);
        } else {
            console.log("Produto cadastrado com sucesso!");
        }
    });

client.ListarProdutos({}, (err, result) => {
    if (err) {
        console.log("Erro: " + err);
    } else {
        console.log("Produtos disponíveis:");

        const { produtos } = result;

        for (let i = 0; i < produtos.length; i++) {
            console.log(" --- Produto:");
            console.log(produtos[i]);
        }
    }
}); 

client.AdicionarAoCarrinho({ 
    "produto": {
        "codigo": 2,
        "descricao": "Manteiga",
        "preco": 4.7
    },
    "quantidade": 2
}, (err, result) => {
    if (err) {
        console.log("Erro: " + err);
    } else {
        console.log("Item adicionado ao carrinho com sucesso!");
    }
});

client.AdicionarAoCarrinho({ 
    "produto": {
        "codigo": 1,
        "descricao": "Queijo",
        "preco": 27.89
    },
    "quantidade": 1
}, (err, result) => {
    if (err) {
        console.log("Erro: " + err);
    } else {
        console.log("Item adicionado ao carrinho com sucesso!");
    }
});

client.ExibirCarrinho({}, (err, result) => {
    if (err) {
        console.log("Erro: " + err);
    } else {
        console.log("\nCARRINHO:");

        const { itens } = result;

        for (let i = 0; i < itens.length; i++) {
            console.log(" --- Item:");
            console.log(itens[i]);
        }
    }
}); 

client.RemoverDoCarrinho({
    "codigo": 2,
    "descricao": "Manteiga",
    "preco": 4.7
}, (err, result) => {
    if (err) {
        console.log("Erro: " + err);
    } else {
        console.log("Produto removido do carrinho com sucesso!");
    }
});

client.ExibirCarrinho({}, (err, result) => {
    if (err) {
        console.log("Erro: " + err);
    } else {
        console.log("\nCARRINHO:");

        const { itens } = result;

        for (let i = 0; i < itens.length; i++) {
            console.log(" --- Item:");
            console.log(itens[i]);
        }
    }
});

client.PagarCarrinho({}, (err, result) => {
    if (err) {
        console.log("Erro: " + err);
    } else {
        const { valorTotal } = result;
        console.log("Pagamento de R$ " + valorTotal.toFixed(2) + " efetuado com sucesso!");
    }
});


