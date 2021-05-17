<template>
  <div class="transacoes">
    <div class="grid">
      <header class="header">
        <div class="logo-transacoes">
          <img src="../assets/logo.png" />
        </div>

        <div class="infos">
          <div class="user-infos">
            <span class="NomeAluno">{{ nome_Aluno }}</span>
            <div class="user-infosMoeda">
              <img src="../assets/moeda.png" />
              <span v-html="quant_moedas_aluno" class="QuantMoedas"></span>
            </div>
          </div>
          <b-dropdown
            size="lg"
            variant="link"
            toggle-class="text-decoration-none"
            no-caret
          >
            <template #button-content>
              <b-avatar id="avatar" variant="warning" size="3.5rem"></b-avatar
              ><span class="sr-only">Search</span>
            </template>
            <b-dropdown-item href="#" to="/home-aluno">Home</b-dropdown-item>
            <b-dropdown-item href="#" to="/">Sair</b-dropdown-item>
          </b-dropdown>
        </div>
      </header>
    </div>

    <div class="container main">
      <b-card class="tabela_historico" title="HISTÓRICO DE TRANSFERÊNCIAS">
        <b-card-text>
          <div class="row">
            <div class="col-md-8 col-md-offset-2">
              <div class="panel panel-default">
                <div class="panel-body">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Remetente</th>
                        <th>Destinatário</th>
                        <th>Quant. moedas</th>
                        <th>Data</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="transferencia in transferencias"
                        :key="transferencia.id"
                      >
                        <td>{{ transferencia.nome_remetente }}</td>
                        <td>{{ transferencia.nome_destinatario }}</td>
                        <td>{{ transferencia.quantmoedas }}</td>
                        <td>
                          {{
                            transferencia.data
                              .replace(/T/, " ").replace(/\..+/, "")
                          }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </b-card-text>
      </b-card>
    </div>
  </div>
</template>

<script>
import axios from "../service/config.js";
//import router from "../router"

export default {
  data() {
    return {
      form: {
        nomeAlunoDestino_: "",
        valor_: "",
      },
      componentKey: 0,
      nome_aluno: "",
      quant_moedas_aluno: "",
      nome_Aluno: localStorage.getItem("nome_Aluno"),
      cpf_Aluno: localStorage.getItem("cpfAluno"),
      cnpj: localStorage.getItem("cnpj"),
    };
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;
    },
    quantMoedasAluno: function () {
      function retornaQuantMoeda(cpf) {
        console.log(cpf);
        return axios
          .post("/users/moeda-aluno", {
            cpf: cpf,
          })
          .then((response) => response.data)
          .catch((error) => error);
      }

      retornaQuantMoeda(this.cpf_Aluno)
        .then((data) => {
          console.log(data.moedas);
          this.quant_moedas_aluno = "<p>" + data.moedas + "</p>";
        })
        .catch((error) => console.log(error));
    },
    historico: function () {
      function retornaHistorico(cpf) {
        return axios
          .post("/historic/historic-student", {
            cpf: cpf,
          })
          .then((response) => response.data)
          .catch((error) => error);
      }

      retornaHistorico(this.cpf_Aluno)
        .then((data) => {
          console.log(data);
          this.transferencias = data;
        })
        .catch((error) => console.log(error));
    },
  },

  mounted() {
    this.quantMoedasAluno();
    this.historico();
  },
};
</script>

<style>
.transacoes {
  background-color: #034f6d;
  width: 100vw;
  height: 100vh;
}
.grid {
  display: grid;
  grid-template-rows: auto;
  width: 100%;
  z-index: 20;
  position: fixed;
  top: 0px;
}
.header {
  display: flex;
  align-items: center;
  background-color: #00abf1;
  height: 70px;
  padding: 0px 24px 0px 40px;
}
.logo-transacoes {
  display: flex;
  -webkit-box-flex: 1;
  flex-grow: 1;
  -webkit-box-pack: start;
  justify-content: flex-start;
}
.logo-transacoes img {
  width: 120px;
}
.infos {
  display: flex;
  align-self: start;
  align-items: flex-start;
}
.user-infos {
  padding-top: 15px;
}
.user-infos span p {
  margin: 0%;
  font-family: Bebas Neue;
  font-size: 1.1rem;
}
.NomeAluno {
  padding-left: 25px;
  color: #ffbf03;
  font-family: "Bebas Neue";
  font-size: 1.3rem;
}
.QuantMoedas {
  padding-left: 5px;
  color: white;
}
.user-infosMoeda {
  display: flex;
  padding-left: 20px;
}
.user-infosMoeda img {
  width: 20px;
  height: 20px;
}
#avatar {
  background-color: #ffbf03;
}
.main {
  padding-top: 80px;
}
.card-title {
  font-family: bebas neue;
  color: #ffbf03;
  font-size: 1.5rem;
}
.card-text {
  font-family: "Bebas Neue";
  font-size: 1.3rem;
}
</style>