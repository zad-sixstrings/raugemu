<template>
  <div>
    <section>
      <h3>Boutons par défaut</h3>
      <p>
        Le site supporte nativement un grand nombre de contrôleurs. Pour une
        expérience optimale, nous recommandons d'utiliser une manette Bluetooth
        ou USB. Les boutons seront automatiquement mappés de la façon la plus
        logique possible, en se basant sur leur position sur la manette.
      </p>
      <p>
        Par exemple, sur une manette Xbox, <span class="xbox-a">A</span> (bouton
        sud) sera le bouton principal d'action. Sur une manette Nintendo, ce
        sera <span class="nintendo-a">A</span> (bouton est). Sur une
        Playstation, ce sera <span class="playstation-x">X</span> (bouton sud).
      </p>
      <p>
        Attention toutefois, pour les jeux Playstation japonais, les contrôles
        suivent le schéma Nintendo, et le bouton principal d'action devient
        alors
        <span class="playstation-o">O</span> (bouton est) au lieu de
        <span class="playstation-x">X</span> (bouton sud).
      </p>
    </section>

    <section>
      <h3>Mapping Playstation</h3>
      <p>
        Le menu de mapping par défaut d'EmulatorJS pour la Playstation n'a pas
        encore été corrigé et affiche des entrées eronnées en ce qui concerne
        les boutons d'action. Suivez ce guide pour mapper les boutons d'action
        selon vos préférences:
      </p>
      <div class="mapping-image">
        <img
          src="/assets/psxmapping.png"
          alt="Guide de mapping PSX"
          @error="handleImageError"
        />
      </div>
    </section>

    <section>
      <h3>Guide des contrôleurs</h3>
      <p>
        Voici un aperçu des contrôleurs originaux pour chaque console
        disponible. Utilisez ces images comme référence pour mapper vos boutons
        si nécessaire. Cliquez sur une image pour l'agrandir.
      </p>
      <SearchBar v-model="searchQuery" />
      <div class="controllers-grid">
        <div
          v-for="console in filteredConsoles"
          :key="console.id"
          class="controller-card"
          @click="openImage(console)"
        >
          <h4>{{ console.name }}</h4>
          <img
            :src="`/assets/controllers/${console.id}.jpg`"
            :alt="`Contrôleur ${console.name}`"
            @error="handleImageError"
          />
        </div>
      </div>
    </section>
    <ImagePopup
      :is-visible="!!selectedMapping"
      :image-src="selectedMapping?.src || ''"
      :image-alt="selectedMapping?.alt || ''"
      @close="selectedMapping = null"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import SearchBar from "./SearchBar.vue";
import ImagePopup from "./PediaControllerPopUp.vue";

const searchQuery = ref("");
const selectedMapping = ref<{ src: string; alt: string } | null>(null);

const consoles = [
  { id: "nes", name: "Nintendo NES" },
  { id: "snes", name: "Super Nintendo" },
  { id: "n64", name: "Nintendo 64" },
  { id: "gb", name: "Game Boy" },
  { id: "gbc", name: "Game Boy Color" },
  { id: "gba", name: "Game Boy Advance" },
  { id: "nds", name: "Nintendo DS" },
  { id: "vb", name: "Virtual Boy" },
  { id: "sms", name: "Master System" },
  { id: "smd", name: "Mega Drive" },
  { id: "sgg", name: "Game Gear" },
  { id: "smd6", name: "Mega Drive 6 boutons" },
  { id: "psx", name: "PlayStation" },
  { id: "2600", name: "Atari 2600" },
  { id: "5200", name: "Atari 5200" },
  { id: "7800", name: "Atari 7800" },
  { id: "lynx", name: "Atari Lynx" },
  { id: "cv", name: "ColecoVision" },
];

const filteredConsoles = computed(() => {
  if (!searchQuery.value.trim()) return consoles;

  const query = searchQuery.value.toLowerCase().trim();
  return consoles.filter((console) =>
    console.name.toLowerCase().includes(query)
  );
});

const handleImageError = (e: Event) => {
  const img = e.target as HTMLImageElement;
  console.log("Failed to load image at:", img.src);
  img.src = "/assets/raugemu-logo.png";
};

const openImage = (console: { id: string; name: string }) => {
  selectedMapping.value = {
    src: `/assets/controllers/${console.id}.jpg`,
    alt: `Contrôleur ${console.name}`,
  };
};
</script>

<style scoped>
section p {
  font-size: 1.2em;
}

section h3 {
  font-size: 1.4em;
}

.mapping-image {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}

.mapping-image img {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  border: 5px solid var(--border-secondary-dark);
}

.controllers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 1rem 0;
}

.controller-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--main-light);
  padding: 1rem;
  border-radius: 10px;
  border-top: 5px solid var(--border-light);
  border-left: 5px solid var(--border-light);
  border-right: 5px solid var(--border-dark);
  border-bottom: 5px solid var(--border-dark);
  cursor: var(--cursor-click);
  transition: transform 0.2s ease;
}

.controller-card:hover {
  transform: scale(1.02);
}

.controller-card h4 {
  font-family: var(--font-primary);
  color: white;
  font-size: 0.8em;
  margin-bottom: 1rem;
  text-align: center;
}

.controller-card img {
  width: 100%;
  height: auto;
  object-fit: contain;
}

/* CONTROLLER BUTTONS */
.xbox-a,
.nintendo-a,
.playstation-x,
.playstation-o {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 1.3em;
  aspect-ratio: 1;
  border-radius: 50%;
  padding: 0;
  font-weight: bold;
  vertical-align: middle;
}

.xbox-a {
  background-color: var(--green);
}

.nintendo-a {
  background-color: var(--red);
}

.playstation-x {
  background-color: black;
  color: var(--accent-primary);
}

.playstation-o {
  background-color: black;
  color: var(--red);
}

@media (max-width: 768px) {
  .controllers-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}
</style>
