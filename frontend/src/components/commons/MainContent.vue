<script lang="ts" setup>
interface IMainContent {
  title: string;
}

const props = defineProps<IMainContent>();
</script>
<template>
  <div class="w-full p-8 flex justify-center xl:px-0 xl:py-6">
    <div class="w-full xl:w-2/3">
      <h1 class="xl:text-2xl xl:mb-6 mb-4 font-bold">
        {{ props.title ?? "Ttile" }}
      </h1>
      <div>
        <slot />
      </div>
    </div>
  </div>
</template>
