<template>
  <div class="container login">
    <div class="row">
      <!--Logo-->
      <div class="col-12 logo-login">
        <img src="../assets/logo.png" />
      </div>

      <!--Caixa de login-->
      <div class="fornecedor">
        <div class="col-lg-4 col-md-12 col-sm-12">
          <div class="caixa-fornecedor">
            <h1>LOGIN<br>FORNECEDOR</h1>
            <form v-on:submit.prevent="enviar">
              <input
                id="campo"
                v-model="form.cnpj"
                type="text"
                placeholder="CNPJ"
                required
              />
              <input
                id="campo"
                v-model="form.senha"
                type="password"
                placeholder="Senha"
                required
              />
              <button type="primary">Entrar</button>
            </form>
          </div>
          <div class="link">
            Ainda não é fornecedor?
            <router-link to="/register-fornecedor" id="link-cadastrar"
              >Cadastrar</router-link
            >
          </div>
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
        cnpj: "",
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

        axios
          .post("/users/login-loja", {
            cnpj: this.form.cnpj,
            senha: this.form.senha,
          })
          .then(function (response) {
            console.log(response);
            if (response.data.error === 404)
              alert("Dados incorretos, por favor tente novamente!");
            else if (response.data.Cnpj !== "") {
              localStorage.setItem("nome_loja", response.data.NomeDaLoja);
              localStorage.setItem("cnpj", response.data.Cnpj);
              //localStorage.setItem("nome_Aluno", response.data.NOME);
              router.push("/home-fornecedor");
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },
  },
};
</script>

<style>
.fornecedor{
    align-content: center;
    margin-top: 5rem;
    margin-left: 30rem;
}
.login {
  min-height: 85vh;
}
.logo-login {
  padding-top: 40px;
  text-align: center;
}
.logo-login img {
  max-height: 35vh;
  max-height: 10vh;
}
.texto {
  padding-top: 150px;
  font-family: Bebas Neue;
  font-size: 3rem;
  line-height: 7vh;
  color: #ffffff;
  display: none;
  text-align: initial;
}
.texto p:nth-child(3) {
  font-size: 4rem;
  color: #ffbf03;
}
.caixa-fornecedor {
  background: #f2f2f2;
  border-radius: 2vw;
}
.caixa-fornecedor h1 {
  padding: 20px 0px 10px;
  color: #ffbf03;
  font-family: "Bebas Neue";
  font-size: 4rem;
}
#campo {
  display: block;
  margin: 20px auto 45px;
  width: 17rem;
  border-radius: 3rem;
  font-family: "Bebas Neue";
  font-size: 1.2rem;
  padding: 0.8rem;
  border: 0.1rem solid #dddddd;
  outline: 0;
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
.caixa-fornecedor button {
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
@media screen and (min-width: 992px) {
  .logo-login {
    text-align: initial;
  }
  .texto {
    display: block;
  }
}
</style>