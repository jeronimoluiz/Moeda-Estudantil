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

            <b-avatar id="avatar" variant="warning" size="6vh"></b-avatar>

            <div class="info">
            </div>

            <div>

            </div>
        </div>
    </div>
</template>

<script>

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
</style>