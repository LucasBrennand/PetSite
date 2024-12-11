
// Mock data for users
const usuarios = [
    { id: 1, nome: 'Administrador', usuario: 'admin', perfil: 'Administrador' },
    { id: 2, nome: 'João Silva', usuario: 'joao', perfil: 'Operador' },
    { id: 3, nome: 'Maria Santos', usuario: 'maria', perfil: 'Supervisor' }
];

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if(username === 'admin' && password === '1234') {
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('dashboardPage').style.display = 'flex';
        initDashboard();
        loadUsuarios();
    } else {
        alert('Credenciais inválidas!');
    }
});

function showUserInfo() {
    document.getElementById('userInfoModal').style.display = 'block';
}

function hideUserInfo() {
    document.getElementById('userInfoModal').style.display = 'none';
}

function loadUsuarios() {
    const tbody = document.getElementById('usuariosTable');
    tbody.innerHTML = '';
    
    usuarios.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.nome}</td>
            <td>${user.usuario}</td>
            <td>${user.perfil}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="editarUsuario(${user.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="excluirUsuario(${user.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function showNovoUsuario() {
    // Implementação do modal de novo usuário
    alert('Implementar formulário de novo usuário');
}

function editarUsuario(id) {
    // Implementação da edição de usuário
    alert('Implementar edição do usuário ' + id);
}

function excluirUsuario(id) {
    if(confirm('Deseja realmente excluir este usuário?')) {
        // Implementação da exclusão de usuário
        alert('Implementar exclusão do usuário ' + id);
    }
}

function initDashboard() {
    const examesCtx = document.getElementById('examesChart').getContext('2d');
    const faturamentoCtx = document.getElementById('faturamentoChart').getContext('2d');

    new Chart(examesCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
            datasets: [{
                label: 'Exames Realizados',
                data: [250, 300, 280, 320, 290, 350],
                backgroundColor: '#3498db'
            }]
        }
    });

    new Chart(faturamentoCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
            datasets: [{
                label: 'Faturamento (R$)',
                data: [35000, 38000, 42000, 40000, 45000, 48000],
                borderColor: '#2ecc71'
            }]
        }
    });
}

document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', function() {
        const page = this.getAttribute('data-page');
        if (page === 'clientes') {
            showClientesPage();
        } else if (page === 'animais') {
            showAnimaisPage();
        } else if (page === 'exames') {
            showExamesPage();
        } else if (page === 'pedidos') {
            showPedidosPage();
        } else {
            console.log(`Navegando para: ${page}`);
        }
    });
});

// Mock data for clients
let clientes = [
    { 
        id: 1, 
        nome: 'João da Silva', 
        cpfCnpj: '123.456.789-00',
        cep: '12345-678',
        endereco: 'Rua Example',
        numero: '123',
        complemento: 'Apto 101',
        email: 'joao@example.com',
        telefones: ['(11) 98765-4321'],
        responsavel: 'Maria Silva',
        responsavelCpf: '987.654.321-00',
        responsavelEmail: 'maria@example.com',
        tipo: 'CONTRATO'
    }
];

function showClientesPage() {
    document.querySelectorAll('.content > div').forEach(div => div.style.display = 'none');
    document.getElementById('clientesContent').style.display = 'block';
    loadClientes();
}

