import { storeToRefs } from "pinia";
import { useAuthStore } from "../../store/authStore";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import type { LoginDto } from "@/data/dto/auth/LoginDto";
import { useForm } from "vee-validate";
import { useRouter } from "vue-router";
import { onBeforeMount, onMounted } from "vue";

export function useAuth() {
  const authStore = useAuthStore();

  const { isAuthenticated, user } = storeToRefs(authStore);


  const formSchema =  toTypedSchema(
    z.object({
      email: z.string().min(1, {
        message: "email dibutuhkan"
      }),
      password: z.string().min(2, {
        message: "password tidak boleh kurang dari 2"
      })
    })
  )
  const form = useForm({
    validationSchema: formSchema
  })

  const router = useRouter();

  const onSubmit =  form.handleSubmit(async (values) => {
    const schema: LoginDto = {
      'email' : values.email,
      'password': values. password,
    }
    await authStore.login(schema).then(() => {
      router.push({
        name: 'dashboard'
      })
    })
  })

  onBeforeMount(() => {
    authStore.profile();
  })


  function logout() {
    localStorage.removeItem('token');
    // window.location.href="/login";
  }

  
  return {
    isAuthenticated,
    form,
    user,
    onSubmit,
    logout,
  };
}
