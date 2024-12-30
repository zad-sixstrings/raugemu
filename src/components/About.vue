<template>
  <div class="about-container">
    <h2 class="about-h2">Guide</h2>
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
</style>
