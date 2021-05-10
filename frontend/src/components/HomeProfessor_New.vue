<template>
  <div class="home-aluno">
    <div class="grid">
      <header class="header">
        <div class="logo-homeAluno">
          <img src="../assets/logo.png" />
        </div>

        <!-- Classe invisível -->
        <span class="pesquisa">
          <div class="pcompleta">
            <input
              type="text"
              class="caixa-pesquisa"
              placeholder="Pesquisar produtos"
              value
            />
            <span class="icone-pesquisa">
              <i class="fas fa-search"></i>
            </span>
          </div>
        </span>
        <!--  -->

        <div class="infos">
          <div class="user-infos">
            <span class="NomeProfessor">{{nome_Professor}}</span>
            <div class="user-infosMoeda">
              <img src="../assets/moeda.png" />
              <span v-html="quant_moedas_prof" class="QuantMoedas"></span>
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
            <b-dropdown-item href="#" to="/">Sair</b-dropdown-item>
          </b-dropdown>
        </div>
      </header>
    </div>

    <div class="container main"></div>

    <div class="grid-footer">
      <footer class="footer">
        <h1>TRANSFERÊNCIA DE MOEDAS</h1>
        <form inline v-on:submit.prevent="transfMoedasProfessor">
          <input
            v-model="form.valor_"
            name="moedasProf"
            type="text"
            placeholder=" Digite a quantidade de moedas"
            required
          />
          <input
            v-on:keyup="listaAluno($event.target.value)"
            list="my-list-id"
            name="inputAlunos"
            placeholder=" Digite o nome do aluno"
            required
          />
          <datalist id="my-list-id" class="mb-4">
            <option v-for="aluno in alunos" v-bind:key="aluno">
              {{ aluno }}
            </option>
          </datalist>
          <button id="button_transf" type="primary">Enviar</button><br />
        </form>
      </footer>
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
        nomeAluno_: "",
        valor_: "",
      },

      componentKey: 0,
      //COLOCADO O VALOR ERRO SÓ PARA PERMITIR A VIZUALIZAÇÃO DO GRID
      nome_prof: "USER",
      quant_moedas_prof: "",
      cpf_Professor: localStorage.getItem("cpfProfessor"),
      cnpj: localStorage.getItem("cnpj"),
      nome_Professor: localStorage.getItem("nome_Professor"),
      alunos: [],
    };
  },

  methods: {
    forceRerender() {
      this.componentKey += 1;
    },

     quantMoedasProfessor: function () {
      function retornaQuantMoeda(cpf) {
        console.log(cpf);
        return axios
          .post("/users/moeda-professor", {
            cpf: cpf,
          })
          .then((response) => response.data)
          .catch((error) => error);
      }

      retornaQuantMoeda(this.cpf_Professor)
        .then((data) => {
          console.log(data.moedas);
          this.quant_moedas_prof = "<p>" + data.moedas + "</p>";
        })
        .catch((error) => console.log(error));
    },

    transfMoedasProfessor: function () {
      var valor_int = parseInt(this.form.valor_, 10);
      if (valor_int <= 0) {
        alert("Quantidade de moedas inválidas!");
        return;
      }
      function atualizaMoedas(cpfProfessor, nomeAluno, valor) {
        return axios
          .post("/tranfer/professor-aluno-name", {
            cpfProfessor,
            nomeAluno,
            valor,
          })
          .then((response) => response.data)
          .catch((error) => error);
      }
      atualizaMoedas(this.cpf_Professor, this.form.nomeAluno_, this.form.valor_)
        .then((data) => {
          console.log(data);
          if (data == "Nome do aluno não encontrado")
            alert("Aluno não cadastrado no sistema");
          else if (data == "Você não tem moedas suficientes")
            alert("Saldo insuficiente para transação");
          else if (data == "Transação não realizada")
            alert("Não foi possível realizar a transação");
          else if (data == "Transação realizada com sucesso") {
            alert("Operação realizada com sucesso!");
            this.quantMoedasProfessor();
            this.forceRerender();
          }
        })
        .catch((error) => console.log(error));
    },

    listaAluno: function (aluno) {
      this.form.nomeAluno_ = "";
      console.log(this.cnpj);
      if (aluno.length > 0) {
        pesquisaAluno(aluno, this.cnpj)
          .then((data) => {
            console.log(this.alunos);
            this.alunos.splice(0, this.alunos.length);
            for (var i = 0; i != data.length; i++) {
              this.alunos.push(data[i].nome.toUpperCase());
            }
          })
          .catch((error) => console.log(error));
        this.form.nomeAluno_ = aluno;
      }

      function pesquisaAluno(nome, cnpj) {
        return axios
          .post("/users/search-name", {
            nome,
            cnpj,
          })
          .then((response) => response.data)
          .catch((error) => error);
      }
    },
  },

  mounted() {
    this.quantMoedasProfessor();
    this.nomeAluno();
  },
};
</script>

