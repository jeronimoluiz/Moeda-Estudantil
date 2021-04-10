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
                    <b-dropdown-item href="#">Sair</b-dropdown-item>
                </b-dropdown>
            </div>
            <div>
                <b-avatar id="avatar" variant="warning" size="6vh"></b-avatar>
            </div>
        </div>
        <div class="d-flex justify-content-center flex-direction: column">
            <div class="card">
                 A 5ª série não tem medo de morrer
            </div>
        </div>
    </div>
</template>

<script>

</script>

<style>
    .card {
    position: relative;
    width:30vw;
     transform: translate(0vw, 40vh);
    background: #f2f2f2;
    border-radius: 20px;
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