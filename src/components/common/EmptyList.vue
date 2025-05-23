<template>
  <div class="EmptyList">
    <p class="EmptyList__text">No items found</p>
  </div>
</template>

<style scoped lang="scss">
.EmptyList {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);

  &__text {
    margin-top: 10rem;
    color: $primary-color;
    letter-spacing: 3.5px;
    font-size: 6rem;
    -webkit-box-reflect: below 1px linear-gradient(transparent, #0004);
  }
}

@media screen and (max-width: 1200px) {
  .EmptyList {
    &__text {
      font-size: 4rem;
    }
  }
}
</style>
