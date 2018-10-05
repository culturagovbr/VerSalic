export class Proponente {

  constructor ( public nome:          String,
                public cgccpf:        String,
                public _links:        {
                              'self': String,
                          'projetos': String
                                      },
                public tipo_pessoa:   String,
                public responsavel:   String,
                public UF:            String,
                public total_captado: String,
                public municipio:     String) {}

}
