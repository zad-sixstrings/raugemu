<template>
  <div class="about-title-wrapper">
    <h2 class="about-h2">Manuel d'utilisateur</h2>
  </div>
  <div class="about-container">
    <section>
      <div class="api-status-wrapper">
        <div class="api-status-div">
          <p class="api-status">
            Services:
            <span :class="apiStatusStore.status ? 'api-success' : 'api-error'">
              {{ apiStatusStore.status ? "En ligne" : "Hors ligne" }}
            </span>
          </p>
        </div>
        <div class="api-status-tooltip">
          <p class="api-status-under">
            <span class="api-info">
              {{
                apiStatusStore.status
                  ? "Les sauvegardes sont synchronisées."
                  : "Les sauvegardes ne sont pas synchronisées."
              }}
            </span>
          </p>
        </div>
      </div>
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
        Windows, et <a href="https://github.com/chrippa/ds4drv">ds4drv</a> sous
        Linux.<br /><br />
        Il existe un bug qui superpose C-UP et C-DOWN sur N64. Il est connu, on
        investigue!
      </p>
    </section>
    <section>
      <h3 class="about-h3">A quoi servent les comptes?</h3>
      <p class="about-p">
        En créant un compte, vous aurez accès à vos sauvegardes en tout temps
        sans avoir à les télécharger depuis l'émulateur. De nouvelles
        fonctionnalités sont aussi prévues à l'avenir!
      </p>
    </section>
    <section>
      <h3 class="about-h3">On peut jouer en ligne?</h3>
      <p class="about-p">
        Pas pour l'instant. L'équipe de développement d'EmulatorJS est sur le
        coup, et on proposera ce service dès qu'il sera disponible, et si notre
        infrastructure nous le permet. En attendant, vous pouvez déjà jouer en
        multijoueur local avec deux manettes.
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
      <h3 class="about-h3">L'émulation Nintendo 64 est parfois bancale!</h3>
      <p class="about-p">
        Oui. Ca peut arriver. C'est dû à un bug dans Google Chrome (double
        buffering WebGL), en particulier sur OoT Rando. On peut pas y faire
        grand chose apparemment, mais c'est tout de même en cours
        d'investigation. La taille des jeux et surtout des sauvegardes peuventt
        aussi être la cause de crash.
      </p>
    </section>
    <section>
      <h3 class="about-h3 center">Amusez-vous bien!</h3>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useApiStatusStore } from "../stores/apiStatus";

const apiStatusStore = useApiStatusStore();

onMounted(() => {
  apiStatusStore.fetchStatus();
});
</script>

<style scoped>
.about-container {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 800px;
  padding: 2rem 2rem;
  border-left: 5px solid rgb(123, 18, 209);
  border-bottom: 5px solid rgb(59, 6, 129);
  border-right: 5px solid rgb(59, 6, 129);
  border-top: none;
  overflow-y: auto;
  justify-content: center;
  align-items: center;
}

.about-title-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  max-width: 800px;
  text-align: left;
  background-color: rgb(90, 0, 180);
  border-top: 5px solid rgb(123, 18, 209);
  border-left: 5px solid rgb(123, 18, 209);
  border-right: 5px solid rgb(59, 6, 129);
  border-bottom: 5px solid rgb(59, 6, 129);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.about-h2 {
  font-family: "Press Start 2P", serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: italic;
  color: white;
  font-size: 1.4em;
  line-height: 40px;
}

section {
  margin-bottom: 4rem;
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
  color: white;
  text-align: justify;
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
  display: block;
  float: right;
  width: 300px;
  height: 40px;
  padding-left: 130px;
  margin-bottom: 50px;
}

.api-status-tooltip {
  position: inherit;
  width: 200px;
  background-color: rgb(35, 32, 51);
  border-top: 5px solid rgb(79, 80, 100);
  border-left: 5px solid rgb(79, 80, 100);
  border-right: 5px solid rgb(17, 14, 26);
  border-bottom: 5px solid rgb(17, 14, 26);
  top: 100%;
  z-index: 1000;
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
