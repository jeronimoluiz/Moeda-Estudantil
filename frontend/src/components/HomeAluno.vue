<template>
  <div class="home-aluno">
    <component-to-re-render :key="componentKey" />
    <div class="grid">
      <header class="header">
        <div class="logo-homeAluno">
          <img src="../assets/logo.png" />
        </div>
        <span class="pesquisa">
          <!-- <div class="pcompleta">
            <input
              type="text"
              class="caixa-pesquisa"
              placeholder="Pesquisar produtos"
              value
            />
            <span class="icone-pesquisa">
              <i class="fas fa-search"></i>
            </span>
          </div> -->
        </span>
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
            <b-dropdown-item href="#" to="/transacoes-aluno"
              >Histórico de Transferências</b-dropdown-item
            >
            <b-dropdown-item href="#" to="/lojas">Lojas</b-dropdown-item>
            <b-dropdown-item href="#" to="/">Sair</b-dropdown-item>
          </b-dropdown>
        </div>
      </header>
    </div>
    <div class="container main" id="center">
      <div class="row">
        <div class="col-12 main-carousel">
          <h1>Recomendados</h1>
          <b-carousel
            id="carousel-1"
            :interval="0"
            controls
            indicators
            style="text-shadow: 1px 1px 2px #333"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
          >
            <!-- Conteudo do slide -->
            <!-- Slide 1 -->
            <b-carousel-slide
              v-for="slide in slidesItem"
              v-bind:key="slide"
              class="slide"
            >
              <div class="row">
                <div class="col-6 imagem">
                  <!-- <router-link :to="{ name: 'produtosLoja', params: { nomeDaLoja: slide.NomeDaLoja }}"> -->
                  <img :src="slide.Imagem" />
                  <!-- </router-link> -->
                </div>

                <div class="col-6 descricao">
                  <h1 class="titulo">{{ slide.NomeDoProduto }}</h1>
                  <p class="preco"><strong>Preço: </strong>{{ slide.Preco }}</p>
                  <p class="loja">
                    <strong>Loja: </strong>{{ slide.NomeDaLoja }}
                  </p>
                  <p class="descricao">
                    <strong>Descrição: </strong>{{ slide.Descricao }}.
                  </p>
                </div>

                <div id="botao-comprar" class="row">
                  <b-button id="comprar" @click="$bvModal.show('modal-scoped')"
                    >Comprar</b-button
                  >
                </div>
              </div>
            </b-carousel-slide>
            <b-modal id="modal-scoped">
              <template hide-header-close>
                <p>Você realmente deseja resgatar este item?</p>
              </template>

              <template #modal-footer="{ cancel, hide }">
                <b-button size="sm" variant="danger" @click="cancel()">
                  Cancelar
                </b-button>
                <!-- Button with custom close trigger value -->
                <b-button
                  id="finalizar-comprar"
                  size="sm"
                  variant="outline-secondary"
                  @click="hide('forget')"
                >
                  Comprar
                </b-button>
              </template>
            </b-modal>
          </b-carousel>
        </div>
        <!--Cards-->
        <div class="col-12 main-cards">
          <div class="row">
            <div class="col-4 cards">
              <ul :style="gridStyle" class="card-list">
                <b-card
                  v-for="card in cardsItem"
                  v-bind:key="card"
                  :title="card.NomeDoProduto"
                  tag="article"
                  style="max-width: 20rem"
                  class="mb-2"
                >
                  <!-- <router-link :to="{ name: 'produtosLoja', params: { nomeDaLoja: card.NomeDaLoja }}" style="display: inline-block;text-decoration:none;color:#000"> -->
                  <b-card-text> {{ card.Preco }} </b-card-text>
                  <img :src="card.Imagem" class="img-card" />
                  <b-card-text> Loja: {{ card.NomeDaLoja }} </b-card-text>
                  <!-- </router-link> -->

                  <b-button id="comprar" @click="$bvModal.show('modal-scoped')"
                    >Comprar</b-button
                  >
                </b-card>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>

    <div class="grid-footer">
      <footer class="footer">
        <h1>TRANSFERÊNCIA DE MOEDAS</h1>
        <input
          v-model="form.valor_"
          name="moedasAluno"
          type="text"
          placeholder=" Digite a quantidade de moedas"
          required
        />
        <input
          v-on:keyup="listaAluno($event.target.value)"
          list="my-list-id"
          name="nomeAlunoDestino"
          placeholder=" Digite o nome do aluno"
          required
        />
        <datalist id="my-list-id" class="mb-4">
          <option v-for="aluno in alunos" v-bind:key="aluno">
            {{ aluno }}
          </option>
        </datalist>
        <button
          v-on:click="transfMoedasAluno"
          id="button_transf"
          type="primary"
        >
          Enviar
        </button>
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
        nomeAlunoDestino_: "",
        valor_: "",
      },
      cardsItem: [],
      slidesItem: [],
      numberOfColumns: 3,
      componentKey: 0,
      nome_aluno: "",
      quant_moedas_aluno: "",
      nome_Aluno: localStorage.getItem("nome_Aluno"),
      cpf_Aluno: localStorage.getItem("cpfAluno"),
      cnpj: localStorage.getItem("cnpj"),
      alunos: [],
    };
  },

  computed: {
    gridStyle() {
      return {
        gridTemplateColumns: `repeat(${this.numberOfColumns}, minmax(380px, 1fr))`,
      };
    },
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

    transfMoedasAluno: function () {
      var valor_int = parseInt(this.form.valor_, 10);
      if (valor_int <= 0) {
        alert("Quantidade de moedas inválidas!");
        return;
      }
      function atualizaMoedas(cpfAluno1, matricula, valor) {
        var matriculaAluno2 = matricula.replace(/\D+/g, "");
        return axios
          .post("/tranfer/aluno-aluno-matricula", {
            cpfAluno1,
            matriculaAluno2,
            valor,
          })
          .then((response) => response.data)
          .catch((error) => error);
      }
      atualizaMoedas(
        this.cpf_Aluno,
        this.form.nomeAlunoDestino_,
        this.form.valor_
      )
        .then((data) => {
          if (data == "CPF não encontrado")
            alert("Aluno não cadastrado no sistema");
          else if (data == "Você não tem moedas suficientes")
            alert("Saldo insificiente para transação");
          else if (data == "Transação não realizada")
            alert("Não foi possível realizar a transação");
          else if (data == "Transação realizada com sucesso") {
            alert("Operação realizada com sucesso!");
            this.quantMoedasAluno();
            this.forceRerender();
          }
        })
        .catch((error) => console.log(error));
    },

    listaAluno: function (aluno) {
      this.form.nomeAlunoDestino_ = "";
      console.log(this.cnpj);
      if (aluno.length > 0) {
        pesquisaAluno(aluno, this.cnpj)
          .then((data) => {
            console.log(this.alunos);
            this.alunos.splice(0, this.alunos.length);
            for (var i = 0; i != data.length; i++) {
              this.alunos.push(data[i].dado.toUpperCase());
            }
          })
          .catch((error) => console.log(error));
        this.form.nomeAlunoDestino_ = aluno;
      }

      function pesquisaAluno(nome, cnpj) {
        return axios
          .post("/users/search-registration", {
            nome,
            cnpj,
          })
          .then((response) => response.data)
          .catch((error) => error);
      }
    },

    produtos: function () {
      function selectProdutos(cpf) {
        console.log(cpf);
        return axios
          .post("/users/search-produtos", {
            cpf,
          })
          .then((response) => response.data)
          .catch((error) => error);
      }

      selectProdutos(this.cpf_Aluno)
        .then((data) => {
          for (var i = 0; i != data.length; i++) {
            if (i < 3) {
              data[i].Imagem = "data:image/jpg;base64, ".concat(data[i].Imagem);
              this.slidesItem.push(data[i]);
            } else {
              data[i].Imagem = "data:image/jpg;base64, ".concat(data[i].Imagem);
              this.cardsItem.push(data[i]);
            }
          }
        })
        .catch((error) => console.log(error));
    },
  },

  mounted() {
    this.quantMoedasAluno();
    this.produtos();
  },
};
</script>

