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



const {
    onSubmit,
    form 
} =  useAuth()
</script>

<template>
    <FormWrapper :handle-submit="onSubmit">
        <FormField v-slot="{ componentField }" name="email">
            <FormItem>
                <FormLabel>email</FormLabel>
                <FormControl>
                    <Input type="text" placeholder="shadcn" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="password">
            <FormItem>
                <FormLabel>password</FormLabel>
                <FormControl>
                    <Input type="text" placeholder="shadcn" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
    </FormWrapper>

</template>