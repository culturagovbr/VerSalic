export class Incentivador {

  constructor ( public nome:        String,
                public cgccpf:      String,
                public total_doado: String,
                public _links:      {
                         'doacoes': String,
                            'self': String
                                    },
                public tipo_pessoa: String,
                public responsavel: String,
                public UF:          String,
                public municipio:   String) {}
}
