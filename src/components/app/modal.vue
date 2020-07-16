<template>
  <div>
    <div id="openModal" class="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">Сохранить запрос</h3>
            <!-- <a href="#close" title="Close" class="close">×</a> -->
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitHandler">
              <div class="input_favorit">
                <label class="request" for="request">Запрос</label>
                <input
                  class="input_model"
                  type="text"
                  id="request"
                  placeholder="чем кормить кота"
                  v-model="request"
                />
                <label class="request" for="name">
                  <span>*</span> Название
                </label>
                <input
                  class="input_model"
                  type="text"
                  id="name"
                  placeholder="Укажите название"
                  v-model="name"
                  require
                />
                <label class="request">Сортировать по</label>
                <select class="input_model" v-model="selected">
                  <option
                    v-for="option in options"
                    :value="option.value"
                    :key="option.value"
                  >{{ option.text }}</option>
                </select>
              </div>
              <div class="runner_block">
                <span>Максимальное количество</span>
                <br />

                <div class="runner">
                  <input
                    class="runner_input"
                    id="rangeType2"
                    type="range"
                    min="1"
                    max="50"
                    value="25"
                    oninput="document.getElementById('twoType').value = this.value;"
                  />

                  <input
                    class="runner_number"
                    type="number"
                    id="twoType"
                    min="1"
                    max="50"
                    value="25"
                    oninput="document.getElementById('rangeType2').value = this.value;"
                  />
                </div>
                <div class="button">
                  <a href="#close" class="exit">Не сохронять</a>
                  <a href="#" v-if="!this.blank" v-on:click="submitHandler" class="save">Сохронить</a>
                  <a
                    href="#"
                    v-on:click="submitEdit"
                    class="save"
                    v-else
                    :class="{ noActive: !noWrite }"
                  >Изменить</a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['blank'],

  watch: {
    blank: function() {
      this.name = this.blank.name
      this.request = this.blank.request
      this.selected = this.blank.sort || null
      rangeType2.value = this.blank.number_requests
      twoType.value = this.blank.number_requests
    },
    name: function() {
      if (this.name.length >= 1) {
        return (this.noWrite = true)
      } else {
        return (this.noWrite = false)
      }
    }
  },
  data: () => ({
    name: ' ',
    request: '',
    sort: '',
    selected: null,
    noWrite: false,
    options: [
      { text: 'Без сортировки', value: null },
      { text: 'Дата', value: 'date' },
      { text: 'Рейтинг', value: 'rating' },
      { text: 'актуальность', value: 'relevance' },
      { text: 'Названю', value: 'title' },
      { text: 'Количество видео', value: 'videoCount' },
      { text: 'количество просмотров', value: 'viewCount' }
    ]
  }),

  methods: {
    async submitHandler() {
      try {
        await this.$store.dispatch('createFavorites', {
          name: this.name,
          request: this.request,
          sort: this.selected,
          number_requests: rangeType2.value
        })
      } catch (e) {}
    },
    async submitEdit() {
      if (this.noWrite) {
        try {
          await this.$store.dispatch('editFavorites', {
            name: this.name,
            request: this.request,
            sort: this.selected,
            number_requests: rangeType2.value,
            id: this.blank.id
          })
          const newFavoritesq = await this.$store.dispatch('fetchFavorites')
          this.$emit('updateFavorites', newFavoritesq)
        } catch (e) {}
      } else {
        console.log('Тут модная ошибка')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
  display: flex;
  justify-content: space-around;
  text-align: center;
  position: relative;
  margin-top: 2vh;
  margin-bottom: 1vh;
}
a {
  text-decoration: none;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 20px 50px;
  text-align: center;
  border: 1px solid #1390e5;
}

.exit {
  color: #1390e5;
}

.save {
  color: #ffffff;
  background: #1390e5;
}

.noActive {
  border: 0px solid black;
  color: #ffffff;
  background: #818283;
}

.runner_block {
  text-align: left;
  margin-top: 4vh;
  width: 100%;
  span {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    margin-left: 25px;
    line-height: 22px;
    font-weight: 700;
  }
}

.runner {
  display: flex;
  justify-content: center;
  margin-top: 1vh;
  align-items: center;

  .runner_input {
    width: 310px;
    height: 18px;
  }
  .runner_number {
    width: 100px;
    height: 48px;
    border: 1px solid rgba(23, 23, 25, 0.2);
    box-sizing: border-box;
    border-radius: 5px;
    font-size: 20px;
    line-height: 24px;
    margin-left: 1vw;
    text-align: center;
  }
}

.modal {
  position: fixed;

  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  background: #75c7ff;
  z-index: 1050;
  opacity: 0;
  -webkit-transition: opacity 200ms ease-in;
  -moz-transition: opacity 200ms ease-in;
  transition: opacity 200ms ease-in;
  pointer-events: none;
  margin: 0;
  padding: 0;
}

.modal:target {
  opacity: 1;
  pointer-events: auto;
  overflow-y: auto;
}

.modal-dialog {
  position: relative;
  width: auto;
  margin: 10px;
  background: #ffffff;
  box-shadow: 0px 10px 50px rgba(19, 144, 229, 0.8);
  border-radius: 10px;
}
@media (min-width: 576px) {
  .modal-dialog {
    max-width: 500px;
    margin: 30px auto;
  }
}

.modal-content {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  background-color: #fff;
  -webkit-background-clip: padding-box;
  background-clip: padding-box;

  border-radius: 10px;
  outline: 0;
}
@media (min-width: 768px) {
  .modal-content {
    -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  }
}
/* свойства для заголовка модального окна */
.modal-header {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: center;
  padding: 15px;
}
.modal-title {
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 28px;

  color: #000000;
}
/* свойства для кнопки "Закрыть" */
.close {
  float: right;
  font-family: sans-serif;
  font-size: 24px;
  font-weight: 700;
  line-height: 1;
  color: #000;
  text-shadow: 0 1px 0 #fff;
  opacity: 0.5;
  text-decoration: none;
}
/* свойства для кнопки "Закрыть" при нахождении её в фокусе или наведении */
.close:focus,
.close:hover {
  color: #000;
  text-decoration: none;
  cursor: pointer;
  opacity: 0.75;
}
/* свойства для блока, содержащего основное содержимое окна */
.modal-body {
  position: relative;
  -webkit-box-flex: 1;
  -webkit-flex: 1 1 auto;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  padding: 15px;
  overflow: auto;
}
label {
  display: block;
  margin-top: 2vh;
}

.request {
  font-weight: 700;
  margin-left: 2px;
  span {
    color: red;
  }
}
form {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: row;
  color: #272727;
  padding-left: 0 35px;
  padding-right: 0 35px;
}
.input_model {
  background: #fafafa;
  border: 1px solid rgba(23, 23, 25, 0.1);
  box-sizing: border-box;
  border-radius: 5px;
  width: 430px;
  height: 48px;
  outline: none;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 24px;
  padding-left: 10px;
  color: #272727;
}
</style>
