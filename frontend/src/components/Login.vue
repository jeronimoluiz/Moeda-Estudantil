<template>
  <div class="container login">
    <div class="row">
      <!--Logo-->
      <div class="col-12 logo-login">
        <img src="../assets/logo.png" />
      </div>
      <!--Texto-->
      <div class="col-lg-8 texto">
        <p>Receba moedas ao realizar tarefas</p>
        <p>Troque com seus amigos</p>
        <p>Resgate recompensas</p>
      </div>
      <!--Caixa de login-->
      <div class="col-lg-4 col-md-12 col-sm-12">
        <div class="caixa">
          <h1>LOGIN</h1>
          <form v-on:submit.prevent="enviar">
            <input id="campo" v-model="form.cpf" type="text" placeholder="CPF" required />
            <input id="campo" v-model="form.senha" type="password" placeholder="Senha" required />
            <p class="titulo-botao">Eu sou um:</p>
            <b-form-group v-slot="{ ariaDescribedby }">
              <b-form-radio-group class="botao-aluno" :options="options_radio" v-model="selected_radio" :aria-describedby="ariaDescribedby" name="plain-inline" plain></b-form-radio-group>
            </b-form-group>
            <button type="primary">Entrar</button>
          </form>
        </div>
        <div class="link">
          Ainda não tem cadastro?
          <router-link to="/register" id="link-cadastrar"
            >Cadastrar</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../service/config.js";
import router from "../router";

export default {
  data() {
    return {
      form: {
        cpf: "",
        senha: "",
      },
      selected_radio: "first",
      options_radio: [
        { text: "Aluno", value: "first" },
        { text: "Professor", value: "second" },
      ],
    };
  },
  methods: {
    enviar: function () {
      console.log("Verificando...");
      if (this.selected_radio == "first") {
        axios
          .post("/users/login-aluno", {
            cpf: this.form.cpf,
            senha: this.form.senha,
          })
          .then(function (response) {
            console.log(response);
            if (response.data.error === 404)
              alert("Dados incorretos, por favor tente novamente!");
            else if (response.data.CPFALUNO !== "") {
              localStorage.setItem("cpfAluno", response.data.CPFALUNO);
              localStorage.setItem("cnpj", response.data.CNPJUNIVERSIDADE);
              router.push("/home-aluno");
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        axios
          .post("/users/login-professor", {
            cpf: this.form.cpf,
            senha: this.form.senha,
          })
          .then(function (response) {
            console.log(response);
            if (response.data.error === 404)
              alert("Dados incorretos, por favor tente novamente!");
            else if (response.data.CPFPROFESSOR !== "") {
              localStorage.setItem("cpfProfessor", response.data.CPFPROFESSOR);
              localStorage.setItem("cnpj", response.data.CNPJUNIVERSIDADE);
              router.push("/home-professor");
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style>
  .login{
    min-height: 85vh;
  }
  .logo-login{
    padding-top: 40px;
    text-align: center;
  }
  .logo-login img{
    max-height: 35vh;
    max-height: 10vh;
  }
  .texto{
    padding-top: 150px;
    font-family: Bebas Neue;
    font-size: 3rem;
    line-height: 7vh;
    color: #ffffff;
    display: none;
    text-align: initial;
  }
  .texto p:nth-child(3){
    font-size: 4rem;
    color: #ffbf03;
  }
  .caixa{
    background: #f2f2f2;
    border-radius: 2vw;
  }
  .caixa h1{
    padding: 20px 0px 10px;
    color: #ffbf03;
    font-family: "Bebas Neue";
    font-size: 4rem;
  }
  #campo{
    display: block;
    margin: 20px auto 45px;
    width: 17rem;
    border-radius: 3rem;
    font-family: "Bebas Neue";
    font-size: 1.2rem;
    padding: 0.8rem;
    border: 0.1rem solid #dddddd;
  }
  .titulo-botao {
    font-family: "Bebas Neue";
    font-size: 2rem;
    color: #ffbf03;
  } 
  .botao-aluno {
    font-family: "Bebas Neue";
    font-size: 1.5rem;
    color: #757575;
  }
  .caixa button{
    height: 6vh;
    font-family: "Bebas Neue";
    background: #ffbf03;
    border-radius: 6vw;
    cursor: pointer;
    color: #fff;
    border: none;
    font-size: 1.5rem;
    width: 9rem;
    margin: 30px auto;
    box-shadow: 0vw 0.1vw 0vw 0.01vw rgba(0, 0, 0, 0.25);
  }
  .link {
    padding-top: 20px;
    font-family: Bebas Neue;
    font-size: 1.5rem;
    color: #ffffff;
  }
  #link-cadastrar {
  color: #ffbf03;
}
@media screen and (min-width: 992px){
  .logo-login{
    text-align: initial;
  }
  .texto{
    display: block;
  }
}
</style>