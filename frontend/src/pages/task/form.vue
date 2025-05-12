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
import { useTask } from '@/composable/task/useTask'
import { useProjects } from '@/composable/project/useProjects'
import MainContent from '@/components/commons/MainContent.vue'
const {
    handleSubmit,
    form,
    auditsColumnHelper,
    auditColumns,
    getterDetailTask
} = useTask()

const {
    getterProjects
} = useProjects()
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


const jsonVal = computed({
    get: () => form.values.metadata,
    set: (val) => form.setFieldValue('metadata', JSON.stringify(val)),
})

const projectVal = computed({
    get: () => form.values.project_id,
    set: (val) => form.setFieldValue('project_id', value),
})
</script>

<template>

    <MainContent title="">
        <FormWrapper title="Create Task" :handle-submit="handleSubmit">
            <FormField v-slot="{ componentField }" name="name">
                <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="Task Name" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
                <FormField v-slot="{ componentField }" name="project_id">
                    <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                        <Select  v-bind="componentField"">
                        <SelectTrigger class="w-full">
                        <SelectValue placeholder="Select a Project" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Project</SelectLabel>

                            <SelectItem v-for="project in getterProjects" :value="project.id">
                                {{project.name}}
                            </SelectItem>
                        </SelectGroup>
                        </SelectContent>
                    </Select>

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
            <CustomDatatable :show-input-search="false"  v-if="getterDetailTask" :columns="auditColumns" :datas="getterDetailTask.audits" :column-helper="auditColumns" />
        </div>
    </MainContent>

</template>