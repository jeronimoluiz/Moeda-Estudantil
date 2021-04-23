<template>
    <div class="home">
        <div class="navbar">
            <div class="logo">
                <img id="img" src="../assets/logo.png">
            </div>     
            <div class="drop">
                <b-dropdown size="lg"  variant="link" right toggle-class="text-decoration-none" caret>
                    <template #button-content>
                    </template>
                    <b-dropdown-item href="#" to="/">Sair</b-dropdown-item>
                </b-dropdown>
            </div>
            <div>
                <b-avatar id="avatar" variant="warning" size="6vh"></b-avatar>
            </div>
        </div>
        <div class="d-flex justify-content-center flex-direction: column">
            <b-card class="card">
                <div>
                    <br>
                    <h1>
                        QUANTIDADE DE MOEDAS
                    </h1>
                    
                    <span v-html="quant_moedas_aluno" class="QuantMoedas"></span>
                    
                </div>
                <!-- <button v-on:click="quantMoedasProfessor" id="button_transf" type="primary" ref="myBtn">Atualizar moedas</button><br /> -->
            </b-card>
        </div>
    </div>
</template>

<script>
import axios from "../service/config.js";
// import router from "../router"

export default {
    
    data() {
        return {
            quant_moedas_aluno: '',
            cpfAluno : localStorage.getItem('cpfAluno'),
            // cnpj : localStorage.getItem('cnpj')
        }
    },
    
    methods:{
        quantMoedasAluno:function(){

            function retornaQuantMoeda(cpf) {
                console.log(cpf);
                    return axios.post('/users/moeda-aluno', {
                    cpf: cpf         
                    }).then(response => response.data).catch(error => error);
            }

            retornaQuantMoeda(this.cpfAluno)
                .then(data => {
                    console.log(data.moedas)
                    this.quant_moedas_aluno = '<p>' + data.moedas + '</p>'
                })
                .catch(error => console.log(error))
        },
    },

    mounted(){
        this.quantMoedasAluno()
    }
  
};

</script>

<style>
    .card {
    position: relative;
    width:30vw;
    margin-top: -10.5vh;
    transform: translate(0vw, 34vh);
    background: #f2f2f2;
    border-radius: 20px;
    /* font-family: "Bebas Neue"; */
    }

    .card h1 {
        font-size: 3vw;
        font-family: "Bebas Neue";
        color: #ffbf03;
    }

    .home{
        background-color: #fff;
        width: 100vw;
        height: 100vh;
    }

    .navbar{
        background-color: #00abf1;
        width: 100vw;
        height: 8vh;
    }
    
    .logo{
        position: absolute;
        left: 1%;
        margin-top: -5vh;
    }
    .drop{
        position: absolute;
        right: 0%;
    }

    .QuantMoedas{
        font-family: "Bebas Neue";
        font-size: 5vw;
    }

    .d-flex justify-content-center flex-direction:column {  /* Quantidade de moedas Aluno */
        position: absolute;
        width: 30vw;
        /* display: inline-block;
        padding: 1vw; */
    }

    #img{
        position: absolute;
        max-width: 17vw;
        max-height: 5vh;   
    }

    #avatar{
        background-color: #ffbf03;
        position: absolute;
        right: 3%;
        bottom:13%;
    }
</style>