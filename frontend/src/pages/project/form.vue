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
import { useProject } from '@/composable/project/useProject'
import MainContent from '@/components/commons/MainContent.vue'
const {
    handleSubmit,
    form,
    auditsColumnHelper,
    auditColumns,
    getterDetailProject

} = useProject()

import { Vue3JsonEditor } from 'vue3-json-editor'
import { computed } from 'vue'


const jsonVal = computed({
    get: () => form.values.metadata,
    set: (val) => form.setFieldValue('metadata', JSON.stringify(val)),
})
</script>

<template>

    <MainContent title="">
        <FormWrapper title="Create Project" :handle-submit="handleSubmit">
            <FormField v-slot="{ componentField }" name="name">
                <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="Project Name" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <div class="grid xl:grid-cols-2 xl:gap-6">
                <FormField v-slot="{ componentField }" name="start">
                    <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                            <DatePicker :value="form.values.start" @change="(value) => {
                                form.setFieldValue('start', value)
                            }" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="end">
                    <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                            <DatePicker :value="form.values.end" @change="(value) => { 
                                form.setFieldValue('end', value)
                            }" />

                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
            </div>

            <FormField v-slot="{ componentField }" name="metadata">
                <FormItem>
                    <FormLabel>Metadata</FormLabel>
                    <FormControl>
                        <Vue3JsonEditor v-model="jsonVal" @json-change="(value) => {
                                console.log(value);
                                console.log(JSON.stringify(value))
                               form.setFieldValue('metadata', JSON.stringify(value))
                            }" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <!-- {{ form.watch("metadata") }} -->
        </FormWrapper>



        <div class="xl:mt-8 mt-6">
            <CustomDatatable :show-input-search="false"  v-if="getterDetailProject" :columns="auditColumns" :datas="getterDetailProject.audits" :column-helper="auditColumns" />
        </div>
    </MainContent>

</template>