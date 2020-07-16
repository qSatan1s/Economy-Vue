<template>
  <div class="login_block">
    <div class="auth_block">
      <img class="logo" src="@/assets/img/logo.png" alt />
      <h3>Вход</h3>

      <form class="auth_form" @submit.prevent="submitHandler">
        <label for="login">Логин</label>
        <input type="text" id="login" v-model.trim="email" />
        <label for="password">Пароль</label>
        <div class="pass">
          <input type="password" id="password" v-model.trim="password" v-show="!showPass" />
          <input type="text" id="password" v-model.trim="password" v-show="showPass" />
          <a
            class="material-icons password_control"
            :class="{ active: showPass }"
            @click="showPass = !showPass"
          >visibility_off</a>
        </div>
        <button type="submit" class="btn">Войти</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data: () => ({
    email: '',
    password: '',
    showPass: false
  }),

  methods: {
    async submitHandler() {
      const formData = {
        email: this.email,
        password: this.password
      }
      try {
        await this.$store.dispatch('login', formData)
        this.$router.push('/')
      } catch (e) {}
    }
  }
}
</script>

<style lang="scss" scoped>
h3 {
  font-size: 18px;
  margin-top: 3vh;
}
label {
  margin-top: 1vh;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 22px;
  color: rgba(23, 23, 25, 0.3);
}
input {
  border: 1px solid rgba(23, 23, 25, 0.2);
  box-sizing: border-box;
  border-radius: 5px;
  height: 30px;
  width: 300px;
  height: 48px;
  font-size: 20px;
  padding-left: 15px;
  outline: none;
}
.pass {
  position: relative;
  display: flex;
  align-items: center;
}
.password_control {
  position: absolute;
  color: #d1d1d1;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
}

.active {
  color: #1390e5;
}

input:focus {
  background: rgba(197, 228, 249, 0.3);
  border: 1px solid #1390e5;
}

.btn {
  margin-top: 4vh;
  background: #1390e5;
  border-radius: 5px;
  width: 176px;
  height: 52px;
  color: white;
  border: 0px;
  margin-left: 5vw;
  cursor: pointer;
  outline: none;
}

.btn:hover {
  background: #1087d6;
}

.login_block {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fafafa;
  height: 100%;
  width: 100%;
}

.auth_block {
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  background: #ffffff;
  border: 1px solid rgba(39, 39, 39, 0.1);
  box-sizing: border-box;
  border-radius: 5px;
  width: 510px;
  height: 512px;
}
.auth_form {
  display: flex;

  flex-direction: column;

  flex-wrap: wrap;

  margin-top: 3vh;
}

.logo {
  margin-top: 5vh;
  object-fit: scale-down;
}
</style>
