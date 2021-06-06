<template>
  <div class="home-aluno">
    <component-to-re-render :key="componentKey" />
    <div class="grid">
      <header class="header">
        <div class="logo-homeAluno">
          <img src="../assets/logo.png" />
        </div>
        <span class="pesquisa"> </span>
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
            <b-dropdown-item href="#" to="/lojas">Lojas</b-dropdown-item>
            <b-dropdown-item href="#" to="/transacoes-aluno"
              >Histórico de Transferências</b-dropdown-item
            >
            <b-dropdown-item href="#" to="/">Sair</b-dropdown-item>
          </b-dropdown>
        </div>
      </header>
    </div>
    <div class="container main">
      <div class="row">
        <div class="title">
          <h1>Produtos</h1>
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
                  <!-- </router-link> -->
                  <b-button id="comprar" @click="$bvModal.show('modal-scoped')">
                    Comprar
                  </b-button>
                </b-card>
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
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "../service/config.js";

export default {
  name: "produtosLoja",
  props: {
    nomeDaLoja: Object,
  },
  data() {
    return {
      cardsItem: [],
      numberOfColumns: 3,
      componentKey: 0,
      cards: {
        card: 0,
        title: "",
        price: "",
        image: [],
        shopName: "",
        description: "",
      },
      nome_aluno: "",
      quant_moedas_aluno: "",
      nome_Aluno: localStorage.getItem("nome_Aluno"),
      cpf_Aluno: localStorage.getItem("cpfAluno"),
      cnpj: localStorage.getItem("cnpj"),
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

    selectTodosProdutos: function () {
      function retornaProdutos(nomeDaLoja) {
        return axios
          .post("/users/search-produtoLoja", {
            nomeLoja: nomeDaLoja,
          })
          .then((response) => response.data)
          .catch((error) => error);
      }

      retornaProdutos(this.nomeDaLoja)
        .then((data) => {
          for (var i = 0; i != data.length; i++) {
            data[i].Imagem = "data:image/jpg;base64, ".concat(data[i].Imagem);
            this.cardsItem.push(data[i]);
          }
        })
        .catch((error) => console.log(error));
    },
  },

  mounted() {
    this.quantMoedasAluno();
    this.selectTodosProdutos();
  },
};
</script>

<style>

#comprar {
  background-color: #ffbf03;
  margin-top: 20px;
}

.home-aluno {
  background-color: #034f6d;
  width: 100vw;
  height: 100vh;
  overflow: auto;
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

.title {
  padding: 1%;
  color: #ffbf03;
  align-items: center;
  font-family: bebas neue;
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
