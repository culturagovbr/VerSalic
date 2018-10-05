export class Projeto {

  constructor ( public PRONAC:          String,
                public anoProjeto:      String,
                public nome:            String,
                public cgccpf:          String,
                public proponente:      String,
                public segmento:        String,
                public area:            String,
                public UF:              String,
                public municipio:       String,
                public dataInicio:      String,
                public dataTermino:     String,
                public situacao:        String,
                public mecanismo:       String,
                public enquadramento:         String,
                public valorProjeto:          String,
                public outrasFontes:          String,
                public valorCaptado:          String,
                public valorProposta:         String,
                public valorSolicitado:       String,
                public valorAprovado:         String,
                public acessibilidade:        String,
                public objetivos:             String,
                public justificativa:         String,
                public etapa:                 String,
                public ficha_tecnica:         String,
                public impactoAmbiental:     String,
                public especificacaoTecnica: String,
                public estrategiaExecucao:   String,
                public providencia:           String,
                public democratizacao:        String,
                public sinopse:               String,
                public resumo:                String,
                public marcasAnexadas:       [
                                              {
                              'id_documento': String,
                                'data_envio': String,
                                      'link': String,
                                'id_arquivo': String,
                                 'descricao': String,
                              'nome_arquivo': String
                                              }
                                             ]
                                              ,
                public divulgacao:           [
                                              {
                                      'peca': String,
                                   'veiculo': String
                                              }
                                             ],
                public relatorioFisico:      [
                                              {
                                      'etapa': String,
                                    'unidade': String,
                                       'item': String,
                             'perc_executado': String,
                            'perc_a_executar': String,
                           'valor_programado': String,
                             'qtd_programada': String,
                            'valor_executado': String,
                          'id_planilha_etapa': String
                                              }
                                             ],
                public relacaoPagamentos:    [
                                              {
                      'id_planilha_aprovacao': String,
                              'justificativa': String,
                             'data_pagamento': String,
                                       'nome': String,
                                     'cgccpf': String,
                             'data_aprovacao': String,
                            'valor_pagamento': String,
                                 'nm_arquivo': String,
                                 'id_arquivo': String,
                            'nome_fornecedor': String,
                   'id_comprovante_pagamento': String,
                     'nr_documento_pagamento': String,
                             'tipo_documento': String
                                              }
                                             ],
                public certidoesNegativas:   [
                                              {
                              'data_emissao': String,
                             'data_validade': String,
                                  'situacao': String,
                                 'descricao': String
                                              }
                                             ],
                public readequacoes:         [
                                              {
                                 'is_arquivo': String,
                               'nome_arquivo': String,
                             'st_atendimento': String,
                      'descricao_readequacao': String,
                    'descricao_justificativa': String,
                   'descricao_encaminhamento': String,
                        'descricao_avaliacao': String,
                      'descricao_solicitacao': String,
                               'id_avaliador': String,
                        'id_tipo_readequacao': String,
                          'si_encaminhamento': String,
                             'id_readequacao': String,
                             'id_solicitante': String,
                                  'st_estado': String,
                           'data_solicitacao': String
                             'data_avaliador': String
                                              }
                                             ],
                public documentosAnexados:   [
                                              {
                                      'nome': String,
                                      'data': String,
                             'classificacao': String,
                                      'link': String
                                              }
                                             ],
                public distribuicao:         [
                                              {
                          'qtd_patrocinador': String,
                            'qtd_proponente': String,
                                      'area': String,
                              'posicao_logo': String,
                                   'produto': String,
                                  'segmento': String,
                               'localizacao': String,
                          'qtd_venda_normal': String,
                                'qtd_outros': String,
                               'receita_pro': String,
                     'preco_unitario_normal': String,
                             'qtd_produzida': String,
                     'qtd_venda_promocional': String,
                'preco_unitario_promocional': String,
                          'receita_prevista': String,
                            'receita_normal': String
                                             }
                                            ],
                public prorrogacao:          [
                                              {
                               'atendimento': String,
                                   'usuario': String,
                                'data_final': String,
                               'data_pedido': String,
                                'observacao': String,
                               'data_inicio': String,
                                    'estado': String
                                              }
                                             ],
                public _embedded:           {
                                 'captacoes':              [{
                                                    'PRONAC': String,
                                                     'valor': String,
                                               'data_recibo': String,
                                              'nome_projeto': String,
                                                    'cgccpf': String,
                                               'nome_doador': String,
                                                    '_links':               [
                                                                              {
                                                                    'projeto': String,
                                                                'incentivador': String
                                                                              }
                                                                            ]
                                                            }]
                                            },
                public isResumoEscondido: Boolean ) {
                  this.isResumoEscondido = true;
                }
}
