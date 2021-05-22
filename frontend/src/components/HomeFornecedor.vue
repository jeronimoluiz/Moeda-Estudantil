<template>
  <div class="home-fornecedor">
    <div class="grid">
      <header class="header">
        <div class="logo-homeForn">
          <img src="../assets/logo.png" alt="Logo" />
        </div>
        <div class="infos">
          <div class="forn-infos">
            <span class="NomeForn">{{ nome_Forn }} </span>
          </div>
          <b-dropdown
            size="lg"
            variant="link"
            toggle-class="text-decoration-none"
            no-caret
          >
            <template #button-content>
              <b-avatar id="avatar" variant="warning" size="3.5rem"></b-avatar>
              <span class="sr-only">Search</span>
            </template>
            <b-dropdown-item href="#" to="/">Sair</b-dropdown-item>
          </b-dropdown>
        </div>
      </header>
    </div>
    <div class="container main-forn">
      <div class="row">
        <div class="col-12 main-cadastra">
          <h1>Cadastrar Produto</h1>
          <form class="cadastro-produto" method="post">
            <div class="field">
              <label for="nome">Nome do Produto:</label>
              <input type="text" id="nome" name="nome" placeholder="Digite o nome do produto" required/>
            </div>
            <div class="field">
              <label for="desc">Descrição do produto: </label>
              <textarea name="desc" id="desc" placeholder="Digite a descrição do produto" required></textarea>
            </div>
            <div class="field">
              <label for="preco">Preço: </label>
              <input type="number" name="preco" id="preco" placeholder="Valor minimo - 50 | Valor maximo - 10000" min="50" max="10000" required/>
            </div>
            <div class="fieldFoto">
                <label for="">Imagem:</label><br>
                <label for="foto-capa" id="labelFoto" class="labelfoto">Escolher aquivo</label>
                <input type="file" name="foto-capa" id="foto-capa" required>
            </div>
            <input type="submit" name="enviar" value="Enviar">
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file1: null,
      file2: null,
    };
  },
};
</script>

<style>
.home-fornecedor {
  background-color: rgb(57, 26, 119);
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
  background-color: rgb(117, 118, 211);
  height: 70px;
  padding: 0px 24px 0px 40px;
}
.logo-homeForn {
  display: flex;
  -webkit-box-flex: 1;
  flex-grow: 1;
  -webkit-box-pack: start;
  justify-content: flex-start;
}
.logo-homeForn img {
  width: 120px;
}
.infos {
  display: flex;
  align-self: start;
  align-items: flex-start;
}
.forn-infos {
  padding-top: 15px;
}
.NomeForn {
  padding-left: 25px;
  color: #ffbf03;
  font-family: "Bebas Neue";
  font-size: 1.3rem;
}
#avatar {
  background-color: #ffbf03;
}
.main-forn {
  padding-top: 70px;
}
.main-cadastra h1 {
  text-align: center;
  padding-top: 20px;
  font-size: 3rem;
  font-family: "Bebas Neue";
  color: #ffbf03;
}
.cadastro-produto{
    padding-top: 50px;
}
.field{
    padding-bottom: 20px;
    width: 100%;
    margin: 15px 0;
}
.field label{
    padding-left: 10px;    
    display: block;
    width: 100%;
    font-family: "Bebas Neue";
    color: #ffbf03;
    font-size: 2rem;
}

.fieldFoto{    
    padding-left: 10px;    
    display: block;
    width: 100%;
    font-family: "Bebas Neue";
    color: #ffbf03;
    font-size: 2rem;
}

input[type=text],
input[type=number],
textarea{
    width: 50%;
    padding-left: 10px;
    height: 50px;
    line-height: 30px;
    border-radius: 15px;
    border: 1px solid #ccc;
    outline: none;
}
input[type=file]{
    display: none;
}

.labelfoto{   
    width: 51%;
    padding-left: 10px;
    color:rgb(255, 255, 255);
    background-color: rgb(26, 24, 24);
    border-radius: 15px;
    cursor: pointer;
}

#nome{
    text-align: center;
    font-size: 1.2rem;
}

#desc{
    text-align: center;
    font-size: 1.2rem;
}

#preco{
   text-align: center;
   font-size: 1.2rem;
}

textarea{
    line-height: 70px;
    padding: 10px;
    height: 90px;
    resize: none;
}

input[type=submit]{
    background-color: #ccc;
    color:blueviolet;
    height: 35px;
    border: none;
    outline: 0;
    cursor: pointer;
    width: 200px;
    text-align: center;
    border-radius: 15px;
    margin-top: 40px;
    font-size: 1.2rem;
}

</style>