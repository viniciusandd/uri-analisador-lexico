var alfabeto = [];
var estados = [[]];
$('#token').keypress(function (e) 
{
    if (e.which == 13) 
    {
        let elemento = $(this);
        let tokens = elemento.val().split(' ');
        elemento.val('');
        
        criar_alfabeto(tokens);
        identificar_estados_do_automato();
        desenhar_tabela();
     }
});

function criar_alfabeto(tokens) {
    $.each(tokens, function (index, token) 
    {
        alfabeto.push(token);
        $('#alfabeto').append(
            '<span class="badge badge-pill badge-primary palavras">'+token+'</span>'
        );
    });    
}

function identificar_estados_do_automato()
{
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
    console.log(estados);
}

function desenhar_tabela(letra_atual=null) {
    var conteudo = '';
    conteudo += '<thead><tr>';
    conteudo += '<td>-</td>';
    var i = 'a'.charCodeAt(0); j = 'z'.charCodeAt(0);
    for (; i <= j; ++i) 
    {            
        var letra = String.fromCharCode(i);
        conteudo += '<th>' +letra+ '</th>';   
    }        
    conteudo += '</tr></thead>';
    for (let h = 0; h < estados.length; h++) 
    {
        var eh_inicial = h == 0 ? '->' : '';
        var eh_final = estados[h]['final'] !== 'undefined' && estados[h]['final'] == true ? '*' : '';

        conteudo += '<tr>';
        const linha = estados[h];
        console.log(linha);
        var i = 'a'.charCodeAt(0); j = 'z'.charCodeAt(0);
        conteudo += '<td>'+eh_final+eh_inicial+'<strong>q'+h+'</strong></td>';
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

$('#palavra').keyup(function (e) 
{
    // Essa parada aqui tem que ser uma máquina de estados
    var letra = $(this).val()[$(this).val().length-1];
    console.log(letra);
    desenhar_tabela(letra.toLowerCase());
});