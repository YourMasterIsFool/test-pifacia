<script lang="ts" setup>
import { useAuth } from '@/composable/auth/useAuth';
  const { 
    isAuthenticated,
    logout
  } = useAuth();
</script>

<template>
  <div class="shadow-md w-full py-6 border-b-2 border-gray-200">
    <div class="flex w-full justify-center xl:px-0 lg:px-12 px-6 items-center">
      <div class="xl:w-2/3 w-full flex items-center justify-between">
        <div class="text-2xl font-bold">Pifacia</div>
        <ul v-if='isAuthenticated' class="flex items-center space-x-3">
          <li>
            <RouterLink :to="{
            name: 'dashboard'
          }">
            Dashboard
          </RouterLink>
          </li>
          <li>
            <RouterLink :to="{
            name: 'user'
          }">
            Users
          </RouterLink>
          </li>

          <li>
            <RouterLink :to="{
            name: 'role'
          }">
            Roles
          </RouterLink>
        </li>

          <li>
            <RouterLink :to="{
            name: 'sub_task'
          }">
            Sub Task
          </RouterLink>

        </li>

          <li>
            <RouterLink :to="{
            name: 'project'
          }">
            Project
          </RouterLink>
        </li>


          <li>
            <RouterLink :to="{
            name: 'task'
          }">
            Task
          </RouterLink>
          </li>
        </ul>
        <div class="flex items-center justify-end space-x-3">
          <RouterLink v-if="!isAuthenticated" :to="{
            name: 'login'
          }">
            Login
          </RouterLink>

          <div @click="logout" v-if="isAuthenticated" class="">Logout</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
