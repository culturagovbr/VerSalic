export class Estados {

  public listaEstados: {UF: String, nome: String}[] =
    [
      {UF: null, nome: 'Todos os estados'},
      {UF: 'AC', nome: 'Acre'},
      {UF: 'AL', nome: 'Alagoas'},
      {UF: 'AP', nome: 'Amapá'},
      {UF: 'AM', nome: 'Amazonas'},
      {UF: 'BA', nome: 'Bahia'},
      {UF: 'CE', nome: 'Ceará'},
      {UF: 'DF', nome: 'Distrito Federal'},
      {UF: 'ES', nome: 'Espírito Santo'},
      {UF: 'GO', nome: 'Goiás'},
      {UF: 'MA', nome: 'Maranhão'},
      {UF: 'MT', nome: 'Mato Grosso'},
      {UF: 'MS', nome: 'Mato Grosso do Sul'},
      {UF: 'MG', nome: 'Minas Gerais'},
      {UF: 'PA', nome: 'Pará'},
      {UF: 'PB', nome: 'Paraíba'},
      {UF: 'PR', nome: 'Paraná'},
      {UF: 'PE', nome: 'Pernambuco'},
      {UF: 'PI', nome: 'Piauí'},
      {UF: 'RJ', nome: 'Rio de Janeiro'},
      {UF: 'RN', nome: 'Rio Grande do Norte'},
      {UF: 'RS', nome: 'Rio Grande do Sul'},
      {UF: 'RO', nome: 'Rondônia'},
      {UF: 'RR', nome: 'Roraima'},
      {UF: 'SC', nome: 'Santa Catarina'},
      {UF: 'SP', nome: 'São Paulo'},
      {UF: 'SE', nome: 'Sergipe'},
      {UF: 'TO', nome: 'Tocantins'}
    ];

  constructor () {}

  obterNomePorUF (UF: String) {
    for (const estado of this.listaEstados) {
      if (estado.UF === UF) {
        return estado.nome;
      }
    }
    return null;
  }

}
