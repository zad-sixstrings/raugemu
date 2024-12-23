<template>
    <div class="featured-games-title-wrapper">
        <h2 class="featured-games-title">SELECTION</h2>
    </div>
    <div id="content">
        <div id="featured-games">
            <div id="featured-container">
                <div v-for="game in featuredGames" :key="game.title" class="game.card">
                    <h3>{{ game.title }}</h3>
                    <img :src="game.boxArtPath" alt="Box Art">
                    <p>{{ game.year }} - {{ game.console }}</p>
                    <p>{{ game.developer }}</p>
                    <button @click="playGame(game.romPath)">Play</button>
                </div>
            </div>
        </div>
    </div>

    <div class="featured-games-title-wrapper">
        <h2 class="featured-games-title">POKEMON EXTRAVAGANZA</h2>
    </div>
    <div id="content">
        <div id="pokemon-games">
            <div id="featured-container">
                <div v-for="game in pokemon" :key="game.title" class="game.card">
                    <h3>{{ game.title }}</h3>
                    <img :src="game.boxArtPath" alt="Box Art">
                    <p>{{ game.year }} - {{ game.console }}</p>
                    <p>{{ game.developer }}</p>
                    <button @click="playGame(game.romPath)">Play</button>
                </div>
            </div>
        </div>
    </div>

    <div class="featured-games-title-wrapper">
        <h2 class="featured-games-title">RETOUR VERS LE FUTUR</h2>
    </div>
    <div id="content">
        <div id="retour-vers-le-futur">
            <div id="featured-container">
                <div v-for="game in retourVersLeFutur" :key="game.title" class="game.card">
                    <h3>{{ game.title }}</h3>
                    <img :src="game.boxArtPath" alt="Box Art">
                    <p>{{ game.year }} - {{ game.console }}</p>
                    <p>{{ game.developer }}</p>
                    <button @click="playGame(game.romPath)">Play</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            featuredGames: [],
            pokemon: [],
            retourVersLeFutur: []
        };
    },
    mounted() {
        this.loadGamesData();
    },
    methods: {
        async loadGamesData() {
            try {
                const response = await fetch('./src/games.json');
                const gamesData = await response.json();

                this.featuredGames = gamesData.filter(game => game.categories.includes('featured'));
                this.pokemon = gamesData.filter(game => game.categories.includes('pokemon'));
                this.retourVersLeFutur = gamesData.filter(game => game.categories.includes('retourverslefutur'))
            } catch (error) {
                console.error('Failed to load games data:', error);
            }
        }
    },
};
</script>