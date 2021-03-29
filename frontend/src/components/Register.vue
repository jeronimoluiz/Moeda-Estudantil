<template>
  <div class="login">
    <h1>Cadastro</h1>
    <form action="auth" method="POST">
      <input type="text" name="nome" placeholder="Nome" required>
      <input type="text" name="user" placeholder="Usuário" required>
      <input type="password" name="password" placeholder="Senha" required>
      <button id = "botão" type="primary">Cadastrar</button><br>
      <br>
      <a href="" id="esquerda">Esqueci minha senha</a>
      <router-link to="/login" id="direita">Login</router-link>
    </form>
  </div>
</template>

<script>

</script>

<style>

  .login {
    width: 300px;
    margin: 0 auto;
    font-family: Tahoma, Geneva, sans-serif;
  }
  .login h1{
    text-align: center;
    color: #2c3e50;
    font-size: 24px;
    padding: 20px 0 20px 0;
  }
  .login input[type="password"],
  .login input[type= "text"]{
    width: 100%;
    padding: 15px;
    border: 1px solid #dddddd;
    margin-bottom: 15px;
    box-sizing: border-box;
  }
  #botão{
    width: 100%;
    font-weight: bold;
    background: #008080;
    border-radius: 6px;
    padding: 15px;
    cursor: pointer;
    color: #fff;
    border: none;
    font-size: 16px;
  }
  #esquerda{
    color: #2c3e50;
    padding: 0 110px 0 0;
    font-family: Tahoma, Geneva, sans-serif;
  }
  #direita{
    color: #2c3e50;
    font-family: Tahoma, Geneva, sans-serif;
  
  }
</style>
