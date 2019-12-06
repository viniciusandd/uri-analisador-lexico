var g_alfabeto = [];
var g_estados = [[]];

$(document).ready(function () {
    $('#token').val('');
    $('#palavra').val('');
});

$('#token').keypress(function (e) 
{
    if (e.which == 13) 
    {
        let elemento = $(this);
        let tokens = elemento.val().split(' ');
        elemento.val('');
        
        criar_alfabeto(tokens);
        g_estados = [[]];
        identificar_estados_do_automato();
        desenhar_tabela();
     }
});

function criar_alfabeto(tokens) 
{
    $.each(tokens, function (index, token) 
    {
        g_alfabeto.push(token);
        $('#alfabeto').append(
            '<span class="badge badge-pill badge-primary palavras">'+token+'</span>'
        );
    });    
}

function identificar_estados_do_automato()
{    
    var estado = 0;
    for(var i=0; i<g_alfabeto.length; i++) 
    {
        let estado_atual = 0;
        let palavra = g_alfabeto[i];
        for(var j=0; j<palavra.length; j++) 
        {
            var letra = palavra[j];
            if(typeof g_estados[estado_atual][letra] === 'undefined') 
            {
                let proximo_estado = estado + 1;
                g_estados[estado_atual][letra] = proximo_estado;
                g_estados[proximo_estado] = [];
                estado = estado_atual = proximo_estado;
            } 
            else 
            {
                estado_atual = g_estados[estado_atual][letra];
            }

            if(j == palavra.length - 1) 
            {
                g_estados[estado_atual]['final'] = true;
            }
        }
    }    
}

function desenhar_tabela(estado_atual=null, letra_atual=null) {
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
    for (let h = 0; h < g_estados.length; h++) 
    {
        var eh_inicial = h == 0 ? '->' : '';
        var eh_final = typeof g_estados[h]['final'] !== 'undefined' ? '*' : '';

        conteudo += '<tr>';
        const linha = g_estados[h];
        var i = 'a'.charCodeAt(0); j = 'z'.charCodeAt(0);
        conteudo += '<td>'+eh_final+eh_inicial+'<strong>q'+h+'</strong></td>';
        for (; i <= j; ++i)
        {
            var letra = String.fromCharCode(i);
            
            var classe = 'nao-destacar';
            if (h == estado_atual && letra == letra_atual)
                classe = 'destacar';

            if(typeof g_estados[h][letra] !== 'undefined') {
                conteudo += '<td class="'+classe+'">q'+ g_estados[h][letra] +'</td>';
            } else {
                conteudo += '<td>-</td>';
            }
        }
        conteudo += '</tr>';
    }
    $('#tabela').html(conteudo);
}

var g_proximo_estado = 0;
var g_estados_percorridos = [];
var g_tamanho = 0;
function maquina_de_estados(elemento, backspace=false)
{
    var palavra = elemento.value;
    console.log(palavra);

    if (palavra.indexOf(' ') > -1) {
        console.log('Cancelou o evento space...');
        return;
    }    

    if ((!backspace && palavra.length < g_tamanho)) 
    {
        console.log('Cancelou o evento backspace...');
        g_tamanho = palavra.length;
        return;
    }

    g_tamanho = palavra.length;
    var letra = palavra[palavra.length-1];

    if (backspace)
    {
        if (g_estados_percorridos.length > 0)
        {
            g_proximo_estado = g_estados_percorridos[g_estados_percorridos.length-1];
            g_estados_percorridos.pop();
        }
        else
        {
            g_proximo_estado = 0;
        }
    }
    else
    {
        g_estados_percorridos.push(g_proximo_estado);        
        try {
            g_proximo_estado = g_estados[g_proximo_estado][letra];
        } catch (error) {
            g_proximo_estado = g_proximo_estado;
        }
    }

    var estado_atual = g_estados_percorridos[g_estados_percorridos.length-1];
    var eh_final = false;
    try {
        eh_final = g_estados[g_proximo_estado]["final"];
    } catch (error) {
        eh_final = false;
    }

    desenhar_tabela(estado_atual, letra);
    mostrar_validade_do_token(eh_final);
}

document.getElementById('palavra').onkeyup = function(e) 
{    
    var key = event.keyCode || event.charCode;
    if (key === 8)
        maquina_de_estados(event.target, backspace=true);
    if (key === 32)
    {
        if (g_estados[g_proximo_estado]["final"])
            bootbox.alert("O token é valido!");
        else
            bootbox.alert("O token é invalido!");

        reiniciar_variaveis();
        desenhar_tabela();
        e.target.value = '';
    }    
}

function mostrar_validade_do_token(estado_final)
{
    if (estado_final)
        $('#palavra').css("color", "green");    
    else
        $('#palavra').css("color", "red");
}

function reiniciar_variaveis()
{
    g_proximo_estado = 0;
    g_estados_percorridos.length = 0;
    g_tamanho = 0;
}