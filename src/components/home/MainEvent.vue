<template>
  <div class="wrap">
    <div class="event">
      <ul>
        <li>
          <a href="/">
            <img :src="require('@/assets/event/1.png')" class="events" />
          </a>
        </li>
        <li>
          <a href="/">
            <img :src="require('@/assets/event/2.png')" class="events" />
          </a>
        </li>
        <li>
          <a href="/">
            <img :src="require('@/assets/event/3.png')" class="events" />
          </a>
        </li>
        <li>
          <a href="/">
            <img :src="require('@/assets/event/4.png')" class="events" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "MainEvent"
};
</script>
<style scoped>
.wrap {
  width: 100%;
}

.event {
  width: 1080px;
  margin: 0 auto;
}

ul {
  list-style: none;
  align-content: center;
  display: flex;
}

h2 {
  text-align: left;
  margin-left: 80px;
}

.events {
  height: 200px;
  width: 200px;
  margin-right: 16px;
  border-radius: 10px;
}
</style>
