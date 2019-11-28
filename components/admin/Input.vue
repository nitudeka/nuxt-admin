<template>
  <div class="form-group">
    <label :for="id">{{label}}</label>
    <input
      @change="({target}) => getValue(target.value)"
      :type="type"
      class="form-control"
      :id="id"
      :placeholder="placeholder"
    />
  </div>
</template>

<script>
export default {
  props: {
    getValue: {
      type: Function,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang='scss' scoped>
</style>
