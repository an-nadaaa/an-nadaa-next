<template>
  <section class="relative w-full text-gray-600 body-font">
    <ContactForm />
    <AddressSection />
  </section>
</template>

<script setup lang="ts">
import ContactForm from '~/components/contact/ContactForm.vue'
import AddressSection from '~/components/contact/AddressSection.vue'
// const email = appConfig.contact

onMounted(() => {
  // this.$segment.page('Contact')
})

useHead({
  title: 'Contact us | An-Nadaa educational foundation',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content:
        'Get in touch with us for any inquiries, we will respond as fast as possible, email: contact@an-nadaa.com, Phone number:+234 706-244 4989',
    },
  ],
})
</script>
