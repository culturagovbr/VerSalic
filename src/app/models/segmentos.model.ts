export class Segmentos {

  public segmentos: {cod: String, nome: String, areaCod: String}[] =
    [
      {cod: '0',  nome: 'Todos os segmentos', areaCod: null},

      {cod: '11', nome: 'Teatro', areaCod: '1'},
      {cod: '12', nome: 'Dança', areaCod: '1'},
      {cod: '13', nome: 'Circo', areaCod: '1'},
      {cod: '14', nome: 'Ópera', areaCod: '1'},
      {cod: '15', nome: 'Mímica', areaCod: '1'},
      {cod: '16', nome: 'Ópera Rock', areaCod: '1'},
      {cod: '17', nome: 'Ações de capacitação e treinamento de pessoal', areaCod: '1'},

      {cod: '21', nome: 'Jogos eletrônicos', areaCod: '2'},
      {cod: '22', nome: 'Videofonográfica', areaCod: '2'},
      {cod: '23', nome: 'Produção Cinematográfica de curta metragem', areaCod: '2'},
      {cod: '24', nome: 'Rádio/Tvs Educativa', areaCod: '2'},
      {cod: '25', nome: 'Multimídia', areaCod: '2'},
      {cod: '26', nome: 'Produção Cinematográfica de média metragem', areaCod: '2'},
      {cod: '27', nome: 'Formação/Pesquisa/Informação', areaCod: '2'},
      {cod: '28', nome: 'Exibição Cinematográfica', areaCod: '2'},
      {cod: '29', nome: 'Infra-estrutura Técnica Audiovisual', areaCod: '2'},
      {cod: '2A', nome: 'Produção Videofonográfica de curta metragem', areaCod: '2'},
      {cod: '2B', nome: 'Produção Videofonográfica de média metragem', areaCod: '2'},
      {cod: '2C', nome: 'Formação Audiovisual', areaCod: '2'},
      {cod: '2D', nome: 'Pesquisa Audiovisual', areaCod: '2'},
      {cod: '2E', nome: 'Doações de Acervos Audiovisuais', areaCod: '2'},
      {cod: '2F', nome: 'Construção de salas de cinema (< 100 mil hab)', areaCod: '2'},
      {cod: '2G', nome: 'Manutenção de salas de cinema (< 100 mil hab)', areaCod: '2'},
      {cod: '2H', nome: 'Constr. centro comunitário c/sala cinema(<100 mil)', areaCod: '2'},
      {cod: '2I', nome: 'Manut. centro comunitário c/sala cinema(<100 mil)', areaCod: '2'},
      {cod: '2J', nome: 'Difusão de Acervo Audiovisual', areaCod: '2'},
      {cod: '2H', nome: 'Constr. centro comunitário c/sala cinema(<100 mil)', areaCod: '2'},
      {cod: '2K', nome: 'Preservação de Acervo Audiovisual', areaCod: '2'},
      {cod: '2H', nome: 'Restauração de Acervo Audiovisual', areaCod: '2'},
      {cod: '20', nome: 'Rádios e TVs Educativas não comerciais', areaCod: '2'},
      {cod: '2P', nome: 'Projetos Audiovisuais Transmidiáticos', areaCod: '2'},

      {cod: '31', nome: 'Música Popular', areaCod: '3'},
      {cod: '32', nome: 'Música Erudita', areaCod: '3'},
      {cod: '33', nome: 'Música Instrumental', areaCod: '3'},
      {cod: '34', nome: 'Áreas Integradas', areaCod: '3'},
      {cod: '35', nome: 'Orquestra', areaCod: '3'},
      {cod: '36', nome: 'Doações de Acervos Musicais', areaCod: '3'},

      {cod: '41', nome: 'Plásticas', areaCod: '4'},
      {cod: '42', nome: 'Gráficas', areaCod: '4'},
      {cod: '43', nome: 'Filatelia', areaCod: '4'},
      {cod: '44', nome: 'Gravura', areaCod: '4'},
      {cod: '45', nome: 'Cartazes', areaCod: '4'},
      {cod: '46', nome: 'Fonografia', areaCod: '4'},
      {cod: '47', nome: 'Exposição Itinerante', areaCod: '4'},
      {cod: '48', nome: 'Design', areaCod: '4'},
      {cod: '49', nome: 'Artes Plásticas', areaCod: '4'},
      {cod: '4A', nome: 'Artes Gráficas', areaCod: '4'},
      {cod: '4B', nome: 'Exposição de Artes', areaCod: '4'},
      {cod: '4C', nome: 'Moda', areaCod: '4'},
      {cod: '4D', nome: 'Doações de Acervos de Artes Visuais', areaCod: '4'},
      {cod: '4E', nome: 'Formação técnica e artística de profissionais', areaCod: '4'},
      {cod: '4F', nome: 'Projeto educativo de artes visuais', areaCod: '4'},
      {cod: '4G', nome: 'Projeto de fomento à cadeia produtiva arte visual', areaCod: '4'},

      {cod: '51', nome: 'História', areaCod: '5'},
      {cod: '52', nome: 'Arquitetônico', areaCod: '5'},
      {cod: '53', nome: 'Arqueológico', areaCod: '5'},
      {cod: '54', nome: 'Museu', areaCod: '5'},
      {cod: '55', nome: 'Acervo', areaCod: '5'},
      {cod: '56', nome: 'Acervos Museológicos', areaCod: '5'},
      {cod: '57', nome: 'Cultura Afro Brasileira', areaCod: '5'},
      {cod: '58', nome: 'Cultura Indígena', areaCod: '5'},
      {cod: '59', nome: 'Artesanato/Folclore', areaCod: '5'},
      {cod: '5A', nome: 'Preservação de Patrimônio imaterial', areaCod: '5'},
      {cod: '5B', nome: 'Manutenção de equipamentos culturais em geral', areaCod: '5'},
      {cod: '5C', nome: 'Ações de capacitação', areaCod: '5'},
      {cod: '5D', nome: 'Doações de Acervos', areaCod: '5'},
      {cod: '5E', nome: 'Preservação de Patrimônio Material', areaCod: '5'},
      {cod: '5F', nome: 'Restauração de Patrimônio Material', areaCod: '5'},
      {cod: '5G', nome: 'Preservação de Patrimônio Museológico', areaCod: '5'},
      {cod: '5H', nome: 'Restauração de Patrimônio Museológico', areaCod: '5'},
      {cod: '5I', nome: 'Preservação de Acervos', areaCod: '5'},
      {cod: '5J', nome: 'Restauração de Acervos', areaCod: '5'},
      {cod: '5K', nome: 'Preservação de Acervos Museológicos', areaCod: '5'},
      {cod: '5L', nome: 'Restauração de Acervos Museológicos', areaCod: '5'},
      {cod: '5M', nome: 'Treinamento de pessoal p/ manutenção de acervos', areaCod: '5'},
      {cod: '5N', nome: 'Aquisição de equipamentos p/ manutenção de acervos', areaCod: '5'},
      {cod: '5O', nome: 'Manutenção de salas de Teatro (<100 mil hab)', areaCod: '5'},
      {cod: '5P', nome: 'Manut. centro comunitário c/sl teatro (<100 mil hab)', areaCod: '5'},
      {cod: '5Q', nome: 'Construção de equipamentos culturais em geral', areaCod: '5'},
      {cod: '5R', nome: 'Construção de salas de teatro munic(< 100 mil hab)', areaCod: '5'},

      {cod: '61', nome: 'Edição de Livros', areaCod: '6'},
      {cod: '62', nome: 'Obras de Referência', areaCod: '6'},
      {cod: '63', nome: 'História', areaCod: '6'},
      {cod: '64', nome: 'Filosofia', areaCod: '6'},
      {cod: '65', nome: 'Acervo Bibliográfico', areaCod: '6'},
      {cod: '66', nome: 'Arquivo', areaCod: '6'},
      {cod: '67', nome: 'Biblioteca', areaCod: '6'},
      {cod: '68', nome: 'Evento Literário', areaCod: '6'},
      {cod: '69', nome: 'Periódicos', areaCod: '6'},
      {cod: '6A', nome: 'Ações de formação e capacitação', areaCod: '6'},
      {cod: '6B', nome: 'Eventos e ações de incentivo à leitura', areaCod: '6'},
      {cod: '6C', nome: 'Livros de valor Artístico', areaCod: '6'},
      {cod: '6D', nome: 'Livros de valor Literário', areaCod: '6'},
      {cod: '6E', nome: 'Livros de valor Humanístico', areaCod: '6'},
      {cod: '6F', nome: 'Periódicos e outras publicações', areaCod: '6'},
      {cod: '6G', nome: 'Treina pessoal p manuten de acervos bibliográficos', areaCod: '6'},
      {cod: '6H', nome: 'Aquisiç equip p/manuten de acervos bibliográficos', areaCod: '6'},

      {cod: '71', nome: 'Artes Integradas', areaCod: '7'},
      {cod: '72', nome: 'Restauração/Bolsas', areaCod: '7'},
      {cod: '73', nome: 'Multimídia', areaCod: '7'},
      {cod: '74', nome: 'Carnaval', areaCod: '7'},
      {cod: '75', nome: 'Carnaval fora de época', areaCod: '7'},
      {cod: '76', nome: 'Cultura Popular', areaCod: '7'},
      {cod: '77', nome: 'Equipamentos culturais multifuncionais', areaCod: '7'},

      {cod: '81', nome: 'Produção Cinematográfica', areaCod: '2'},
      {cod: '82', nome: 'Produção de obras seriadas', areaCod: '2'},
      {cod: '83', nome: 'Produção Televisiva', areaCod: '2'},
      {cod: '84', nome: 'Produção Radiofônica', areaCod: '2'},
      {cod: '85', nome: 'Distribuição Cinematográfica', areaCod: '2'},
      {cod: '86', nome: 'Preservação/Restauração da Memória Cinematográfica', areaCod: '2'},
      {cod: '87', nome: 'Difusão', areaCod: '2'},
      {cod: '88', nome: 'Formação/Pesquisa e informação', areaCod: '2'},
      {cod: '89', nome: 'Intercâmbio cultural', areaCod: '2'},
      ];

  constructor () {
  }

  obterNomePorCod (cod: String) {
    for (const segmento of this.segmentos) {
      if (segmento.cod === cod) {
        return segmento.nome;
      }
    }
    return null;
  }

  obterAreaCodPorCod (cod: String) {
    for (const segmento of this.segmentos) {
      if (segmento.cod === cod) {
        return segmento.areaCod;
      }
    }
  }

  segmentosFiltrados (areaCod: String) {
    const segmentosFiltrados = new Array<Object>();

    if (areaCod !== null && areaCod !== undefined) {

      for (const segmento of this.segmentos) {
        if (segmento.areaCod == areaCod || segmento.cod == '0') {
          segmentosFiltrados.push(segmento);
        }
      }
      return segmentosFiltrados;
    } else {
      return this.segmentos;
    }
  }

}
