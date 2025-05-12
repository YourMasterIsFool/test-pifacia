<script  lang="ts" setup>

import {useAuth} from '@/composable/auth/useAuth'
  const {
    user
  } =  useAuth()
</script>

<template>
  <div>
    <RouterView />
  </div>
</template>

<style scoped></style>
