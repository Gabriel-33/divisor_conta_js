alterar_classe_div_conteudo = (elemento) =>{
	let pegar_div_conteudo_bootstrap = document.getElementById("div_conteudo");
	switch(elemento){
		case 'dividir_conta':
			pegar_div_conteudo_bootstrap.className = "col-md-12 col-xs-12 col-sm-12 mx-auto";
			montar_conta_formulario();
			break;
		case 'guia_aplicacao':
			pegar_div_conteudo_bootstrap.className = "col-md-10 col-xs-12 col-sm-12 mx-auto";
			break;
		default:
			pegar_div_conteudo_bootstrap.className = "col-md-8 col-xs-12 col-sm-8 mx-auto";
			break;
	}
};
marcar_guia_selecionada = (elemento) =>{
	let elemento_marcar = document.querySelector(`#menu-sidebar #${elemento}`);
	let elementos_nao_marcar = document.querySelectorAll(`#menu-sidebar ul li > a:not(#${elemento})`);
	elemento_marcar.style.color = "white";
	for(link_nao_marcar of elementos_nao_marcar){
		link_nao_marcar.style.color = "black";
	}
	if(elemento == "dividir_conta"){
		let checar_clientes_preenchidos = document.querySelectorAll("#dividir_conta input[type=checkbox]");
		let msg_dividir_conta_div = document.getElementById("guia_dividir_conta");
		if(checar_clientes_preenchidos.length!=0){
			msg_dividir_conta_div.style.display = "none";
		}
	}
};
limpar_campos = (div_formulario) => {
	let div = document.querySelectorAll(`#${div_formulario} input[type='text']`);
	for(campos of div){
		campos.value = "";
	}
};
function chamar_elemento_pagina(e,elemento){
	e.preventDefault();
	let guia_selecionada = elemento; 
	let mostrar_elemento = document.querySelector(`#conteudo_elementos #${elemento}`);	
	let esconder_elementos = document.querySelectorAll(`#conteudo_elementos > div:not(#${elemento})`);
	mostrar_elemento.style.display = "block";
	// esconder_elementos.style.display = "none";
	for(let elementos of esconder_elementos){
		elementos.style.display = "none";
	}
	if(elemento == "dividir_conta"){
		montar_conta_formulario(elemento);
	}
	alterar_classe_div_conteudo(elemento);
	marcar_guia_selecionada(elemento);
}
let atualizar_form_conta = 1;
const cliente = ['pedro','gabriel','joão','marcos','lucas','gabriel1','joão1','marcos1','pedr2o','gabriel2','j2oão','ma2rcos'];
const comida = {
	nome:['pizza','açai','refri','bolo'],
	preco:[42,8,12,15],
	preco_dividido:[],
};
retornar_msg_usuario = (div,texto,tipoMsg,tempo) => {
	var div_msg = document.querySelector(`#retornar_msg`);
	var div_texto = document.querySelector(`#retornar_msg #texto`);
	div_msg.style.visibility = "visible";
	div_texto.textContent = texto;
	switch(tipoMsg){
		case "success":
			div_msg.className = "alert alert-success";
			break;
		case "warning":
			div_msg.className = "alert alert-warning";
			break;
		case "danger":
			div_msg.className = "alert alert-danger";
			break;
		default:
			break;
	}
	setTimeout(()=>{
		div_msg.style.visibility = "hidden";
	},tempo)
};
function adicionar_cliente(){
	let cliente_nome = document.getElementById("nome_cliente");
	if(cliente_nome.value!=""){
		cliente.push(cliente_nome.value);
		cliente_nome.value = "";
		atualizar_form_conta = 1;
		retornar_msg_usuario("adicionar_cliente","Cliente adicionado à mesa com sucesso!","success",1500);
	}else{
		retornar_msg_usuario("adicionar_cliente","Campo vázio. Preencha o campo!","warning",2500);
	}
}
function adicionar_comida(){
	let nome_comida = document.getElementById("nome_comida");
	let preco_comida = document.getElementById("preço_comida");
	if(nome_comida.value!="" && preco_comida.value!=""){
		comida['nome'].push(nome_comida.value);
		comida['preco'].push(preco_comida.value);
		nome_comida.value = "";
		preco_comida.value = "";
		retornar_msg_usuario("adicionar_comida","Comida adicionada à conta com sucesso!","success",1700);
	}else{
		if (nome_comida.value == "" && preco_comida.value!="") {
			retornar_msg_usuario("adicionar_comida","Campo Comida vázio. Preencha o campo comida!","warning",2500);
		}else if(nome_comida.value!= "" && preco_comida.value == ""){
			retornar_msg_usuario("adicionar_comida","Campo Preço vázio. Preencha o campo comida!","warning",2500);
		}else{
			retornar_msg_usuario("adicionar_comida","Campos vázios. Preencha os campos!","warning",3500);
		}
	}
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
			criar_checkbox_nome_cliente.name = cliente_nome;
			criar_checkbox_nome_cliente.value = comida.nome[i];
			criar_checkbox_nome_cliente.id = "cliente_comida";
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
	div_label_conta.id = "div_label_conta";
	let label_cliente_resultado = document.createElement("label");
	label_cliente_resultado.id = "label_cliente_resultado";
	let valor_label_cliente_resultado = document.createTextNode(cliente+": "+resultado+"R$");
	label_cliente_resultado.appendChild(valor_label_cliente_resultado);
	// label_cliente_resultado.style.width = "20%";
	// label_cliente_resultado.style.marginRight = "10px";
	// label_cliente_resultado.style.justifyContent = "center";
	label_cliente_resultado.appendChild(valor_label_cliente_resultado);
	div_label_conta.appendChild(label_cliente_resultado);
	div_conta.appendChild(div_label_conta);
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