export class Proposta {

  constructor ( public id:                    String,
                public nome:                  String,
                public mecanismo:             String,
                public data_aceite:           String,
                public data_inicio:           String,
                public data_termino:          String,
                public data_arquivamento:     String,
                public acessibilidade:        String,
                public objetivos:             String,
                public justificativa:         String,
                public etapa:                 String,
                public ficha_tecnica:         String,
                public impacto_ambiental:     String,
                public especificacao_tecnica: String,
                public estrategia_execucao:   String,
                public providencia:           String,
                public democratizacao:        String,
                public sinopse:               String,
                public resumo:                String,
                public isResumoEscondido: Boolean ) {
                  this.isResumoEscondido = true;
                }

}
