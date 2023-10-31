<template>
    <div class="container mt-3">
    
        <div class="row">
    
            <div class="col-sm-12">
    
                <h2>Visitantes</h2>
                <hr>
    
    
            </div>
    
        </div>
    
        <div class="row sub-contnainer">
    
            <div class="col-sm-3">
    
                <b-button :callback="adicionarPessoa" value="Adicionar visitante">Cadastrar Visitante</b-button>
                <input type="text" class="form-control" placeholder="Pesquisa" aria-label="Pesquisa" aria-describedby="basic-addon1" v-model="filtro" />
            </div>
    
        </div>
    
        <div class="row">
    
            <div class="col-sm-12">
    
                <div class="modal-mask" v-if="showModal">
                    <div class="modal-wrapper">
                        <div class="modal-container">
                            <div class="modal-header">
                                <br>
                                <h3>Adicionar Nova Visita</h3>
                                <hr><br>
    
                                <b-button class="modal-default-button" @click="fecharModal"></b-button>
                            </div>
                            <div class="modal-body">
                                <div class="box-modal">
                                    <h5>Observação</h5><br>
                                    <textarea for="observacao" rows="2" col="20"></textarea><br>
                                    <div class="box-setores">
                                        <h5>Setor</h5>
    
                                        <tr v-for="item in setores" :key="item.id">
                                            <td>
                                                <input v-model="setoresVisitante" type="checkbox" :value="item.id">
                                            </td>
                                            <td>{{ item.nome }}</td>
                                        </tr>
    
                                    </div>
                                    <div class="box-setores "> 
                                        <h5>Validade</h5><br>
                                        <input type="number"><label>Dias</label>
                                        <input type="number"><label>Horas</label>
                                        <input type="number"><label>Minutos</label>
                                    </div>
                                    <br>
    
    
                                </div>
                                <br>
                            </div>
                        </div>
                    </div>
                </div>
    
                <table class="table table-hover">
    
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>CPF</th>
                            <th>Sexo</th>
                            <th>Data de nascimento</th>
                            <th>Celular</th>
                            <th>E-mail</th>
                            <th>QR-Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item of pessoas" :key="item.id" v-show="(item.visitante == 1)">
                            <!-- v-show para trazer somente as pessoas marcadas como visitantes (visitante = 1) -->
                            <td>{{ item.nomeCompleto }}</td>
                            <td>{{ item.CPF }}</td>
                            <td>{{ item.sexo }}</td>
                            <td>{{ item.dtNasc }}</td>
                            <td>{{ item.celular }}</td>
                            <td>{{ item.email }}</td>
                            <td>
                                <b-button @click="abrirModal" style="background-color: var(--cor-secundaria);"><i class="fa-solid fa-qrcode"></i></b-button>
                            </td>
                            <td>
                                <i @click="editarPessoa(item)" class="fa fa-edit icones-tabela"></i>
                                <i @click="excluirPessoa(item)" class="fa fa-trash icones-tabela"></i>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import pessoaService from '@/service/pessoa-service';
import Pessoa from '../models/pessoa-model'
import Setores from '../models/setor-model'
import setorService from '@/service/setor-service';
//import conversorDeData from '@/utils/conversor-data'


export default {

    name: 'VisitanteView',
    components: {

    },
    data() {
        return {
            pessoas: [],
            showModal: false,
            filtro: '',
            setores: [],
            setoresVisitante: []
        }
    },

    computed: {
        // pessoasFiltradas() {
        //     return this.acessos.filter(pessoa => {
        //         const buscaPessoa = this.filtro.toLowerCase();
        //         return (
        //             (pessoa.nomeCompleto && pessoa.nomeCompleto.toLowerCase().includes(buscaPessoa)) ||
        //             (pessoa.CPF && pessoa.CPF.toLowerCase().includes(buscaPessoa)) ||
        //             (pessoa.sexo && pessoa.sexo.toLowerCase().includes(buscaPessoa))

        //             /* continuar daqui */
        //         );
        //     });
        // },
    },

    methods: {

        obterSetores() {
            setorService.obterTodos()
                .then((response) => {
                    this.setores = response.data.data.map((p) => new Setores(p));
                    //console.log(this.setores)
                })
                .catch(error => {
                    console.log(error)
                })
        },

        ordenarPessoas(a, b) {
            return (a.id < b.id) ? -1 : (a.id > b.id) ? 1 : 0;
        },

        obterTodasPessoas() {
            pessoaService
                .obterTodos()
                .then(response => {

                    let pessoas = response.data.data.map(p => new Pessoa(p));

                    this.pessoas = pessoas.sort(this.ordenarPessoas).reverse();

                    console.log(pessoas);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        adicionarPessoa() {
            this.$router.push({ name: "NovoVisitante" })
        },
        editarPessoa(pessoa) {
            this.$router.push({ name: "EditarVisitante", params: { id: pessoa.id } })
        },

        excluirPessoa(id) {

            this.resultado.splice(this.resultado.indexOf(id), 1)

        },

        abrirModal() {
            this.showModal = true;
        },

        fecharModal() {
            this.showModal = false;
        },

    },



    mounted() {

        this.obterTodasPessoas();
        this.obterSetores();

    },

}
</script>

<style>
.box-setores{
    margin: auto;
    border: 1px solid #ddd;
    margin-top: 10px;
    padding: 20px;
    border-radius: 20px;
}


.box-modal {
    margin: auto;
    border: 1px solid #ddd;
    margin-top: 10px;
    padding: 30px;
    border-radius: 20px;
}

.icones-tabela {
    margin: 5px;
    color: var(--cor-primaria);
    cursor: pointer;
}

.modal-mask {
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-wrapper {
    width: 400px;
}

.modal-container {
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
    margin-top: 5px;
    color: var(--cor-primaria);
}

.modal-body {
    margin: 20px ;
}

.modal-default-button {
    float: right;
}

.modal-enter {
    opacity: 0;
}

.modal-leave-active {
    opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>