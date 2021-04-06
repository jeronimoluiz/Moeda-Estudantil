<template>
  <div class="login">

    <!--div para a imagem no topo-->
    <div class="logo">
      <img id="img" src="../assets/logo.png">
    </div>

    <!--div para o texto-->
    <div class="texto">
      <p>Receba moedas ao realizar tarefas</p>
      <p>Troque com seus amigos</p>
      <p id="amarelo">Resgate recompensas</p>
    </div>

    <!--div para caixa de login-->
    <div class="caixa">
      <h1>LOGIN</h1>
      <form action="auth" method="POST">
        <input type="text" name="cpf" placeholder="CPF" required>
        <input type="password" name="senha" placeholder="Senha" required>
        <button id = "botão" type="primary">Entrar</button>
         <div class = "titulo-botao">
          Eu sou um:
         </div>
     <b-form-group v-slot="{ ariaDescribedby }">
          <b-form-radio-group
           class = "botao-aluno"
           :options=" options_radio"
           v-model="selected_radio"
           :aria-describedby="ariaDescribedby"
           name="plain-inline"
           plain
         ></b-form-radio-group>
      </b-form-group>
      </form>
    </div>    

    <!--div para o link do cadastro-->
    <div class="link">
      Ainda não tem cadastro?
      <router-link to="/register" id="link-cadastrar">Cadastrar</router-link>
    </div>
  </div>

  
</template>

<script>
  export default {
    data() {
      return {       
        selected_radio: 'first',
        options_radio:[
          { text: 'Aluno', value: 'first' },
          { text: 'Professor', value: 'second' }
        ]
      }
    }
  }
</script>

<style>
  .login{
    position: relative;    
  }

  .logo{
    position: absolute;
    left: 3%;
    margin-top:3vw;
      
  }

  .caixa {
    position: absolute;
    margin-top:6vw;
    left: 73%;

    background: #F2F2F2;
    border-radius: 2vw;

    width: 20vw;
    height: 65vh;   
  }

 .texto{
    position: absolute;       
    margin-top:16vw;    
    margin-left:0vw;
    left: 15%;
    width: 40vw;    

    font-family: Bebas Neue;
    font-style: normal;
    font-weight: normal;
    font-size: 3vw;
    line-height: 7vh;

    color: #FFFFFF;
  }

  .link{
    position: absolute;
    margin-top:39vw;
    margin-left:3vw;
    left: 72.5%;
    width: 15vw;
    
    font-family: Bebas Neue;
    font-style: normal;
    font-weight: normal;
    font-size: 1vw;
    line-height: 2vh;
    color: #FFFFFF;
  }
  
  #img{
    position: absolute;
    max-width: 35vw;
    max-height: 10vh;   
  }

  .login h1{    
    color: #ffbf03;
    position: absolute;
    left: 33%;   
    margin-top:2vw;
    width: 1vw;
    margin-right: 1vw;
    border-radius: 3vw;
    font-family: 'Bebas Neue';  
    font-size : 4vw;
  }

  .login input[type="password"],
  .login input[type= "text"]{     
    position: absolute;
    padding: 0.8vw;
    border: 0.1vw solid #dddddd;
    margin-bottom: 2vw;        
    box-sizing: border-box;
  }

  .login input[name = "cpf"]{
    position: absolute;
    left: 9%;   
    margin-top:9vw;
    width: 17vw;
    margin-right: 10vw;
    border-radius: 3vw;
    font-family: 'Bebas Neue';  
    font-size : 1.2vw;
  }

  .login input[name = "senha"]{    
    position: absolute;
    left: 9%;
    margin-top:15vw;
    width: 17vw;
    margin-right: 1vw;
    border-radius: 3vw;
    font-family: 'Bebas Neue';
    font-size : 1.2vw;
  }

  #botão{
    position: absolute;
    left: 2%;    
    width: 9vw;
    white-space: normal;
    height: 6vh;
    font-family: 'Bebas Neue';
    letter-spacing: 0vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 5.5vw;
    background:#ffbf03;
    border-radius: 6vw;
    cursor: pointer;
    color: #fff;
    border: none;
    font-size: 1.5vw;
    margin-top: 27vw;    
    box-shadow: 0vw 0.1vw 0vw 0.01vw rgba(0, 0, 0, 0.25);
  }
  
  #amarelo{
    font-size: 3vw;
    color: #ffbf03;
  }
 
  .botao-aluno{
    margin-top:23vw;
    font-family: 'Bebas Neue';
    font-size: 2.5vh;
    color: #757575;
  }

  .titulo-botao{
    position: absolute;
    margin-top:20vw;
    left: 35%;    
    font-family: 'Bebas Neue';
    font-size: 4vh;
    color: #ffbf03
  }

  #link-cadastrar{
    color: #ffbf03;
  }
</style>
