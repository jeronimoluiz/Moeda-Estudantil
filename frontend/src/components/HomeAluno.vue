<template>
  <div class="home-aluno">
    <div class="grid">
      <header class="header">
        <div class="logo-homeAluno">
          <img src="../assets/logo.png" />
        </div>
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
        <div class="infos">
          <div class="user-infos">
            <span v-html="nome_aluno" class="NomeAluno"></span>
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
            <b-dropdown-item href="#" to="/">Sair</b-dropdown-item>
          </b-dropdown>
        </div>
      </header>
    </div>
    <div class="container main">
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
            <b-carousel-slide class="slide">
              <div class="row">
                <div class="col-6 imagem">
                  <img src="../assets/xpicanha.jpg" />
                </div>
                <div class="col-6 descricao">
                  <h1 class="titulo">X-picanha</h1>
                  <p class="preco"><strong>Preço: </strong>1000 moedas</p>
                  <p class="descricao">
                    <strong>Descrição: </strong>pão, hamburguer bovino 100g,
                    alface, tomate, cebola, queijo cheddar.
                  </p>
                </div>
              </div>
            </b-carousel-slide>
            <!-- Slide 2 -->
            <b-carousel-slide class="slide">
              <div class="row">
                <div class="col-6 imagem">
                  <img src="../assets/xpicanha.jpg" />
                </div>
                <div class="col-6 descricao">
                  <h1 class="titulo">X-picanha</h1>
                  <p class="preco"><strong>Preço: </strong>1000 moedas</p>
                  <p class="descricao">
                    <strong>Descrição: </strong>pão, hamburguer bovino 100g,
                    alface, tomate, cebola, queijo cheddar.
                  </p>
                </div>
              </div>
            </b-carousel-slide>

            <!-- Slide 3 -->
            <b-carousel-slide class="slide">
              <div class="row">
                <div class="col-6 imagem">
                  <img src="../assets/xpicanha.jpg" alt="" />
                </div>
                <div class="col-6 descricao">
                  <h1 class="titulo">X-picanha</h1>
                  <p class="preco"><strong>Preço: </strong>1000 moedas</p>
                  <p class="descricao">
                    <strong>Descrição: </strong>pão, hamburguer bovino 100g,
                    alface, tomate, cebola, queijo cheddar.
                  </p>
                </div>
              </div>
            </b-carousel-slide>
          </b-carousel>
        </div>
        <!--Cards-->
        <div class="col-12 main-cards">
          <div class="row">
            <div class="col-4 cards">
              <b-card
                title="Vitamina de açai"
                img-src="https://picsum.photos/600/300/?image=24"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem"
                class="mb-2"
              >
                <b-card-text>
                  500 moedas
                </b-card-text>
              </b-card>
            </div>
            <div class="col-4 cards">
              <b-card
                title="Vitamina de açai"
                img-src="https://picsum.photos/600/300/?image=25"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem"
                class="mb-2"
              >
                <b-card-text>
                  500 moedas
                </b-card-text>
              </b-card>
            </div>
            <div class="col-4 cards">
              <b-card
                title="Vitamina de açai"
                img-src="https://picsum.photos/600/300/?image=26"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem"
                class="mb-2"
              >
                <b-card-text>
                 500 moedas
                </b-card-text>
              </b-card>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid-footer">
      <footer class="footer">
                    <h1>TRANSFERÊNCIA DE MOEDAS</h1>
                    <input v-model="form.valor_" name="moedasAluno" type="text" placeholder=" Digite a quantidade de moedas" required />
                    <input v-model="form.cpf_AlunoDestino" name="moedasAluno" type="text" placeholder=" Digite a CPF do aluno" required />
                    <button v-on:click="transfMoedasAluno" id="button_transf" type="primary">Enviar</button>
      </footer>
    </div>
  </div>

  <!--<div class="home">
        
        
        
        <div class="TrasnfAluno">
            <b-card class="card">
                <div>
                    <br>
                    <h1>TRANSFERÊNCIA DE MOEDAS</h1>
                    <input v-model="form.valor_" name="moedasAluno" type="text" placeholder=" Digite a quantidade de moedas" required />
                    <input v-model="form.cpf_AlunoDestino" name="moedasAluno" type="text" placeholder=" Digite a CPF do aluno" required />
                    <button v-on:click="transfMoedasAluno" id="button_transf" type="primary">Enviar</button><br />
                    <br/>
                </div>
            </b-card>
        </div>
        <component-to-re-render :key = "componentKey" />
        <div class="TrasnfAluno">
            <b-card class="card2">
                <div>
                    <br>
                    <h1>
                        QUANTIDADE DE MOEDAS
                    </h1>
                    
                    <span v-html="quant_moedas_aluno" class="QuantMoedas"></span>
                    
                </div>
            </b-card>
        </div>
        
        
    </div>-->
</template>

<script>
import axios from "../service/config.js";
//import router from "../router"

export default {
  data() {
    return {
      form: {
        cpf_AlunoDestino: "",
        valor_: "",
      },

      componentKey: 0,
      nome_aluno: " ",
      quant_moedas_aluno: "",
      cpf_Aluno: localStorage.getItem("cpfAluno"),
    };
  },

  methods: {
    forceRerender() {
      this.componentKey += 1;
    },

    nomeAluno: function () {
      function retornaNomeAluno(cpf) {
        console.log(cpf);
        return axios
          .post("/users/nome-aluno", {
            cpf: cpf,
          })
          .then((response) => response.data)
          .catch((error) => error);
      }

      retornaNomeAluno(this.cpf_Aluno)
        .then((data) => {
          console.log(data.nomeAluno);
          this.nome_aluno = "<p>" + data.nome + "</p>";
        })
        .catch((error) => console.log(error));
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
      var cpf_int2 = parseInt(this.form.cpf_AlunoDestino, 10);
      if (cpf_int2 == this.cpf_Aluno) {
        alert("Não pode enviar para si mesmo!");
        return;
      }
      function atualizaMoedas(cpfAluno1, cpfAluno2, valor) {
        return axios
          .post("/tranfer/aluno-aluno", {
            cpfAluno1,
            cpfAluno2,
            valor,
          })
          .then((response) => response.data)
          .catch((error) => error);
      }
      atualizaMoedas(
        this.cpf_Aluno,
        this.form.cpf_AlunoDestino,
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
  },

  mounted() {
    this.quantMoedasAluno();
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
  width: 100px;
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
.NomeAluno p {
  padding-left: 25px;
  color: #ffbf03;
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
.main-carousel h1{
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
.descricao h1{
  text-align: initial;
  padding-bottom: 30px;
}
.descricao p{
  text-align: initial;
  font-family: bebas neue;
  font-size: 2rem;
}
.cards{
  padding-left: 60px;
}
.card-title{
    font-family: bebas neue;
    color: #ffbf03;
    font-size: 1.5rem;
}
.card-text{
    font-family: "Bebas Neue";
    font-size: 1.3rem;
}
.grid-footer {
  display: grid;
  grid-template-rows: auto;
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
.footer h1{
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
        margin:20px
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