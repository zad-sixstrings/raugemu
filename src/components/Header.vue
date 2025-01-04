<template>
  <header>
    <div class="header-wrapper">
      <h1 class="main-title blue-text">RaugEmu</h1>
      <h2 class="main-title-sub purple-text">
        You rip 'em, we emulate 'em.&reg;
      </h2>
      <img src="/assets/raugemu-logo.png" alt="Logo" class="logo" />
      <div class="header-warning">
        <span>/!\ L'émulation Nintendo 64 est actuellement éclatax.</span>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  height: 200px;
  margin: 0 10px 0 10px;
  pointer-events: none;
}

.header-wrapper {
  padding: 50px 0 0 50px;
}

.header-warning span {
  position: absolute;
  color: var(--yellow);
  font-family: "Pixelify Sans", serif;
  font-weight: 400;
  font-size: 0.9em;
  padding-top: 50px;
}
</style>
