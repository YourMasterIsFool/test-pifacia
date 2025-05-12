import type { CreateSubTaskDto } from "@/data/dto/sub_task/CreateSubTaskDto"
import type { UpdateSubTaskDto } from "@/data/dto/sub_task/UpdateSubTaskDto"
import router from "@/router"
import { useSubTaskStore } from "@/store/subTaskStore"
import { toTypedSchema } from "@vee-validate/zod"
import type { metadata } from "@vueuse/core/metadata.mjs"
import { storeToRefs } from "pinia"
import { useForm } from "vee-validate"
import { onMounted, watch,ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { z } from "zod"
import { h } from "vue";
import type { AuditEntity } from "@/domain/entity/AuditEntity"
import { createColumnHelper } from "@tanstack/vue-table"
import { formatDate } from "@/lib/formatDate"



export function useSubTask() {

    const subTaskStore = useSubTaskStore()
    const deletedId = ref<string | null>(null)

    const {
        getterDetailSubTask 
    } = storeToRefs(subTaskStore);

      const formSchema = toTypedSchema(
        z.object({
          name: z.string().min(2, {
            message: "name dibutuhkan",
          }),

          task_id: z.string().min(1, {
            message: "Task Name dibutuhkan",
          }),
          start: z.string().min(2, {
            message: "start dibutuhkan",
          }),
          end: z.string().min(2, {
            message: "end dibutuhkan",
          }),
          metadata: z.string().min(2, {
            message: "metadata dibutuhkan",
          }),
        })
      );
      const form = useForm({
        validationSchema: formSchema
      })
    async function fetchDetail(id:string) {
        await subTaskStore.detail(id).then(() => {
           form.setValues(getterDetailSubTask.value)
        });
    }
   const route = useRoute();

   // fetch data ketika ada berubahhan di parasm id untuk data detail
   onMounted(() => {
    if(route.params.id) {
        fetchDetail(route.params.id as string)
    }
   })


    async function remove(id:string) {

        await subTaskStore.remove(id).then(() => {
          setDeletedId(null);
        });
    }
    async function update(id: string) {

     const updateSchema: UpdateSubTaskDto = {
        name: form.values.name ?? '',
        start: form.values.start ?? '',
        end: form.values.end ?? '',
        metadata: form.values.metadata ?? "",
        task_id: form.values.task_id ?? "",
        
     }
      await subTaskStore.update(id, updateSchema).then(() => {
        router.back()

        console.log('success')
      });
    }

    
    async function create() {
      const schema: CreateSubTaskDto = {
        name: form.values.name ?? "",
        start: form.values.start ?? "",
        end: form.values.end ?? "",
        metadata: form.values.metadata ?? "",
        task_id: form.values.task_id ?? ""
      };
      await subTaskStore.store(schema, () => router.back());
    }

    const setDeletedId = (id:string | null) => {
        deletedId.value = id
    }

    const handleSubmit =  form.handleSubmit((values) => {

      console.log(values)
        if(route.params.id) {
            update(route.params.id as string)
        }
        else {
            create()
        }

    })


     const auditsColumnHelper = createColumnHelper<AuditEntity>();
      const auditColumns = [
        auditsColumnHelper.accessor("created_at", {
          enablePinning: true,
          header: "date",
          cell: ({ row }) =>
            h(
              "div",
              { class: "capitalize" },
              formatDate(row.original.created_at)
            ),
        }),
        auditsColumnHelper.accessor("action", {
          enablePinning: true,
          header: "Action",
          cell: ({ row }) =>
            h("div", { class: "capitalize" }, row.original.action),
        }),
        auditsColumnHelper.accessor("features", {
          enablePinning: true,
          header: "Features",
          cell: ({ row }) =>
            h("div", { class: "capitalize" }, row.original.features),
        }),

        auditsColumnHelper.accessor("notes", {
          enablePinning: true,
          header: "Notes",
          cell: ({ row }) =>
            h("div", { class: "capitalize" }, row.original.notes),
        }),
        auditsColumnHelper.accessor("creator_name", {
          enablePinning: true,
          header: "Creator Name",
          cell: ({ row }) =>
            h("div", { class: "capitalize" }, row.original.creator_name),
        }),
      ];
    return {
      getterDetailSubTask,
      form,
      handleSubmit,
      remove,
      deletedId,
      setDeletedId,
      auditsColumnHelper,
      auditColumns,
    };
}
