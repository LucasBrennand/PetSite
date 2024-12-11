<?php
$response = [
    'status' => 'success',
    'message' => 'Hello World!',
];

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        echo json_encode($response);
        break;
    case 'POST':
        $servername = "localhost";
        $username = "root"; 
        $password = "";
        $dbname = "mvc";

    // Cria a conexão
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Verifica a conexão
    if ($conn->connect_error) {
        die("Falha na conexão: " . $conn->connect_error);
    } else {
        echo "Conexão realizada com sucesso!";
    }

    // Adiciona um novo cliente
    if ($_SERVER['REQUEST_METHOD'] === "POST") {
        // Debugging: Print the received form data
        echo "<pre>";
        print_r($_REQUEST);
        echo "</pre>";

        $clienteID = $_REQUEST['clienteID'];
        $clienteNome = $_REQUEST['clientenome'];
        $clienteCpf = $_REQUEST['clienteCpfCnpj'];
        $clienteCep = $_REQUEST['clienteCep'];
        $clienteEndereco = $_REQUEST['clienteEndereco'];
        $clienteNumero = $_REQUEST['clienteNumero'];
        $clienteComplemento = $_REQUEST['clienteComplemento'];
        $clienteEmail = $_REQUEST['clienteEmail'];
        $clienteTelefone = $_REQUEST['clienteTelefone'];
        $clienteResponsavel = $_REQUEST['clienteResponsavel'];
        $clienteResponsavelCpf = $_REQUEST['clienteResponsavelCpf'];
        $clienteResponsavelEmail = $_REQUEST['clienteResponsavelEmail'];
        $clienteTipo = $_REQUEST['clienteTipo'];

        $stmt = $conn->prepare("INSERT INTO cliente (clientenome, clienteCpfCnpj, clienteCep, clienteEndereco, clienteNumero, clienteComplemento, clienteEmail, clienteTelefone, clienteResponsavel, clienteResponsavelCpf, clienteResponsavelEmail, clienteTipo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssssssssss", $clienteNome, $clienteCpf, $clienteCep, $clienteEndereco, $clienteNumero, $clienteComplemento, $clienteEmail, $clienteTelefone, $clienteResponsavel, $clienteResponsavelCpf, $clienteResponsavelEmail, $clienteTipo);
        $stmt->execute();
        $stmt->close();
    }

    // Adiciona um novo animal
    if ($_SERVER['REQUEST_METHOD'] === "POST") {
        // Debugging: Print the received form data
        echo "<pre>";
        print_r($_REQUEST);
        echo "</pre>";

        // Recebe os dados do formulário
        $animalID = $_POST['animalID'];
        $animalCliente = $_POST['animalCliente'];
        $animalNome = $_POST['animalNome'];
        $animalTipo = $_POST['animalTipo'];
        $animalRaca = $_POST['animalRaca'];
        $animalPeso = $_POST['animalPeso'];
        $animalIdade = $_POST['animalIdade'];

        $stmt = $conn->prepare("INSERT INTO animal (animalCliente, animalNome, animalTipo, animalRaca, animalPeso, animalIdade) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssss", $animalCliente, $animalNome, $animalTipo, $animalRaca, $animalPeso, $animalIdade);
        $stmt->execute();
        $stmt->close();
    }

    // Adiciona um novo exame
    if ($_SERVER['REQUEST_METHOD'] === "POST") {
        // Debugging: Print the received form data
        echo "<pre>";
        print_r($_REQUEST);
        echo "</pre>";

        // Recebe os dados do formulário
        $exameID = $_REQUEST['exameID'];
        $exameNome = $_REQUEST['exameNome'];
        $examePreco = $_REQUEST['examePreco'];

        $stmt = $conn->prepare("INSERT INTO exame (exameNome, examePreco) VALUES (?, ?)");
        $stmt->bind_param("ss", $exameNome, $examePreco);
        $stmt->execute();
        $stmt->close();
    }

    //Adiciona um novo pedido
    if ($_SERVER['REQUEST_METHOD'] === "POST") {
        // Debugging: Print the received form data
        echo "<pre>";
        print_r($_REQUEST);
        echo "</pre>";

        // Recebe os dados do formulário
        $pedidoID = $_REQUEST['pedidoID'];
        $pedidoCliente = $_REQUEST['pedidoCliente'];
        $pedidoAnimal = $_REQUEST['pedidoAnimal'];
        $pedidoExame = $_REQUEST['pedidoExame'];
        $pedidoData = $_REQUEST['pedidoData'];

        $stmt = $conn->prepare("INSERT INTO pedido (pedidoCliente, pedidoAnimal, pedidoExame, pedidoData) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $pedidoCliente, $pedidoAnimal, $pedidoExame, $pedidoData);
        $stmt->execute();
        $stmt->close();
    }
    break;
    case 'DELETE':
        parse_str(file_get_contents('php://input'), $_DELETE);
        echo json_encode($_DELETE);
        break;
    case 'PUT':
        parse_str(file_get_contents('php://input'), $_PUT);
        echo json_encode($_PUT);
        break;
    default:
        echo json_encode($response);
        break;
};