<style>
#botao-comprar {
  width: 160px;
  margin-top: 30px;
  margin-bottom: 50px;
  margin-left: 40vh;
}

.close {
  display: none;
}

#comprar {
  background-color: #ffbf03;
}

#finalizar-comprar {
  background-color: #ffbf03;
}

.home-aluno {
  background-color: #034f6d;
  width: 100vw;
  height: 100vh;
  overflow: scroll;
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
  outline: 0;
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
  padding-top: 10vh;
  padding-bottom: 10vh;
  background-color: #034f6d;
}
#center {
  overflow: scoll;
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
  height: 500px;
  padding: 30px;
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
  padding-left: 0px;
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
  display: grid;
  grid-template-rows: auto;
  position: fixed;
  width: 100%;
  z-index: 20;
  bottom: 0px;
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
.footer input[name="moedasAluno"] {
  border-radius: 50px;
  font-family: "Bebas Neue";
  font-size: 20px;
  width: 300px;
  margin: 20px;
  outline: 0;
}
.footer input[name="nomeAlunoDestino"] {
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
.img-card {
  max-width: 300px;
  max-height: 200px;
}

.card-list {
  display: grid;
}

.card-item {
  padding: 2em;
}

ul {
  margin-left: 0.1vw;
  list-style-type: none;
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
/* Track */
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  -webkit-border-radius: 6px;
  border-radius: 6px;
}
/* Handle */
::-webkit-scrollbar-thumb {
  -webkit-border-radius: 6px;
  border-radius: 6px;
  background: #ffbf03;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}
::-webkit-scrollbar-thumb:window-inactive {
  background: #ffbf03;
}
</style>