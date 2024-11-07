/**
 * Класс VK
 * Управляет изображениями из VK. С помощью VK API.
 * С помощью этого класса будет выполняться загрузка изображений из vk.
 */
class VK {
  static ACCESS_TOKEN = localStorage.getItem('vk_token') || '9a0874ec9a0874ec9a0874ec50992b691499a089a0874ecfd2396a46873c9e6c723f552'; // Установите стандартный токен, если токен не существует
  static lastCallback;
  https://oauth.vk.com/authorize?client_id=1&display=page&redirect_uri=http://example.com/callback&scope=friends&response_type=token&v=5.131&state=123456
  /**
   * Получает изображения
   */
  static get(id = '', callback) {
    this.lastCallback = callback;

    // Запрашиваем токен, если он не установлен
    if (!this.ACCESS_TOKEN || this.ACCESS_TOKEN === 'default_access_token') {
      const token = prompt('Пожалуйста введите токен VK');
      localStorage.setItem('vk_token', token);
      this.ACCESS_TOKEN = token; // Обновляем ACCESS_TOKEN
    }

    let script = document.createElement('script');
    script.id = 'vkResponse';
    script.src = 'https://api.vk.com/method/photos.get?owner_id=' + id + '&access_token=' + this.ACCESS_TOKEN + '&v=5.131&callback=VK.processData';
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  /**
   * Передаётся в запрос VK API для обработки ответа.
   * Является обработчиком ответа от сервера.
   */
  static processData(result) {
    let listResult = [];
    document.getElementById('vkResponse').remove();

    if (result.response) {
      result.response.items.forEach(item => {
        listResult.push(item.sizes[item.sizes.length - 1].url);
      });
    } else if (result.error) {
      // Проверяем код ошибки
      if (result.error.error_code === 5) { // Код ошибки 5 - невалидный токен
        alert("Токен недействителен. Пожалуйста, введите новый токен.");
        localStorage.removeItem('vk_token'); // Удаляем старый токен
        this.ACCESS_TOKEN = ''; // Сбрасываем текущий токен
        return this.get(); // Пробуем снова (попросим пользователя ввести новый токен).
      }

      alert(result.error.error_msg); // Выводим сообщение об ошибке
      return;
    }
    this.lastCallback(listResult);
    this.lastCallback = () => {};
  }
}