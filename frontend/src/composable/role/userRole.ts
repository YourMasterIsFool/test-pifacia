import type { CreateRoleDto } from "@/data/dto/role/CreateRoleDto"
import type { UpdateRoleDto } from "@/data/dto/role/UpdateRoleDto"
import router from "@/router"
import { useRoleStore } from "@/store/roleStore"
import { toTypedSchema } from "@vee-validate/zod"
import { storeToRefs } from "pinia"
import { useForm } from "vee-validate"
import { onMounted, watch,ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { z } from "zod"


export function useRole() {

    const roleStore = useRoleStore()
    const deletedId = ref<string | null>(null)

    const {
        getterDetailRole 
    } = storeToRefs(roleStore);

      const formSchema =  toTypedSchema(
        z.object({
          code: z.string().min(1, {
            message: "code dibutuhkan"
          }),
          name: z.string().min(2, {
            message: "name dibutuhkan"
          })
        })
      )
      const form = useForm({
        validationSchema: formSchema
      })
    async function fetchDetail(id:string) {
        await roleStore.detail(id).then(() => {
           form.setValues(getterDetailRole.value)
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

        await roleStore.remove(id).then(() => {
          setDeletedId(null);
        });
    }
    async function update(id: string) {

     const updateSchema: UpdateRoleDto = {
        code: form.values.code ?? '',
        name: form.values.name ?? ''
        
     }
      await roleStore.update(id, updateSchema).then(() => {
        router.back()

        console.log('success')
      });
    }

    
    async function create() {
      const schema: CreateRoleDto = {
        code: form.values.code ?? "",
        name: form.values.name ?? "",
      };
      await roleStore.store(schema, () => router.back());
    }


   

    const setDeletedId = (id:string | null) => {
        deletedId.value = id
    }

    const handleSubmit =  form.handleSubmit((values) => {
        if(route.params.id) {
            update(route.params.id as string)
        }
        else {
            create()
        }

    })
    return {
      getterDetailRole,
      form,
      handleSubmit,
      remove,
      deletedId,
      setDeletedId,
    };
}
