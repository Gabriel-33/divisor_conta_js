function chamar_elemento_pagina(e,elemento){
	e.preventDefault();
	let mostrar_elemento = document.querySelector(`#conteudo_elementos #${elemento}`);	
	let esconder_elementos = document.querySelectorAll(`#conteudo_elementos > div:not(#${elemento})`);
	mostrar_elemento.style.display = "block";
	// esconder_elementos.style.display = "none";
	for(let elementos of esconder_elementos){
		elementos.style.display = "none";
	}
	if(elemento == "dividir_conta"){
		montar_conta_formulario();
	}
}
let atualizar_form_conta = 1;
const cliente = ['pedro','gabriel','Davi','marcos'];
const comida = {
	nome:['pizza','açai','refrigerante'],
	preco:[42,12,8],
	preco_dividido:[],
};
function adicionar_cliente(){
	let cliente_nome = document.getElementById("nome_cliente");
	cliente.push(cliente_nome.value);
	cliente_nome.value = "";
	// console.log(cliente);
	atualizar_form_conta = 1;
}
function adicionar_comida(){
	let nome_comida = document.getElementById("nome_comida");
	let preco_comida = document.getElementById("preço_comida");
	comida['nome'].push(nome_comida.value);
	comida['preco'].push(preco_comida.value);
	nome_comida.value = "";
	preco_comida.value = "";
	// console.log(comida)
}
function montar_formulario(div_conteudo_elementos){
	const div_conteudo_conta = document.createElement("div");
	div_conteudo_conta.id = "div_conta_formulario";
	for(var i = 0; i < comida.nome.length; i++){
		// console.log(comida.nome[i])
		let comida_nome_formatado = comida.nome[i]+" "+comida.preco[i]+"(R$):";
		let criar_label = document.createElement("label");
		let texto_label = document.createTextNode(comida_nome_formatado);
		criar_label.id = "comida_nome";
		// criar_label.style.display = "inline-block"
       	// criar_label.style.width = "20%"
       	// criar_label.style.align = "start"
		let criar_quebra_linha = document.createElement("br")
		criar_label.setAttribute("for","label");
		criar_label.appendChild(texto_label);	
		div_conteudo_conta.appendChild(criar_label);
		for(cliente_nome of cliente){
			let nome_cliente = cliente_nome;
			let criar_checkbox_nome_cliente = document.createElement("input");
			let criar_label_cliente = document.createElement("label");
			let criar_texto_label_cliente = document.createTextNode(cliente_nome);
			criar_label_cliente.id = "label_nome_cliente";
			criar_checkbox_nome_cliente.type = "checkbox";
			// criar_checkbox_nome_cliente.class = "form-check-input";
			criar_checkbox_nome_cliente.name = cliente_nome;
			criar_checkbox_nome_cliente.value = comida.nome[i];
			criar_checkbox_nome_cliente.id = "cliente_comida";			
			// criar_label_cliente.style.display = "inline-block";
	       	// criar_label_cliente.style.width = "12%";
	       	// criar_label_cliente.style.align = "start";
	       	criar_label_cliente.appendChild(criar_texto_label_cliente);
			div_conteudo_conta.appendChild(criar_checkbox_nome_cliente);
			div_conteudo_conta.appendChild(criar_label_cliente);
		}
		div_conteudo_conta.appendChild(criar_quebra_linha);
		div_conteudo_elementos.prepend(div_conteudo_conta);
	}
}
function atualizar_element_conta(){
	let verificar_limpar_labels = document.querySelectorAll("#conteudo_elementos #dividir_conta label");
	if(verificar_limpar_labels!=null){
		for(let label_element of verificar_limpar_labels){
			if(label_element.getAttribute("id") == "label_cliente_resultado"){
				label_element.remove();
			}
		}
	}
}
function montar_conta_formulario(){
	const div_conteudo_elementos = document.querySelector("#conteudo_elementos #dividir_conta");
	let checar_formulario_existe = document.querySelector("#dividir_conta #div_conta_formulario");
	if(checar_formulario_existe!=null){	
		checar_formulario_existe.remove();
	}
	atualizar_element_conta();
	montar_formulario(div_conteudo_elementos);
}
function mostrar_conta_dividida_div(resultado,cliente){
	const div_conta = document.querySelector("#conteudo_elementos #dividir_conta");
	let div_label_conta = document.createElement("div");
	let label_cliente_resultado = document.createElement("label");
	label_cliente_resultado.id = "label_cliente_resultado";
	let valor_label_cliente_resultado = document.createTextNode(cliente+": "+resultado+"R$");
	label_cliente_resultado.appendChild(valor_label_cliente_resultado);
	label_cliente_resultado.style.width = "20%";
	label_cliente_resultado.style.marginRight = "10px";
	// label_cliente_resultado.style.justifyContent = "center";
	label_cliente_resultado.appendChild(valor_label_cliente_resultado);
	div_conta.appendChild(label_cliente_resultado);
}
function dividir_conta(){
	atualizar_element_conta();
	const comida_cliente = {
		comida:[],
		cliente:[],
	};
	const comida_aux = [];
	const contar_quantidade_div_comida = [];
	let resultado_conta = 0;
	const objetos = document.querySelectorAll("#dividir_conta input[type=checkbox]:checked");
	for(objeto of objetos){
		comida_cliente.comida.push(objeto.value);
		comida_cliente.cliente.push(objeto.name);
		comida_aux.push(objeto.value);
	}
	comida_aux.forEach(element => {
	  contar_quantidade_div_comida[element] = (contar_quantidade_div_comida[element] || 0) + 1;
	});
	comida.nome.forEach((element,index) =>{
		comida.preco_dividido[index] = parseFloat(comida.preco[index]/contar_quantidade_div_comida[element]);
	});
	cliente.forEach(cliente =>{
		comida_cliente.cliente.forEach((cliente_comida,index)=>{
			if(cliente == cliente_comida){
				let indice = comida.nome.indexOf(comida_cliente.comida[index]);
				resultado_conta += comida.preco_dividido[indice];
			}
		});
		// console.log(cliente+":"+resultado_conta);
		mostrar_conta_dividida_div(resultado_conta.toFixed(2),cliente);
		resultado_conta = 0;
	});
}
