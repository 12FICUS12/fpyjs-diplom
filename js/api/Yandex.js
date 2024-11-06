/**
 * Класс Yandex
 * Используется для управления облаком.
 * Имеет свойство HOST
 * */
class Yandex {
  static HOST = 'https://cloud-api.yandex.net/v1/disk';

  /**
   * Метод формирования и сохранения токена для Yandex API
   */
  static getHeader(){
    return {
      'Authorization': `OAuth ${this.getToken()}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }

  static getToken(){
    let token = localStorage.getItem('yandex_token');
    if (!token){
      const token = promt('Пожалуйста введите токен Яндекса')
      localStorage.setItem('yandex_token', token);
    }
    return token
  }

  /**
   * Метод загрузки файла в облако
   */
  static uploadFile(path, url, callback){
    url = url.replace(/&/g, '%26');
    url = url.replace(/=/g, '%3D');
    createRequest({
      url: '/resources/upload',
      method: 'POST',
      headers: this.getHeader(),
      data: {path, url},
      callback: ( err, response ) => {
        console.log( err ); // null
        console.log( response ); // ответ
      }
      })
    }
    

  /**
   * Метод удаления файла из облака
   */
  static removeFile(path, callback){
    createRequest({
      url: `/resources`,
      method: 'DELETE',
      headers: this.getHeader(),
      data: {path},
      callback: ( err, response ) => {
        console.log( err ); // null
        console.log( response ); // ответ
      }
    })
  }

  /**
   * Метод получения всех загруженных файлов в облаке
   */
  static getUploadedFiles(callback){
    createRequest({
      url: `/resources/files`,
      method: 'GET',
      headers: this.getHeader(),
      callback: ( err, response ) => {
      
        console.log( err ); // null
        console.log( response ); // ответ
      }
    })

  }

  /**
   * Метод скачивания файлов
   */
  static downloadFileByUrl(url){
    let link = document.createElement('a');
    link.href = url;
    link.click();
  }
}
