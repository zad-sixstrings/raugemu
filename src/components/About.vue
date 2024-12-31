<template>
  <div class="api-status-wrapper">
    <div class="api-status-div">
      <p class="api-status">
        Services: <span class="api-success" v-if="apiStatus"> En ligne</span
        ><span class="api-error" v-else> Hors ligne</span>
      </p>
    </div>
    <div class="api-status-tooltip">
      <p class="api-status-under">
        <span class="api-info" v-if="apiStatus"
          >Les sauvegardes sont synchronisées.</span
        >
        <span class="api-info" v-else
          >Les sauvegardes ne sont pas synchronisées.</span
        >
      </p>
    </div>
  </div>
  <div class="about-container">
    <h2 class="about-h2">Manuel d'utilisateur</h2>
    <div class="about-content">
      <section>
        <h3 class="about-h3">Qu'est-ce que RaugEmu?</h3>
        <p class="about-p">
          RaugEmu est une plateforme d'émulation dédiée aux jeux rétro développé
          par deux amis hyperactifs, permettant aux passionnés de rejouer aux
          classiques de leur enfance directement dans leur navigateur.
        </p>
      </section>

      <section>
        <h3 class="about-h3">Compatibilité</h3>
        <p class="about-p">
          Pour une expérience optimale, nous recommandons l'utilisation de
          <a href="https://www.google.com/intl/fr/chrome/">Google Chrome</a>.
          L'émulation des consoles rétro nécessite un navigateur performant pour
          garantir une expérience de jeu fluide.
        </p>
      </section>

      <section>
        <h3 class="about-h3">Contrôleurs</h3>
        <p class="about-p">
          Certains émulateurs ont parfois du mal à détecter les manettes. Les
          utilisateurs de manettes Dualsense, Dualshock 4, Switch Pro et Joycons
          qui ont ce problème peuvent le régler en installant
          <a href="https://ds4-windows.com/">DS4Windows</a> pour les systèmes
          Windows, et
          <a href="https://github.com/chrippa/ds4drv">ds4drv</a> sous Linux.
        </p>
      </section>

      <section>
        <h3 class="about-h3">A quoi servent les comptes?</h3>
        <p class="about-p">
          En créant un compte, vous aurez accès à vos sauvegardes en tout temps
          sans avoir à les télécharger depuis l'émulateur. De nouvelles
          fonctionnalités sont aussi prévues, comme le tracking du temps de jeu
          par exemple.
        </p>
      </section>
      <section>
        <h3 class="about-h3">C'est open-source?</h3>
        <p class="about-p">
          Oui. L'émulation est possible grâce à EmulatorJS. Le site est une
          application VueJS construite avec Vite qui utilise des ressources
          libres, en plus d'être auto-hébergé.
        </p>
      </section>
      <section>
        <h3 class="about-h3 center">Amusez-vous bien!</h3>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { authApi, type ApiStatus } from "../services/api";

export default defineComponent({
  name: "About",
  setup() {
    const apiStatus = ref<ApiStatus | null>(null); // State variable for API status
    const errorMessage = ref<string | null>(null);

    // Fetch API status on component mount
    const fetchApiStatus = async () => {
      try {
        const status = await authApi.getApiStatus();
        apiStatus.value = status; // Store the fetched status
      } catch (error) {
        errorMessage.value =
          "Failed to fetch API status. Please try again later.";
        console.error("Error fetching API status:", error);
      }
    };

    // Call fetchApiStatus when the component is mounted
    onMounted(() => {
      fetchApiStatus();
    });

    return {
      apiStatus,
      errorMessage,
    };
  },
});
</script>

<style scoped>
.about-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.about-content {
  background-color: rgb(26, 45, 54);
  padding: 2rem;
  border-radius: 10px;
  color: white;
}

section {
  margin-bottom: 2rem;
}

h2.about-h2 {
  color: #4a9eff;
  margin-bottom: 1rem;
  font-family: "Press Start 2P", serif;
  font-weight: 400;
  text-align: center;
}

h3.about-h3 {
  color: #4a9eff;
  margin-bottom: 1rem;
  font-family: "Press Start 2P", serif;
  font-weight: 400;
  font-size: 1em;
}

p.about-p {
  font-family: "Pixelify Sans", serif;
  font-weight: 400;
  font-size: 1em;
}

a.about-link {
  color: #4a9eff;
  text-decoration: none;
}

a.about-link:hover {
  text-decoration: underline;
}

/* API STATUS */

.api-status-wrapper {
  position: absolute;
  width: 200px;
  padding: 0;
  top: 31%;
  right: 10%;
}

.api-status-tooltip {
  position: absolute;
  width: 200px;
  background-color: rgb(35, 32, 51);
  border-top: 5px solid rgb(79, 80, 100);
  border-left: 5px solid rgb(79, 80, 100);
  border-right: 5px solid rgb(17, 14, 26);
  border-bottom: 5px solid rgb(17, 14, 26);
  top: 100%;
  left: 0;
  z-index: 70;
  padding: 10px;
  border-radius: 10px;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}

.api-status-wrapper:hover .api-status-tooltip {
  visibility: visible;
  opacity: 1;
}

.api-status {
  color: #4a9eff;
  font-family: "Pixelify Sans", serif;
  font-weight: 400;
  font-size: 1em;
}

.api-status-under {
  display: block;
  color: rgb(196, 196, 196);
  font-family: "Pixelify Sans", serif;
  font-weight: 400;
  font-size: 1em;
}

.api-success {
  color: yellowgreen;
}

.api-error {
  color: rgb(212, 102, 69);
}
</style>
