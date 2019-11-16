var alfabeto = [];
var estados = [[]];
$('#token').keypress(function (e) 
{
    if (e.which == 13) 
    {
        let elemento = $(this);
        let palavras = elemento.val().split(' ');
        $.each(palavras, function (index, token) 
        {
            alfabeto.push(token);
        });
        elemento.val('');

        // Criando os estados        
        var estado = 0;
        for(var i=0; i<alfabeto.length; i++) 
        {
            let estado_atual = 0;
            let palavra = alfabeto[i];
            for(var j=0; j<palavra.length; j++) 
            {
                var letra = palavra[j];
                if(typeof estados[estado_atual][letra] === 'undefined') 
                {
                    let proximo_estado = estado + 1;
                    estados[estado_atual][letra] = proximo_estado;
                    estados[proximo_estado] = [];
                    estado = estado_atual = proximo_estado;
                } 
                else 
                {
                    estado_atual = estados[estado_atual][letra];
                }
    
                if(j == palavra.length - 1) 
                {
                    estados[estado_atual]['final'] = true;
                }
            }
        }

        console.log(estados.length);

        // Montando a tabela
        var conteudo = '';
        conteudo += '<thead><tr>';
        var i = 'a'.charCodeAt(0); j = 'z'.charCodeAt(0);
        for (; i <= j; ++i) 
        {            
            var letra = String.fromCharCode(i);
            conteudo += '<th>' +letra+ '</th>';   
        }        
        conteudo += '</tr></thead>';
        for (let h = 0; h < estados.length; h++) {
            conteudo += '<tr>';
            const linha = estados[h];
            var i = 'a'.charCodeAt(0); j = 'z'.charCodeAt(0);
            conteudo += '<td>q'+h+'</td>';
            for (; i <= j; ++i)
            {
                var letra = String.fromCharCode(i);
                if(typeof estados[h][letra] !== 'undefined') {
                    conteudo += '<td>q'+ estados[h][letra] +'</td>';
                } else {
                    conteudo += '<td>-</td>';
                }
            }
            conteudo += '</tr>';
        }
        $('#tabela').html(conteudo);
     }
});

function gerar_letras() 
{
    var i = 'a'.charCodeAt(0); j = 'z'.charCodeAt(0);
    for (; i <= j; ++i) 
    {
        var letra = String.fromCharCode(i);
    }
}