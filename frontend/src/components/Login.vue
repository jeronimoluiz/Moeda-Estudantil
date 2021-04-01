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

</script>

<style>
  .login{
    position: relative;    
  }

  .logo{
    position: absolute;
    transform: translate(15%, 30%);
    width: 346px;
    height: 125px;
    
  }

  .caixa {
    position: absolute;
    transform: translate(350%, 25%);
    background: #F2F2F2;
    border-radius: 20px;
    width: 420px;
    height: 650px;   
  }

.texto{
    position: absolute;
    transform: translate(30%, 150%);
    width: 748px;
    height: 243px;
    

    font-family: Bebas Neue;
    font-style: normal;
    font-weight: normal;
    font-size: 64px;
    line-height: 77px;

    color: #FFFFFF;
  }

  .link{
    position: absolute;
    transform: translate(530%, 2900%);
    width: 288px;
    height: 29px;
    
    font-family: Bebas Neue;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 29px;

    color: #FFFFFF;
  }
  
  #img{
    max-width: 350px;
    max-height: 125px;
    width: auto;
    height: auto;
  }
  .login h1{
    text-align: center;
    color: #ffbf03;
    font-size: 60px;
    padding: 50px 0 70px 0;
    font-family: 'Bebas Neue';
  }
  .login input[type="password"],
  .login input[type= "text"]{
    width: 100%;
    padding: 15px;
    border: 1px solid #dddddd;
    margin-bottom: 55px;        
    box-sizing: border-box;
  }
  .login input[name = "cpf"]{
    width: 80%;
    margin-right: 5%;
    border-radius: 50px;
    font-family: 'Bebas Neue';  
    font-size : 20px;
  }
  .login input[name = "senha"]{
    width: 80%;
    margin-right: 5%;
    border-radius: 50px;
    font-family: 'Bebas Neue';
    font-size : 20px;
  }
  #botão{
    width: 50%;
    white-space: normal;
    height: 6vh;
    font-family: 'Bebas Neue';
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 27%;
    background:#ffbf03;
    border-radius: 6px;
    cursor: pointer;
    color: #fff;
    border: none;
    font-size: 26px;
    margin-top: 55px;    
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  
  #amarelo{
    font-size: 72px;
    line-height: 86px;

    color: #ffbf03;
  }

  #link-cadastrar{
    color: #ffbf03;
  }
</style>
