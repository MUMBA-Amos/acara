<script setup>
import { reactive } from 'vue'

//constants
const footer = reactive({
  email: '',
  phone: '',
  address: '',
  socialMedia: {
    facebook: '',
    instagram: '',
  },
})

//functions

function submitFooter() {
  console.log(footer)
}
</script>

<template>
  <!--Whateever you declar on the top can be displayed here-->
</template>

<style scoped></style>