<style>
.home-aluno {
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
.logo-homeAluno {
  display: flex;
  -webkit-box-flex: 0.5;
  flex-grow: 0.5;
  -webkit-box-pack: start;
  justify-content: flex-start;
}
.logo-homeAluno img {
  width: 120px;
}
.pesquisa {
  display: flex;
  flex-direction: column;
  align-self: start;
  align-items: flex-start;
  flex-grow: 0.5;
}
.pcompleta {
  height: 30px;
  width: 264px;
  margin: 20px 0px 30px;
  border-radius: 4px;
  border: 1px solid #ffbf03;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
}
.pesquisa .caixa-pesquisa {
  border: none;
  -webkit-box-flex: 1;
  flex-grow: 1;
  font-family: Bebas Neue;
  padding: 0px 5px;
  border-radius: 4px 0px 0px 4px;
  margin: 0px;
}
.pesquisa input {
  height: 100%;
  color: #ffbf03;
  padding-left: 6px;
}
::-webkit-input-placeholder {
  color: #ffbf03;
}
.pesquisa .icone-pesquisa {
  color: #ffbf03;
  width: 18px;
  height: 18px;
  margin: 0px 7px;
  cursor: pointer;
  outline: transparent;
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
.NomeProfessor{
  padding-left: 25px;
  color: #ffbf03;
  font-family: 'Bebas Neue';
  font-size: 1.3rem;
}
.QuantMoedas {
  padding-left: 5px;
  color: white;
}
.user-infosMoeda {
  display: flex;
}
.user-infosMoeda img {
  width: 20px;
  height: 20px;
}
#avatar {
  background-color: #ffbf03;
}
.main {
  padding-top: 70px;
  background-color: #034f6d;
}
.main-carousel h1 {
  text-align: center;
  padding-top: 20px;
  font-size: 3rem;
  font-family: bebas neue;
  color: #ffbf03;
}
.slide {
  width: 100%;
  height: 400px;
}
.imagem img {
  max-width: 100%;
}
.descricao h1 {
  text-align: initial;
  padding-bottom: 30px;
}
.descricao p {
  text-align: initial;
  font-family: bebas neue;
  font-size: 2rem;
}
.cards {
  padding-left: 60px;
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
.grid-footer {
  width: 100%;
  position: fixed;
  z-index: 1000;
  bottom: 0rem;
}
.footer {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  background-color: #00abf1;
  height: 60px;
  padding: 0px 24px 0px 40px;
}
.footer h1 {
  font-family: bebas neue;
  color: #ffbf03;
  padding-right: 20px;
  padding-top: 10px;
}
.footer input[name="moedasProf"] {
  border-radius: 50px;
  font-family: "Bebas Neue";
  font-size: 20px;
  width: 300px;
  margin: 20px;
  outline: 0;
}
footer input[name="inputAlunos"] {
  border-radius: 50px;
  font-family: "Bebas Neue";
  font-size: 20px;
  width: 300px;
  margin: 20px;
  outline: 0;
}
#button_transf {
  width: 200px;
  font-family: "Bebas Neue";
  letter-spacing: 2px;
  background: #ffbf03;
  border-radius: 6px;
  cursor: pointer;
  color: #fff;
  border: none;
  font-size: 26px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>