function loadClientes() {
    const tbody = document.getElementById('clientesTableBody');
    tbody.innerHTML = '';
    
    clientes.forEach(cliente => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${cliente.id}</td>
            <td>${cliente.nome}</td>
            <td>${cliente.cpfCnpj}</td>
            <td>${cliente.email}</td>
            <td>${cliente.telefones[0]}</td>
            <td>${cliente.tipo}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="editarCliente(${cliente.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="excluirCliente(${cliente.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function showNovoClienteForm() {
    document.getElementById('clienteModalTitle').textContent = 'Novo Cliente';
    const nextId = Math.max(...clientes.map(c => Number(c.id) || 0), 0) + 1;
    document.getElementById('clienteId').value = nextId;
    document.getElementById('clienteForm').reset();
    document.getElementById('clienteModal').style.display = 'block';
}

function hideClienteModal() {
    document.getElementById('clienteModal').style.display = 'none';
}

function addTelefoneField() {
    const container = document.getElementById('telefonesContainer');
    const div = document.createElement('div');
    div.className = 'input-group mb-2';
    div.innerHTML = `
        <input type="text" class="form-control telefone-input">
        <button type="button" class="btn btn-danger" onclick="removeTelefoneField(this)">
            <i class="fas fa-minus"></i>
        </button>
    `;
    container.appendChild(div);
}

function removeTelefoneField(button) {
    button.closest('.input-group').remove();
}

document.getElementById('clienteForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const telefonesInputs = document.querySelectorAll('.telefone-input');
    const telefones = Array.from(telefonesInputs).map(input => input.value).filter(val => val);
    
    const clienteData = {
        id: parseInt(document.getElementById('clienteId').value),
        nome: document.getElementById('clienteNome').value,
        cpfCnpj: document.getElementById('clienteCpfCnpj').value,
        cep: document.getElementById('clienteCep').value,
        endereco: document.getElementById('clienteEndereco').value,
        numero: document.getElementById('clienteNumero').value,
        complemento: document.getElementById('clienteComplemento').value,
        email: document.getElementById('clienteEmail').value,
        telefones: telefones,
        responsavel: document.getElementById('clienteResponsavel').value,
        responsavelCpf: document.getElementById('clienteResponsavelCpf').value,
        responsavelEmail: document.getElementById('clienteResponsavelEmail').value,
        tipo: document.getElementById('clienteTipo').value
    };

  
});
    


function editarCliente(id) {
    const cliente = clientes.find(c => c.id === id);
    if (cliente) {
        document.getElementById('clienteModalTitle').textContent = 'Editar Cliente';
        document.getElementById('clienteId').value = cliente.id;
        document.getElementById('clienteNome').value = cliente.nome;
        document.getElementById('clienteCpfCnpj').value = cliente.cpfCnpj;
        document.getElementById('clienteCep').value = cliente.cep;
        document.getElementById('clienteEndereco').value = cliente.endereco;
        document.getElementById('clienteNumero').value = cliente.numero;
        document.getElementById('clienteComplemento').value = cliente.complemento;
        document.getElementById('clienteEmail').value = cliente.email;
        document.getElementById('clienteResponsavel').value = cliente.responsavel;
        document.getElementById('clienteResponsavelCpf').value = cliente.responsavelCpf;
        document.getElementById('clienteResponsavelEmail').value = cliente.responsavelEmail;
        document.getElementById('clienteTipo').value = cliente.tipo;
        
        // Reset telefones
        const telefonesContainer = document.getElementById('telefonesContainer');
        telefonesContainer.innerHTML = '';
        cliente.telefones.forEach(telefone => {
            const div = document.createElement('div');
            div.className = 'input-group mb-2';
            div.innerHTML = `
                <input type="text" class="form-control telefone-input" value="${telefone}">
                <button type="button" class="btn btn-danger" onclick="removeTelefoneField(this)">
                    <i class="fas fa-minus"></i>
                </button>
            `;
            telefonesContainer.appendChild(div);
        });
        
        document.getElementById('clienteModal').style.display = 'block';
    }
}

function excluirCliente(id) {
    if (confirm('Deseja realmente excluir este cliente?')) {
        clientes = clientes.filter(c => c.id !== id);
        loadClientes();
    }
}

// Mock data for animals
let animais = [
    {
        id: 1,
        clienteId: 1,
        nome: 'Rex',
        tipo: 'DOG',
        raca: 'Labrador',
        peso: 25.5,
        idade: '3 anos'
    }
];

function showAnimaisPage() {
    document.querySelectorAll('.content > div').forEach(div => div.style.display = 'none');
    document.getElementById('animaisContent').style.display = 'block';
    loadAnimais();
}

function loadAnimais() {
    const tbody = document.getElementById('animaisTableBody');
    tbody.innerHTML = '';
    
    animais.forEach(animal => {
        const cliente = clientes.find(c => c.id === animal.clienteId);
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${animal.id}</td>
            <td>${cliente ? cliente.nome : 'N/A'}</td>
            <td>${animal.nome}</td>
            <td>${animal.tipo}</td>
            <td>${animal.raca}</td>
            <td>${animal.peso} kg</td>
            <td>${animal.idade}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="editarAnimal(${animal.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="excluirAnimal(${animal.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function showNovoAnimalForm() {
    document.getElementById('animalModalTitle').textContent = 'Novo Animal';
    document.getElementById('animalId').value = animais.length + 1;
    document.getElementById('animalForm').reset();
    populateClientesSelect();
    document.getElementById('animalModal').style.display = 'block';
}

function hideAnimalModal() {
    document.getElementById('animalModal').style.display = 'none';
}

function populateClientesSelect() {
    const select = document.getElementById('animalCliente');
    select.innerHTML = '<option value="">Selecione o cliente...</option>';
    clientes.forEach(cliente => {
        select.innerHTML += `<option value="${cliente.id}">${cliente.nome}</option>`;
    });
}

document.getElementById('animalForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const animalData = {
        id: parseInt(document.getElementById('animalId').value),
        clienteId: parseInt(document.getElementById('animalCliente').value),
        nome: document.getElementById('animalNome').value,
        tipo: document.getElementById('animalTipo').value,
        raca: document.getElementById('animalRaca').value,
        peso: parseFloat(document.getElementById('animalPeso').value),
        idade: document.getElementById('animalIdade').value
    };
    
    const existingIndex = animais.findIndex(a => a.id === animalData.id);
    if (existingIndex >= 0) {
        animais[existingIndex] = animalData;
    } else {
        animais.push(animalData);
    }
    
    loadAnimais();
    hideAnimalModal();
});

// Mock data for exams
let exames = [
    {
        id: 1,
        nome: 'Hemograma Completo',
        preco: 120.00
    },
    {
        id: 2,
        nome: 'Ultrassonografia Abdominal',
        preco: null
    }
];

function showExamesPage() {
    document.querySelectorAll('.content > div').forEach(div => div.style.display = 'none');
    document.getElementById('examesContent').style.display = 'block';
    loadExames();
}

function loadExames() {
    const tbody = document.getElementById('examesTableBody');
    tbody.innerHTML = '';
    
    exames.forEach(exame => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${exame.id}</td>
            <td>${exame.nome}</td>
            <td>${exame.preco !== null ? `R$ ${exame.preco.toFixed(2)}` : 'Sob Consulta'}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="editarExame(${exame.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="excluirExame(${exame.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function showNovoExameForm() {
    document.getElementById('exameModalTitle').textContent = 'Novo Exame';
    const nextId = Math.max(...exames.map(e => e.id), 0) + 1;
    document.getElementById('exameId').value = nextId;
    document.getElementById('exameForm').reset();
    document.getElementById('exameModal').style.display = 'block';
}

function hideExameModal() {
    document.getElementById('exameModal').style.display = 'none';
}

document.getElementById('exameForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const preco = document.getElementById('examePreco').value;
    
    const exameData = {
        id: parseInt(document.getElementById('exameId').value),
        nome: document.getElementById('exameNome').value,
        preco: preco === '' ? null : parseFloat(preco)
    };
    
    const existingIndex = exames.findIndex(e => e.id === exameData.id);
    if (existingIndex >= 0) {
        exames[existingIndex] = exameData;
    } else {
        exames.push(exameData);
    }
    
    loadExames();
    hideExameModal();
});

// Mock data for orders
let pedidos = [
    {
        id: 1,
        data: '2024-01-20',
        clienteId: 1,
        animalId: 1,
        itens: [
            { exameId: 1, preco: 120.00, quantidade: 1 }
        ],
        total: 120.00,
        status: 'Pendente'
    }
];

function showPedidosPage() {
    document.querySelectorAll('.content > div').forEach(div => div.style.display = 'none');
    document.getElementById('pedidosContent').style.display = 'block';
    loadPedidos();
}

function loadPedidos() {
    const tbody = document.getElementById('pedidosTableBody');
    tbody.innerHTML = '';
    
    pedidos.forEach(pedido => {
        const cliente = clientes.find(c => c.id === pedido.clienteId);
        const animal = animais.find(a => a.id === pedido.animalId);
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${pedido.id}</td>
            <td>${new Date(pedido.data).toLocaleDateString()}</td>
            <td>${cliente ? cliente.nome : 'N/A'}</td>
            <td>${animal ? animal.nome : 'N/A'}</td>
            <td>R$ ${pedido.total.toFixed(2)}</td>
            <td>${pedido.status}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="editarPedido(${pedido.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="excluirPedido(${pedido.id})">
                    <i class="fas fa-trash"></i>
                </button>
                <button class="btn btn-sm btn-info" onclick="gerarPDF(${pedido.id})">
                    <i class="fas fa-file-pdf"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function showNovoPedidoForm() {
    document.getElementById('pedidoModalTitle').textContent = 'Novo Pedido';
    const nextId = Math.max(...pedidos.map(p => p.id), 0) + 1;
    document.getElementById('pedidoId').value = nextId;
    document.getElementById('pedidoData').value = new Date().toISOString().split('T')[0];
    document.getElementById('pedidoForm').reset();
    populateClientesSelect();
    populateExamesSelect();
    document.getElementById('pedidoModal').style.display = 'block';
}

function hidePedidoModal() {
    document.getElementById('pedidoModal').style.display = 'none';
}

function loadAnimaisByCliente() {
    const clienteId = parseInt(document.getElementById('pedidoCliente').value);
    const select = document.getElementById('pedidoAnimal');
    select.innerHTML = '<option value="">Selecione o animal...</option>';
    
    const animaisCliente = animais.filter(a => a.clienteId === clienteId);
    animaisCliente.forEach(animal => {
        select.innerHTML += `<option value="${animal.id}">${animal.nome}</option>`;
    });

    // Show/hide pay button based on client type
    const cliente = clientes.find(c => c.id === clienteId);
    document.getElementById('btnPagar').style.display = 
        cliente && cliente.tipo === 'AVULSO' ? 'inline-block' : 'none';
}

function populateExamesSelect() {
    const selects = document.querySelectorAll('.exame-select');
    selects.forEach(select => {
        select.innerHTML = '<option value="">Selecione o exame...</option>';
        exames.forEach(exame => {
            select.innerHTML += `<option value="${exame.id}" data-preco="${exame.preco}">${exame.nome}</option>`;
        });
    });
}

function addExamePedido() {
    const container = document.getElementById('examesPedidoContainer');
    const div = document.createElement('div');
    div.className = 'row mb-2';
    div.innerHTML = `
        <div class="col-md-5">
            <select class="form-control exame-select">
                <option value="">Selecione o exame...</option>
            </select>
        </div>
        <div class="col-md-3">
            <input type="number" class="form-control preco-input" placeholder="Preço">
        </div>
        <div class="col-md-2">
            <input type="number" class="form-control qtd-input" value="1" min="1">
        </div>
        <div class="col-md-2">
            <button type="button" class="btn btn-danger" onclick="removeExamePedido(this)">
                <i class="fas fa-minus"></i>
            </button>
        </div>
    `;
    container.appendChild(div);
    populateExamesSelect();
    setupExameListeners(div);
}

function removeExamePedido(button) {
    button.closest('.row').remove();
    calculateTotal();
}

function setupExameListeners(container) {
    const exameSelect = container.querySelector('.exame-select');
    const precoInput = container.querySelector('.preco-input');
    const qtdInput = container.querySelector('.qtd-input');

    exameSelect.addEventListener('change', function() {
        const option = this.options[this.selectedIndex];
        const preco = option.dataset.preco;
        precoInput.value = preco || '';
        precoInput.readOnly = preco !== null;
        calculateTotal();
    });

    precoInput.addEventListener('input', calculateTotal);
    qtdInput.addEventListener('input', calculateTotal);
}

function calculateTotal() {
    let total = 0;
    const rows = document.querySelectorAll('#examesPedidoContainer .row');
    rows.forEach(row => {
        const preco = parseFloat(row.querySelector('.preco-input').value) || 0;
        const qtd = parseInt(row.querySelector('.qtd-input').value) || 0;
        total += preco * qtd;
    });
    document.getElementById('totalPedido').textContent = total.toFixed(2);
}

function gerarPDF(pedidoId) {
    // Implementar geração de PDF
    alert('Gerando PDF do pedido...');
}

function realizarPagamento() {
    // Implementar pagamento
    alert('Implementar integração com gateway de pagamento');
}

document.getElementById('pedidoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const itens = [];
    const rows = document.querySelectorAll('#examesPedidoContainer .row');
    rows.forEach(row => {
        const exameId = parseInt(row.querySelector('.exame-select').value);
        const preco = parseFloat(row.querySelector('.preco-input').value);
        const quantidade = parseInt(row.querySelector('.qtd-input').value);
        if (exameId && preco && quantidade) {
            itens.push({ exameId, preco, quantidade });
        }
    });
    
    const pedidoData = {
        id: parseInt(document.getElementById('pedidoId').value),
        data: document.getElementById('pedidoData').value,
        clienteId: parseInt(document.getElementById('pedidoCliente').value),
        animalId: parseInt(document.getElementById('pedidoAnimal').value),
        itens: itens,
        total: parseFloat(document.getElementById('totalPedido').textContent),
        status: 'Pendente'
    };
    
    const existingIndex = pedidos.findIndex(p => p.id === pedidoData.id);
    if (existingIndex >= 0) {
        pedidos[existingIndex] = pedidoData;
    } else {
        pedidos.push(pedidoData);
    }
    
    loadPedidos();
    hidePedidoModal();
});

// Fechar modal quando clicar fora dele
window.onclick = function(event) {
    const modal = document.getElementById('userInfoModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

document.getElementById('empresaForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Handle empresa form submission
    alert('Dados da empresa salvos com sucesso!');
});
