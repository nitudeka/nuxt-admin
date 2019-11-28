<template>
  <div class="signin d-flex align-items-center">
    <div class="w-100 px-3">
      <div class="container signin-width border rounded p-4 position-relative">
        <loader :loading="this.$store.state.signinPending" />
        <h2 class="mb-4 pb-4 text-center border-bottom">Sign in!</h2>
        <custom-input
          :getValue="getUsername"
          id="username"
          placeholder="Your username"
          label="Your username"
          type="text"
        />
        <custom-input
          :getValue="getPassword"
          id="password"
          placeholder="Your password"
          label="Your password"
          type="password"
        />
        <button @click="signin" type="submit" class="btn btn-primary">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import CustomInput from "@/components/admin/Input";
import Loader from "@/components/admin/Loader";

export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  components: { CustomInput, Loader },
  methods: {
    getUsername(value) {
      this.username = value;
    },
    getPassword(value) {
      this.password = value;
    },
    signin() {
      this.$store.dispatch("signin", {
        username: this.username,
        password: this.password
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.signin {
  height: 100vh;
  width: 100vw;

  &-width {
    max-width: 40rem;
  }
}
</style>
