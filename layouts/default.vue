<template>
  <div>
    <Header />
    <slot />
    <GlobalFooter />
    <MobileBar class="sm:hidden" />
  </div>
</template>

<style>
html,
body {
  @apply font-texts;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  @apply font-headers;
}
</style>
