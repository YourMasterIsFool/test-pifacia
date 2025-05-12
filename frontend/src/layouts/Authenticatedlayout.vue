<script lang="ts" setup>
import Header from '@/components/commons/Header.vue';


import {useAuth} from '@/composable/auth/useAuth'
  const {
    user
  } =  useAuth()
</script>

<template>
  <div>
    <Header />
    <RouterView />
  </div>
</template>
