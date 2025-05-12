<script lang="ts" setup>
import { useRouter } from 'vue-router';
import Button from '../ui/button/Button.vue';

interface IFormWrapper{
    submitText?: string,
    handleSubmit: () => void,
    title?: string,

}
const props = defineProps<IFormWrapper>()

const router =  useRouter();

</script>

<template>
    <form @submit="props.handleSubmit" class="rounded-md bg-white p-8 flex flex-col space-y-4">
        <h1 class="text-2xl font-bold">
            {{ props.title ?? "" }}
        </h1>
        <slot />
        <div class="flex items-center space-x-4 justify-end">

            <Button @click="router.back()" variant="ghost" type="button">
                Cancel
            </Button>
            <Button type="submit">
                {{ props.submitText ? props.submitText : 'Save' }}
            </Button>
        </div>
    </form>
</template>