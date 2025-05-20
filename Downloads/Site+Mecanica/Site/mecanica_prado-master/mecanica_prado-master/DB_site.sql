CREATE TABLE contatos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefone VARCHAR(50) NOT NULL,
    mensagem TEXT NOT NULL,
    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO contatos (nome, email, telefone, mensagem)
VALUES ('Anderson Alves', 'andersol_a83@gmail.com', 
'(11) 98274-5698', 'Gostaria de saber mais sobre os serviços oferecidos.');

USE mecanica_prado;
SELECT * FROM contatos;

SELECT * FROM contatos;
