<script lang="ts">
import axios from "axios"
import { defineComponent } from "vue"
import { mapActions, mapState } from "vuex"

import InputTextBox from "../components/InputTextBox.vue"
import SelectBox from "../components/SelectBox.vue"
import ButtonBox from "../components/ButtonBox.vue"

import { handleHttp, parseApiErrors } from "../lib"

export default defineComponent({
  components: {
    InputTextBox,
    SelectBox,
    ButtonBox,
  },
  data() {
    return {
      // Form
      email: "",
      password: "",
      errors: []
    }
  },
  computed: {
    ...mapState(["backendHost"])
  },
  methods: {
    ...mapActions(["doLogin"]),
    async submitLogin() {
      this.errors = []
      const body = {
        email: this.email,
        password: this.password
      }
      const auth_response = await handleHttp(async () => {
        const response = await axios.post(
          `${this.backendHost}/authenticate`,
          body,
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
        return response
      })
      if (auth_response!.status == 200) {
        const data = auth_response!.data
        this.doLogin({
          token: data.auth_token,
          username: data.username
        })
        this.$router.push("/")
      } else {
        this.errors = parseApiErrors(auth_response!)
      }
    }
  }
})
</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <div class="logo">
        <img src="../assets/logo.png" alt="logo">
      </div>
      <h3>Inicio de sesión</h3>
      <form @submit.prevent="submitLogin">
        <div class="callout callout-danger" :key="error" v-for="error in errors">
          {{ error }}
        </div>
        <hr v-if="errors">
        <InputTextBox inputtype="email" label="Correo" name="email" v-model="email" />
        <InputTextBox inputtype="password" label="Contraseña" name="password" v-model="password" />
        <ButtonBox type="submit" color="btn-blue">Iniciar sesión</ButtonBox>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: #e9ecef;
}

.login-box {
  display: -ms-flexbox;
  display: flex;
  flex: 1;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  max-width: 360px;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 0 solid rgba(0,0,0,.125);
  border-radius: 10px;
  text-align: center;
}

.login-box form {
  padding: 10px;
}

.login-box .input-general {
  margin: 0 auto 10px auto;
}

.login-box .logo {
  background-color: var(--primary-color);
  max-height: 50px;
}

.login-box .logo img {
  width: auto;
  height: 100%;
}
</style>
