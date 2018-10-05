export class Fornecedor {

  constructor ( public nome:   String,
                public cgccpf: String,
                public email:  String,
                public _links:        {
                        'self': String,
                    'produtos': String
                                      }, ) {}
}
