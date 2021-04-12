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
                    <b-dropdown-item href="#" to="/" >Sair</b-dropdown-item>
                </b-dropdown>
            </div>

            <b-avatar id="avatar" variant="warning" size="6vh"></b-avatar>

            <div class="info">
            </div>

            <div>

            </div>
        </div>
        
        
        <div class="TrasnfProf">
            <b-card class="card">
                <div>
                    <br>
                    <h1>TRANSFERÊNCIA DE MOEDAS</h1>
                    <input v-model="form.valor_" name="moedasProf" type="text" placeholder=" Digite a quantidade de moedas" required />
                    <input v-model="form.cpf_Aluno" name="moedasProf" type="text" placeholder=" Digite a CPF do aluno" required />
                    <button v-on:click="transfMoedasProfessor" id="button_transf" type="primary">Enviar</button><br />
                    <br/>
                </div>
            </b-card>
        </div>

        <div class="TrasnfProf">
            <b-card class="card2">
                <div>
                    <br>
                    <h1>
                        QUANTIDADE DE MOEDAS
                    </h1>
                    
                    <span v-html="quant_moedas_prof" class="QuantMoedas"></span>
                    
                </div>
                <!-- <button v-on:click="quantMoedasProfessor" id="button_transf" type="primary" ref="myBtn">Atualizar moedas</button><br /> -->
            </b-card>
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
                cpf_Aluno:'',
                valor_: '',
            },

            quant_moedas_prof: '',
            cpf_Professor : localStorage.getItem('cpfProfessor'),
            // cnpj : localStorage.getItem('cnpj')
        }
    },
    
    methods:{

        quantMoedasProfessor:function(){

            function retornaQuantMoeda(cpf) {
                console.log(cpf);
                    return axios.post('/users/moeda-professor', {
                    cpf: cpf         
                    }).then(response => response.data).catch(error => error);
            }

            retornaQuantMoeda(this.cpf_Professor)
                .then(data => {
                    console.log(data.moedas)
                    this.quant_moedas_prof = '<p>' + data.moedas + '</p>'
                })
                .catch(error => console.log(error))
        },

        transfMoedasProfessor:function(){             
            axios
                .post('/tranfer/professor-aluno',{
                cpfProfessor: this.cpf_Professor ,
                cpfAluno: this.form.cpf_Aluno ,
                valor: this.form.valor_ ,       
                })
                .then(function (response) {
                    console.log(response);  
                    if(response.data == "CPF não encontrado")  
                        alert("Aluno não cadastrado no sistema")
                    else if(response.data ==  "Você não tem moedas suficientes")
                        alert("Saldo insificiente para transação")
                    else if(response.data == "Transação não realizada")
                        alert("Não foi possível realizar a transação")
                    else if(response.data == "Transação realizada com sucesso"){
                        alert("Operação realizada com sucesso!")
                        location.reload();
                    }
                }) 
                .catch(function (error) {
                    console.log(error);
                });           
        }              
    },

    mounted(){
        // this.anotherRandomFunction()
        this.quantMoedasProfessor()
    }
  
};

</script>

<style>
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
    #img{
        position: absolute;
        max-width: 17vw;
        max-height: 5vh;   
    }

    #avatar{
        background-color: #ffbf03;
        position: absolute;
        right: 3%;
    }

    .card {
        position: relative;
        transform: translate(0%, 15%);
        background: #f2f2f2;
        border-radius: 20px;
        
    }

    .card2 {
        position: relative;
        transform: translate(0%, 31%);
        background: #f2f2f2;
        border-radius: 20px;
        
    }

    .card h1 {
        font-size: 5vw;
        font-family: "Bebas Neue";
        color: #ffbf03;
    }

    .QuantMoedas{
        font-family: "Bebas Neue";
        font-size: 10vw;
    }

    .TrasnfProf{
        position: relative;
        width: 45%;
        display: inline-block;
        padding: 1%;
    }

    .TrasnfProf input[name="moedasProf"] {
        margin-top: 5%;
        width: 15%;
        margin-left: 2%;
        border-radius: 50px;
        font-family: "Bebas Neue";
        font-size: 20px;
        outline: 0;
        width: 500px;
    }

    #button_transf {
        margin-top: 2.5%;
        width: 20%;
        white-space: normal;
        height: 6vh;
        font-family: "Bebas Neue";
        letter-spacing: 2px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 45%;
        background: #ffbf03;
        border-radius: 6px;
        cursor: pointer;
        color: #fff;
        border: none;
        font-size: 26px;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }

</style>