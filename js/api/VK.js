class VK {
  static ACCESS_TOKEN = localStorage.getItem('vk1.a.ihuVrYmtGP3JHceilF5186k5Oq9b_QOOt1wjBKdRE1ne62Nk8RXt75jCH6IgoeAbE-_n95t-rSgxjU_m480R260REzb6DGrZUqNRcRstFYchTPBGhuBw4kuZTUhdTMpK23ei44aJMos0wK6-3IojVUo8BMZ5k9VsJXfZcs_EyCBWnAJDQOkwrH3QJDW0oLce') || '';
  static lastCallback;

  static get(id = '', callback) {
    this.lastCallback = callback;

    if (!this.ACCESS_TOKEN) {
      const token = prompt('Пожалуйста введите токен VK');
      localStorage.setItem('vk_token', token);
      this.ACCESS_TOKEN = token;
    }

    const count = 10;
    const script = document.createElement('script');
    script.id = 'vkResponse';
    script.src = `https://api.vk.com/method/photos.get?owner_id=${id}&album_id=profile&extended=1&photo_sizes=1&count=${count}&callback=VK.processData
                  &access_token=${this.ACCESS_TOKEN}&v=5.154`
    document.head.appendChild(script);
  }

  static processData(result) {
    let listResult = [];
    
    const responseElement = document.getElementById('vkResponse');
    if (responseElement) {
      responseElement.remove();
    }

    if (result.response) {
      result.response.items.forEach(item => {
        listResult.push(item.sizes[item.sizes.length - 1].url);
      });
    } else if (result.error) {
      if (result.error.error_code === 5) {
        alert("Токен недействителен. Пожалуйста, введите новый токен.");
        localStorage.removeItem('vk_token');
        this.ACCESS_TOKEN = '';
        return this.get(); // Пробуем снова
      }
      alert(result.error.error_msg || 'Произошла ошибка'); // Обработка неопределенных ошибок
      return;
    }

    if (typeof this.lastCallback === 'function') {
      this.lastCallback(listResult);
    }
    this.lastCallback = () => {};
  }
}