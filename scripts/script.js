var alfabeto = [];

$('#token').keypress(function (e) {
    if (e.which == 13) {
        let elemento = $(this);
        let palavras = elemento.val().split(' ');
        $.each(palavras, function (indexInArray, valueOfElement) {
            alfabeto.push(valueOfElement);
        });
        elemento.val('');

        // Criando um array de estados
        var estados = [];
        for (var i=0; i<alfabeto.length; i++) {
            var palavra = alfabeto[i];
            for (var h=0; h<palavra.length; h++) {
                if (i == 0) {
                    estados.push(h);
                } else {
                    if (h == 0) {
                        estados.push(h)
                    } else {
                        var ultima_posicao = estados[estados.length-1];
                        if (ultima_posicao == 0) {
                            ultima_posicao = estados[estados.length-2];
                        }
                        estados.push(ultima_posicao + 1);
                    }
                }
            }
            estados.push(estados[estados.length-1] + 1);
        }

        // Criando a gramatica
        var gramatica = [];
        for (var i=0; i<alfabeto.length; i++) {
            var palavra = alfabeto[i];
            for (var h=0; h<palavra.length; h++) {
                gramatica.push(palavra[h]);
            }
            gramatica.push('&');
        }
        console.log(gramatica);        

        // Criando o automato
        var automato = [];
        for (var i = 0; i<gramatica.length; i++) {
            var letra = gramatica[i];            
            if (typeof automato[letra] == 'undefined') {
                automato[letra] = [];
            }
            automato[letra][estados[i]] = estados[i+1]
        }
        console.log(automato);
    }
});

function gerar_letras() {
    var i = 'a'.charCodeAt(0), j = 'z'.charCodeAt(0);
    for (; i <= j; ++i) {
        var letra = String.fromCharCode(i);
    }    
}