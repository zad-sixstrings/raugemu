<template>
  <div class="page-transition">
    <div class="about-container">
      <section>
        <div class="api-status-wrapper">
          <div class="api-status-div">
            <p class="api-status">
              Services:
              <span
                :class="apiStatusStore.status ? 'api-success' : 'api-error'"
              >
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
          classiques de <span class="hint">L</span>eur enfance directement dans
          leur navigateur.
        </p>
      </section>
      <section>
        <h3 class="about-h3">Compatibilité</h3>
        <p class="about-p">
          Pour une expérience optimale, nous recommandons l'utilisation de
          <a href="https://www.google.com/intl/fr/chrome/">Google Chrome</a>.
          L'émulati<span class="hint">O</span>n des consoles rétro nécessite un
          navigateur performant pour garantir une expérience de jeu fluide.
        </p>
        <p class="about-p">
          <span class="warning">/!\ </span>Chrome a tout de même ses défauts!
          L'émulation au sein même d'un navigateur n'est pas une mince affaire.
          Chrome reste le meilleur choix, mais n'est pas exempt de limitations.
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
        <p class="about-p">
          Rendez-vous à la section manettes (coming soon) pour savoir comment
          mapper au mieux vos contrôles.
        </p>
      </section>
      <section>
        <h3 class="about-h3">A quoi servent les comptes?</h3>
        <p class="about-p">
          Afin de pouvoir accéder au contenu du site, vous devez vous créer un
          compte - et ce pour des raisons légales et de sécurité. En effet, il
          est interdit de mettre à disposition des ROMs en téléchargement, et
          nous encourageons nos utilisateurs à ne se procurer les jeux que via
          les canaux légaux et officiels. En contrepartie, nous offrons diverses
          fonctionnalités comme la gestion des sauvegardes, le tracking du temps
          de jeu et des succès!
        </p>
        <p class="about-p">
          Le succès le plus simple à obtenir se trouve dans The Legend of Zelda:
          A Link to the Past. Essayez! Et si vous vous sentez l'âme d'un
          Sherlock Holmes en herbe, un easter egg est caché sur le site, avec
          deux succès exclusifs à la clé.
        </p>
      </section>
      <section>
        <h3 class="about-h3">On peut jouer en ligne?</h3>
        <p class="about-p">
          Pas pour l'instant. L'équipe de développement d'EmulatorJS est sur le
          coup, et on proposera ce service dès qu'il sera disponible
          <em>si notre infrastructure nous le permet</em>. En attendant, vous
          pouvez déjà jouer en multijoueur local avec deux manettes.
        </p>
      </section>
      <section>
        <h3 class="about-h3">C'est open-source?</h3>
        <p class="about-p">
          Oui. L'émulation est possible grâce à EmulatorJS. Le site est une
          application VueJS construite avec Vite qui utilise des ressources
          libres, en plus d'être auto-hébergé. La source est disponible sur
          <a href="https://github.com/zad-sixstrings/raugemu">GitHub</a>.
        </p>
      </section>
      <section>
        <h3 class="about-h3">L'émulation Nintendo 64 est parfois bancale!</h3>
        <p class="about-p">
          Oui. Ca peut arriver. C'est dû à un bu<span class="hint">G</span> dans
          Google Chrome (double buffering WebGL et mémoire navigateur), en
          particulier sur Ocarina of Time et 007 Goldeneye. Les jeux N64 sont
          donc à l'essai, et il est pour l'instant impossible d'en garantir la
          stabilité. Emuler la Nintendo 64 n'est pas une mince affaire pour des
          raisons techniques difficiles à expliquer en quelque lignes.
        </p>
      </section>
      <section>
        <h3 class="about-h3">Est-ce que les consoles CD seront disponibles?</h3>
        <p class="about-p">
          Le support Playstation vient d'être implémenté! Difficile de promettre
          l'implémentation de consoles CD supplémentaires pour le moment. Etant
          donné que l'émulation s'effectue dans votre navigateur web, la mémoire
          disponible est limitée et plus les jeux sont dodus, plus la mémoire
          est limitée. Nous ferons de notre mieux pour proposer plus de c<span
            class="hint"
            >O</span
          >nsoles CD, mais c'est un long processus qui requiert de nombreux
          tests.
        </p>
      </section>
      <section>
        <h3 class="about-h3">Manuel LSDJ</h3>
        <p class="about-p">
          Le manuel d'utilisation de la ROM Little Sound DJ sur Game Boy se
          trouve
          <a
            href="https://www.littlesounddj.com/lsd/latest/documentation/LSDj_9_2_6.pdf"
            >ici</a
          >.
        </p>
      </section>
      <section>
        <h3 class="about-h3 center">Amusez-vous bien!</h3>
      </section>
      <div class="last-hint"><p>21</p></div>
    </div>
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
  color: var(--accent-primary);
  font-family: var(--font-secondary);
  font-weight: 400;
  font-size: 1em;
}

.api-status-under {
  display: block;
  color: rgb(196, 196, 196);
  font-family: var(--font-secondary);
  font-weight: 400;
  font-size: 1em;
}

.api-success {
  color: var(--green);
}

.api-error {
  color: var(--red);
}

.warning {
  color: var(--yellow);
}

p.about-p {
  font-size: 1.2em;
}

h3.about-h3 {
  font-size: 1.4em;
}

.hint {
  color: yellowgreen;
}

.last-hint {
  display: flex;
  max-width: 100%;
  width: 100%;
  justify-content: right;
  height: 10px;
  margin: 0;
  padding: 0;
}

.last-hint p {
  color: pink;
  font-family: var(--font-tertiary);
}
</style>
