<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import CustomDatatable from "@/components/commons/CustomDatatable.vue";

import DatePicker from '@/components/commons/DatePicker.vue'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import FormWrapper from '@/components/commons/FormWrapper.vue'
import { useUser } from '@/composable/user/useUser'
import { useRoles } from '@/composable/role/useRoles'
import MainContent from '@/components/commons/MainContent.vue'
const {
    handleSubmit,
    form,
    auditsColumnHelper,
    auditColumns,
    getterDetailUser
} = useUser()

const {
    getterRoles
} = useRoles()
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Vue3JsonEditor } from 'vue3-json-editor'
import { computed } from 'vue'



</script>

<template>

    <MainContent title="">
        <FormWrapper title="Create User" :handle-submit="handleSubmit">
            <FormField v-slot="{ componentField }" name="name">
                <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="User Name" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="email">
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="User eamil" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="password">
                <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input type="password" placeholder="User Password" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            
                <FormField v-slot="{ componentField }" name="role_id">
                    <FormItem>
                    <FormLabel>Role Name</FormLabel>
                    <FormControl>
                        <Select  v-bind="componentField"">
                        <SelectTrigger class="w-full">
                        <SelectValue placeholder="Select a Role" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Role</SelectLabel>

                            <SelectItem v-for="role in getterRoles" :value="role.id">
                                {{role.name}}
                            </SelectItem>
                        </SelectGroup>
                        </SelectContent>
                    </Select>

                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
            

        </FormWrapper>


    </MainContent>

</template>