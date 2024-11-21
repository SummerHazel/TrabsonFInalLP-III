<template>
    <div class="produtos-page">
        <div class="center-container">
            <div class="product-grid">
                <div v-for="(card, index) in cards" :key="index" class="product-card">
                    <q-card class="my-card text-black" style="width: 250px;">
                        <q-img :src="card.imagem" alt="Product Image" style="height: 100px;" />

                        <q-card-section>
                            <div class="text-h6">{{ card.Nome }}</div>
                            <div class="text-subtitle2">{{ card.Descricao }}</div>
                        </q-card-section>

                        <q-card-section class="q-pt-none">
                            <div class="text-h6">{{ card.Valor }}</div>
                        </q-card-section>

                        <q-card-actions>
                            <q-btn label="Adicionar ao Carrinho" color="yellow-9" @click="addToCart(card)" />
                        </q-card-actions>
                    </q-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ProdutosPage',
    data() {
        return {
            cards: [
                {
                    Nome: 'Produto 1',
                    Descricao: 'Descrição do Produto 1',
                    Valor: 'R$ 99,99',
                    imagem: ''
                },
                {
                    Nome: 'Produto 2',
                    Descricao: 'Descrição do Produto 2',
                    Valor: 'R$ 99,99',
                    imagem: ''
                },
                {
                    Nome: 'Produto 3',
                    Descricao: 'Descrição do Produto 3',
                    Valor: 'R$ 99,99',
                    imagem: ''
                },
                {
                    Nome: 'Produto 4',
                    Descricao: 'Descrição do Produto 4',
                    Valor: 'R$ 99,99',
                    imagem: ''
                },
                {
                    Nome: 'Produto 5',
                    Descricao: 'Descrição do Produto 5',
                    Valor: 'R$ 99,99',
                    imagem: ''
                },
                {
                    Nome: 'Produto 6',
                    Descricao: 'Descrição do Produto 6',
                    Valor: 'R$ 99,99',
                    imagem: ''
                },
                {
                    Nome: 'Produto 7',
                    Descricao: 'Descrição do Produto 7',
                    Valor: 'R$ 99,99',
                    imagem: ''
                },
                {
                    Nome: 'Produto 8',
                    Descricao: 'Descrição do Produto 8',
                    Valor: 'R$ 99,99',
                    imagem: ''
                },
            ]
        };
    },
});
</script>

<style scoped>
.produtos-page {
    background-image: url('../assets/SobrePage.jpg');
    background-size: cover;
    height: 100vh;
    color: #000000;
}

.center-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 700px;
}

.product-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    width: 110vh;
}
</style>
