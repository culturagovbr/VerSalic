import { Injectable } from '@angular/core';

@Injectable()
export class DataFormatterService {

  extraiIdDaUrl(url: string): String {
    return url.substr(url.lastIndexOf('/') + 1);
  }

  formataPercentagem(valor: string): String {
    if (valor === undefined || valor === null) {
      return 'Não Informada';
    } else {
      return parseFloat(valor).toFixed(2) + '%';
    }
  }

  formataData(data: String): String {
    if (data === undefined || data === null) {
      return 'Não Informada';
    } else {
      const dataSplit = data.split('-');

      if (dataSplit.length !== 3) {
        return data;
      } else {
        return dataSplit[2] + '/' +
              dataSplit[1] + '/' +
              dataSplit[0];
      }
    }
  }

  formataDataSemHora(data: String): String {
    if (data === undefined || data === null) {
      return 'Não Informada';
    } else {
      const strSplit = data.split(" ");
      const dataSplit = strSplit[0].split('-');
      const horaSplit = strSplit[1].split(':');

      if (dataSplit.length !== 3) {
        return data;
      } else {
        
        return dataSplit[2] + '/' +
              dataSplit[1] + '/' +
              dataSplit[0];
      }
    }
  }

  formataDataExtenso(data: String): String {
    if (data === undefined || data === null) {
      return 'Não Informada';
    } else {
      const dataSplit = data.split('-');

      if (dataSplit.length !== 3) {
        return data;
      } else {
        return this.obterDiaExtenso(dataSplit[2]) + ' de ' +
              this.obterMesExtenso(dataSplit[1]) + ' de ' +
              dataSplit[0];
      }
    }
  }

  obterMesExtenso (mesNum: String): String {
    switch (mesNum) {
      case '01':
      return 'Janeiro';
      case '02':
      return 'Fevereiro';
      case '03':
      return 'Março';
      case '04':
      return 'Abril';
      case '05':
      return 'Maio';
      case '06':
      return 'Junho';
      case '07':
      return 'Julho';
      case '08':
      return 'Agosto';
      case '09':
      return 'Setembro';
      case '10':
      return 'Outubro';
      case '11':
      return 'Novembro';
      case '12':
      return 'Dezembro';
      default:
      return 'Mês não informado';
    }
  }

  obterDiaExtenso(diaNum: String): String {
    if (diaNum[0] === '0') {
      if (diaNum[1] === '1') {
        return '1º';
      } else {
        return diaNum[1];
      }
    } else {
      return diaNum;
    }
  }

  formataAno(anoEmDoisDigitos: string): string {
    if (parseFloat(anoEmDoisDigitos) > 80) {
      return '19' + anoEmDoisDigitos;
    } else {
      return '20' + anoEmDoisDigitos;
    }
  }

  formataValorEmReais(valor: String): String {
    if (valor === undefined || valor === null) {
      return 'Não Informado';
    } else {
      const valorNum = Number(valor);
      return valorNum.toLocaleString('pt-BR',  { style: 'currency', currency: 'BRL' });
    }
  }

  formataCGCCPF(cgccpf: String): String {
    if (cgccpf === undefined || cgccpf === null) {
      return 'Não Informado';
    } else {
      if (cgccpf.length === 11) {
        return cgccpf.substr(0, 3) + '.' +
              cgccpf.substr(3, 3) + '.' +
              cgccpf.substr(6, 3) + '-' +
              cgccpf.substr(9, 2);

      } else if ( cgccpf.length === 14) {
        return cgccpf.substr(0, 2) + '.' +
              cgccpf.substr(2, 3) + '.' +
              cgccpf.substr(5, 3) + '/' +
              cgccpf.substr(8, 4) + '-' +
              cgccpf.substr(12, 2);

      } else {
        return cgccpf;
      }
    }
  }

  formataTipoPessoa (tipo: String) {
    if (tipo === 'juridica') {
      return 'Jurídica';
    } else if (tipo === 'fisica') {
      return 'Física';
    } else {
      return tipo;
    }
  }

  verificaSeHaTexto (texto: String) {
    if (texto !== null && texto !== '' && texto !== ' ' && texto !== undefined) {
      return texto;
    } else {
      return 'Informação não existente.';
    }
  }

  constructor() { }

}
