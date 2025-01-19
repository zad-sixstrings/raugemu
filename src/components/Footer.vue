<template>
  <footer>
    <div id="footer-text">
      <p class="credentials">
        Propulsé par <a href="https://emulatorjs.org/">EmulatorJS</a> -
        Developpé par
        <a href="https://github.com/zad-sixstrings">Zad Sixstrings</a> - Hébergé
        par <a href="https://raug-info.ch">Raug Info</a>
      </p>
      <p class="copyright">2025 - Tous droits réservés</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Script
</script>

<style scoped>
footer {
  display: block;
  margin: 2rem auto;
  max-width: 80%;
  width: 100%;
  height: 200px;
  text-align: center;
  padding-top: 50px;
  color: white;
  margin-bottom: 100px;
}

#footer-menu {
  display: block;
  margin-bottom: 30px;
  text-align: center;
}

#footer-text {
  padding-top: 100px;
}

#footer-menu ul {
  list-style-type: none;
}

#footer-menu li {
  position: relative;
  padding: 5px;
}

#footer-menu li a {
  font-family: var(--font-press-start);
  font-weight: 400;
  font-size: 0.7em;
  text-align: center;
}

.credentials,
.copyright {
  font-family: var(--font-press-start);
  font-optical-sizing: auto;
  font-weight: 400;
  font-size: 0.6em;
  line-height: 20px;
}

.credentials {
  padding-bottom: 15px;
}
</style>
