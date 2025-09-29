import dados from "./../models/dados.js"

const { bruxos } = dados;

// Get Todos os Bruxos
const getAllBruxos = (req, res) => {
let resultado = bruxos;

    res.status(200).json({
        total: resultado.length,
        bruxos: resultado
    });
}

const getBruxosById = (req, res) => {
    const id = parseInt(req.params.id);

    const bruxo = bruxos.find(b => b.id === id); 
    
    if (bruxo) {
        res.status(200).json(bruxo);
    } else {
        res.status(404).json({
            erro: `Bruxo com id ${id} não encontrado`
        });
    }
};

const createBruxo = (req, res) => {
    const { nome, casa, anoNascimento, especialidade, nivelMagia, ativo } = req.body

    if(!nome || !casa){
        return res.status(400).json({
            sucess: false,
            message: "Nome e casa são obrigatórios"
        });
    }

    const novoBruxo = {
        id: bruxos.length + 1,
        nome,
        casa,
        anoNascimento: parseInt(anoNascimento),
        especialidade,
        nivelMagia: nivelMagia,
        ativo
    }

    bruxos.push(novoBruxo);

    res.status(201).json({
        sucess: true,
        message: "Bruxo cadastrado com sucesso!",
        bruxo: novoBruxo
    });
}


// DELETE /bruxos/:id - Remover bruxo por ID
const deleteBruxo = (req, res) => {
    const { id } = req.params;

    // Validar ID
    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "ID deve ser um número válido!"
        });
    }

    const idParaApagar = parseInt(id);
    
    // Verificar se bruxo existe antes de remover
    const bruxoParaRemover = bruxos.find(b => b.id === idParaApagar);
    if (!bruxoParaRemover) {
        return res.status(404).json({
            success: false,
            message: `Bruxo com ID ${id} não encontrado para remoção!`
        });
    }

    // Remover bruxo usando filter
    const bruxosFiltrados = bruxos.filter(bruxo => bruxo.id !== idParaApagar);
    
    // Atualizar array global
    bruxos.splice(0, bruxos.length, ...bruxosFiltrados);

    res.status(200).json({
        success: true,
        message: `Bruxo ${bruxoParaRemover.nome} (ID: ${id}) foi removido dos registros de Hogwarts.`,
        bruxoRemovido: bruxoParaRemover
    });
};

const updateBruxo = (req, res) => {
  const id = parseInt(req.params.id);
  const {
    nome,
    casa,
    anoNascimento,
    especialidade,
    nivelMagia,
    ativo,
  } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "O id deve ser válido",
    });
  }

  const bruxoExiste = bruxos.find((b) => b.id === id);

  if (!bruxoExiste) {
    return res.status(404).json({
      success: false,
      message: "O bruxo não existe",
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
    success: true,
    message: "Bruxo atualizado com sucesso",
    bruxo: bruxoAtualizado,
  });
};

export { getAllBruxos, getBruxosById, createBruxo, deleteBruxo, updateBruxo };