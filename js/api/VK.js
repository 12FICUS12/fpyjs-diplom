/**
 * Класс VK
 * Управляет изображениями из VK. С помощью VK API.
 * С помощью этого класса будет выполняться загрузка изображений из vk.
 * Имеет свойства ACCESS_TOKEN и lastCallback
 * */
class VK {

  static ACCESS_TOKEN = '958eb5d439726565e9333aa30e50e0f937ee432e927f0dbd541c541887d919a7c56f95c04217915c32008';
  static lastCallback;

  /**
   * Получает изображения
   * */
  static get(id = '', callback){
    this.lastCallback = callback;
    this.ACCESS_TOKEN = localStorage.getItem('vk_token');
    if (!this.ACCESS_TOKEN){
      const token =promt('Пожалуйста введите токен VK')
      localStorage.setItem('vk_token', token);
    }

    let script = document.createElement('Script');
    script.id = 'vkResponse';
    script.src = 'https://api.vk.com/method/photos.get?owner_id=' + id + '&access_token=' + this.ACCESS_TOKEN + '&v=5.131&callback=VK.processData';
    document.getElementsByTagName("head")[0].appendChild(script);
  }
  

  /**
   * Передаётся в запрос VK API для обработки ответа.
   * Является обработчиком ответа от сервера.
   */
  static processData(result){
    let listResult = [];
    document.getElementById('vkResponse').remove();
    if (result.response){
      result.response.items.forEach(item => {
        listResult.push[item.sizes.lenght -1];
      });
    } else if (result.error){
      alert(result.error.error_msg)
      return
    }
    this.lastCallback(listResult);
    this.lastCallback = () => {}

  }
}
