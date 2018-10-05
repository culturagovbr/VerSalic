export class Produto {

  constructor ( public id_planilha_aprovacao: String,
                public justificativa:         String,
                public data_pagamento:        String,
                public nome:                  String,
                public cgccpf:                String,
                public tipo_forma_pagamento:  String,
                public data_aprovacao:        String,
                public valor_pagamento:       String,
                public _links:                {
                                   'projeto': String,
                                'fornecedor': String
                                              },
                public id_arquivo:            String,
                public nr_comprovante:        String,
                public nome_fornecedor:       String,
                public id_comprovante_pagamento: String,
                public tipo_documento:        String,
                public nr_documento_pagamento:    String,
                public nm_arquivo:            String,
                public PRONAC:                String,  
                public isJustificativaEscondida: Boolean ) {
                  this.isJustificativaEscondida = true;
                }
}
