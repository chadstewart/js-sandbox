<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const test = ref("Check out")

const testClick = () => {
  test.value = "What's up?"
}

const count = ref(0)
</script>

<!-- <script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    msg: String
  },
  data() {
    return {
      count: 0,
      test: "Check out"
    }
  },
  methods: {
    testClick() {
      this.test = "Yo!"
    }
  }
})

</script> -->

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <button type="button" @click="testClick">Test</button>

  <p>
    {{ test }}
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
