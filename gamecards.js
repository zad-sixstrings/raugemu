const GAMES_DATA = [
    // FEATURED
    {
        title: "Super Mario World",
        boxArtPath: "docs/boxart/smw.png",
        year: "1990",
        console: "SNES",
        developer: "Nintendo",
        romPath: "ROM/smw.sfc",
        categories: ["featured"]  
    },
    {
        title: "Super Metroid",
        boxArtPath: "docs/boxart/supermetroid.jpg",
        year: "1994",
        console: "SNES",
        developer: "Nintendo",
        romPath: "ROM/supermetroid.sfc",
        categories: ["featured"]  
    },
    {
        title: "The Legend of Zelda: A Link to the Past",
        boxArtPath: "docs/boxart/alttp.jpg",
        year: "1991",
        console: "SNES",
        developer: "Nintendo",
        romPath: "ROM/alttp.sfc",
        categories: ["featured"]  
    },
    {
        title: "1080° Snowboarding",
        boxArtPath: "docs/boxart/1080.jpg",
        year: "1998",
        console: "SNES",
        developer: "Nintendo",
        romPath: "ROM/1080.z64",
        categories: ["featured"] 
    },
    {
        title: "Tetris",
        boxArtPath: "docs/boxart/tetris.jpg",
        year: "1989",
        console: "SNES",
        developer: "Blue Planet Software",
        romPath: "ROM/tetris.nes",
        categories: ["featured"] 
    },
    {
        title: "Soul Blade",
        boxArtPath: "docs/boxart/soulblade.jpg",
        year: "1995",
        console: "PS1",
        developer: "Namco",
        romPath: "ROM/PS1/soulblade.chd",
        categories: ["featured"] 
    },

    // POKEMON EXTRAVAGANZA
    {
        title: "Pokémon Vert Feuille",
        boxArtPath: "docs/boxart/pkmnvf.jpg",
        year: "2004",
        console: "GBA",
        developer: "Nintendo",
        romPath: "ROM/pkmnvf.gba",
        categories: ["pokemon"] 
    },
    {
        title: "Pokemon Or",
        boxArtPath: "docs/boxart/pkmnor.jpg",
        year: "1999",
        console: "GBC",
        developer: "Nintendo",
        romPath: "ROM/pkmnor.gbc",
        categories: ["pokemon"] 
    },
    {
        title: "Pokémon Emeraude",
        boxArtPath: "docs/boxart/pkmnemeraude.jpg",
        year: "2004",
        console: "GBA",
        developer: "Nintendo",
        romPath: "ROM/pkmnemeraude.gba",
        categories: ["pokemon"] 
    },
    {
        title: "Pokémon Crystal",
        boxArtPath: "docs/boxart/pkmncrystal.jpg",
        year: "2000",
        console: "GBC",
        developer: "Nintendo",
        romPath: "ROM/pkmncrystal.gbc",
        categories: ["pokemon"] 
    },

    // RETOUR VERS LE FUTUR
    {
        title: "Dragonfire",
        boxArtPath: "docs/boxart/dragonfire.jpg",
        year: "1982",
        console: "Atari 2600",
        developer: "Imagic",
        romPath: "ROM/dragonfire.a26",
        categories: ["retourverslefutur"] 
    },
    {
        title: "Asteroids",
        boxArtPath: "docs/boxart/asteroids.jpg",
        year: "1981",
        console: "Atari 2600",
        developer: "Atari",
        romPath: "ROM/asteroids.a26",
        categories: ["retourverslefutur"] 
    },
    {
        title: "Demon Attack",
        boxArtPath: "docs/boxart/demonattack.jpg",
        year: "1982",
        console: "Atari 2600",
        developer: "Imagic",
        romPath: "ROM/demonattack.a26",
        categories: ["retourverslefutur"] 
    },
    {
        title: "Adventure",
        boxArtPath: "docs/boxart/adventure.png",
        year: "1980",
        console: "Atari 2600",
        developer: "Atari",
        romPath: "ROM/adventure.a26",
        categories: ["retourverslefutur"] 
    },
    {
        title: "Pitfall!",
        boxArtPath: "docs/boxart/pitfall.jpg",
        year: "1982",
        console: "Atari 2600",
        developer: "Activision",
        romPath: "ROM/pitfall.a26",
        categories: ["retourverslefutur"] 
    }
];

class GameCardsManager {
    constructor() {
        // Map to store container references
        this.containers = new Map([
            ['featured', document.querySelector('#featured-games #featured-container')],
            ['pokemon', document.querySelector('#pokemon-games #featured-container')],
            ['retourverslefutur', document.querySelector('#retour-vers-le-futur #featured-container')],
            ['pa', document.querySelector('#pa #featured-container')] 
        ]);
    }

    createGameCard(gameData) {
        const card = document.createElement('div');
        card.id = 'card';
        
        card.innerHTML = `
            <div class="card-wrapper">
                <h3 class="game-title center">
                    <div class="game-title-content">
                        ${gameData.title}
                    </div>
                </h3>
                <div class="game-content">
                    <img class="boxart" src="${gameData.boxArtPath}" alt="Box art">
                    <span class="gameinfo">${gameData.year} - ${gameData.console}</span>
                    <span class="gameinfo">${gameData.developer}</span>
                </div>
                <div class="play-button" data-game="${gameData.romPath}">
                    <p class="play-button-text center">PLAY</p>
                </div>
            </div>
        `;

        return card;
    }

    renderGameCards() {
        // Clear and render each container
        this.containers.forEach((container, category) => {
            if (container) {
                container.innerHTML = ''; // Clear existing content
                
                // Filter games for this category
                const gamesToRender = GAMES_DATA.filter(game => 
                    game.categories && game.categories.includes(category)
                );
                
                // Create and append each game card
                gamesToRender.forEach(gameData => {
                    const card = this.createGameCard(gameData);
                    container.appendChild(card);
                });
            }
        });
    }

    addNewGame(gameData) {
        GAMES_DATA.push(gameData);
        this.renderGameCards(); // Refresh all containers
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const gameCardsManager = new GameCardsManager();
    gameCardsManager.renderGameCards();
    
    // Initialize the EmulatorManager after rendering cards
    new EmulatorManager();
});