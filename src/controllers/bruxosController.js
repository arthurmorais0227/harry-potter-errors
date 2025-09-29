import dados from "./../models/dados.js";

const { bruxos } = dados;

// Get Todos os Bruxos
const getAllBruxos = (req, res) => {
  let resultado = bruxos;

  res.status(200).json({
    status: 200,
    success: true,
    message: "Lista de bruxos convocada com sucesso!",
    total: resultado.length,
    bruxos: resultado,
  });
};

const getBruxosById = (req, res) => {
  const id = parseInt(req.params.id);

  const bruxo = bruxos.find((b) => b.id === id);

  if (bruxo) {
    res.status(200).json(bruxo);
  } else {
    res.status(404).json({
      status: 404,
      success: false,
      message: "Wizard not found in Hogwarts registry",
      error: "WIZARD_NOT_FOUND",
      suggestions: [
        "Check the wizard name spelling",
        "Verify if the wizard is registered",
      ],
    });
  }
};

const createBruxo = (req, res) => {
  const { nome, casa, anoNascimento, especialidade, nivelMagia, ativo } =
    req.body;

  if (!nome || !casa) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: "Nome e casa são obrigatórios",
      error: "OBRIGATORY_ELEMENTS",
      suggestions: [
        "Check the wizard nome",
        "Check the wizard casa",
      ],
    });
  }



const nomeExiste = aliens.some(
    (a) => a.nome.toLowerCase() === nome.toLowerCase()
  );

  if (nomeExiste) {
    return res.status(409).json({ 
    status: 409,
    success: false,
    message: "Já existe um bruxo com esse nome!",
    error: "NAME_ALREADY_USED",
    suggestions: [
        "Check the wizard nome",
      ]
  });
}

if ((!autorizacao || autorizacao !== true)) {
  return res.status(400).json({
    success: false,
    message: "Este alien tem um nível de poder alto. A atualização requer autorizacao: true."
  });
}

  const novoBruxo = {
    id: bruxos.length + 1,
    nome,
    casa,
    anoNascimento: parseInt(anoNascimento),
    especialidade,
    nivelMagia: nivelMagia,
    ativo,
  };

  bruxos.push(novoBruxo);

  res.status(201).json({
    sucess: true,
    message: "Bruxo cadastrado com sucesso!",
    bruxo: novoBruxo,
  });
};

// DELETE /bruxos/:id - Remover bruxo por ID
const deleteBruxo = (req, res) => {
  const { id } = req.params;

  // Validar ID
  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "ID deve ser um número válido!",
    });
  }

  const idParaApagar = parseInt(id);

  // Verificar se bruxo existe antes de remover
  const bruxoParaRemover = bruxos.find((b) => b.id === idParaApagar);
  if (!bruxoParaRemover) {
    return res.status(404).json({
      success: false,
      message: `Bruxo com ID ${id} não encontrado para remoção!`,
    });
  }

   const { admin } = req.body;

    if (admin === false) {
    return res.status(403).json({
      status: 403,
      success: false,
      message: "Somente o Diretor pode executar essa magia!",
      error: "AUTHENTICATION_DENIED",
      suggestions: [
        "Change the authentication."
      ],
    });
  }

  // Remover bruxo usando filter
  const bruxosFiltrados = bruxos.filter((bruxo) => bruxo.id !== idParaApagar);

  // Atualizar array global
  bruxos.splice(0, bruxos.length, ...bruxosFiltrados);

  res.status(200).json({
    status: 200,
    success: true,
    message: "Bruxo expulso de Hogwarts com sucesso!",
    bruxoRemovido: bruxoParaRemover
  });
};

const updateBruxo = (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, casa, anoNascimento, especialidade, nivelMagia, ativo } =
    req.body;

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "O id deve ser válido",
    });
  }

  const bruxoExiste = bruxos.find((b) => b.id === id);

  if (!bruxoExiste) {
    return res.status(404).json({
      status: 404,
      success: false,
      message: "“Não é possível reparar o que não existe!",
      error: "ID_NOT_FOUND",
      suggestions: [
        "Check the wizard id"
      ],
    });
  }

  const bruxosAtualizados = bruxos.map((b) =>
    b.id === id
      ? {
          ...b,
          ...(nome && {
            nome,
          }),
          ...(casa && {
            casa,
          }),
          ...(anoNascimento && {
            anoNascimento,
          }),
          ...(especialidade && {
            especialidade,
          }),
          ...(nivelMagia && {
            nivelMagia,
          }),
          ...(ativo && {
            ativo,
          }),
        }
      : b
  );

  bruxos.splice(0, bruxos.length, ...bruxosAtualizados);

  const bruxoAtualizado = bruxos.find((p) => p.id === id);

  res.status(200).json({
    status: 200,
    success: true,
    message: "Bruxo atualizado com sucesso",
    bruxoAtualizado: bruxoAtualizado
  });
};

export { getAllBruxos, getBruxosById, createBruxo, deleteBruxo, updateBruxo };
