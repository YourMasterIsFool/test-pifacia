<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/composable/auth/useAuth'
import FormWrapper from '@/components/commons/FormWrapper.vue'
import { useRole } from '@/composable/role/userRole'
import MainContent from '@/components/commons/MainContent.vue'
const {
    handleSubmit,
} = useRole()
</script>

<template>

    <MainContent title="">
        <FormWrapper title="Create Role" :handle-submit="handleSubmit">
            <FormField v-slot="{ componentField }" name="code">
                <FormItem>
                    <FormLabel>code</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="shadcn" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="name">
                <FormItem>
                    <FormLabel>name</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="shadcn" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
        </FormWrapper>
    </MainContent>

</template>