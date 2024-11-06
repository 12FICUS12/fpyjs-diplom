/**
 * Класс ImageViewer
 * Используется для взаимодействием блоком изображений
 * */
class ImageViewer {
  constructor( element ) {
    this.element = element;
    this.previewBlock = this.element.querySelector('.image');
    this.imagesList = this.element.querySelector('.images-list .grid .row');
    this.registerEvents();  

  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по изображению меняет класс активности у изображения
   * 2. Двойной клик по изображению отображает изображаения в блоке предпросмотра
   * 3. Клик по кнопке выделения всех изображений проверяет у всех ли изображений есть класс активности?
   * Добавляет или удаляет класс активности у всех изображений
   * 4. Клик по кнопке "Посмотреть загруженные файлы" открывает всплывающее окно просмотра загруженных файлов
   * 5. Клик по кнопке "Отправить на диск" открывает всплывающее окно для загрузки файлов
   */
  registerEvents(){
    // один клик
    this.imagesList.addEventListener('click', (event) => {
      if (event.target.tagName.toLowerCase() == 'img') {
        event.target.classList.toggle('selected');
        this.checkButtonText();
      }})
    // два клика
    this.imagesList.addEventListener('dblclick', (event) => {
      if (event.target.tagName.toLowerCase() === 'image'){
        this.previewBlock.src = event.target.src = event.target.src;
      }})
    // клик по кнопке выделения всех изображений
    document.querySelector('.select-all').addEventListener('click', () => {

      const arrayImg = Array.from(this.imagesList.querySelectorAll('img'))
      if (ImageViewer.anySelected(arrayImg))
        arrayImg.forEach(element => {element.classList.remove('selected')})
      else {  
        arrayImg.forEach(element => {element.classList.add('selected')})
      }
      
      this.checkButtonText()
    })
    // клик по кнопке "Посмотреть загруженные файлы"
    document.querySelector('.show-uploaded-files').addEventListener('click', () => {
      const modal = App.getModal('filePreviewer')
      document.querySelector('.uploaded-prewiewer-modal .content').innerHTML = '<i class="asterisk loading icon massive"></i>';
      modal.open();
      Yandex.getUploadedFiles(callback =>{
        modal.showImages(callback);})
      })

    // клик по кнопке "Отправить на диск"
    document.querySelector('.send').addEventListener('click', () => {
      const modal = App.getModal('fileUploader');
      const allImagesSrc = Array.from(this.imagesList.querySelectorAll('.selected')).map(element => element.src)
      modal.open();
      modal.showImages(allImagesSrc);
    })
  }


  /**
   * Очищает отрисованные изображения
   */
  clear() {
    this.imagesList.innerHTML = '';

  }

  /**
   * Отрисовывает изображения.
  */
  drawImages(images) {
    if (images.length > 0) {
      document.querySelector('.select-all').classList.remove('disabled');
    } else {
      document.querySelector('.select-all').classList.add('disabled');
    }
    images.forEach( image => {
      let pictures = document.createElement('div');
      pictures.classList.add('four', 'wide', 'column', 'ui', 'medium', 'image-wrapper');
      pictures.innerHTML = `<img src="${image.url}" />`;
      document.querySelector('.images-list .grid .row').appendChild(pictures);
    })

  }

  /**
   * Контроллирует кнопки выделения всех изображений и отправки изображений на диск
   */
  checkButtonText(){
    const allImages = Array.from(this.imagesList.querySelectorAll('img'))
    const allButton = document.querySelector('.select-all');
    const sendButton = document.querySelector('.send');
    allButton.innerText = ImageViewer.allSelected(allImages) ? 'Снять выделение' : 'Выбрать все';
    allButton.innerText = ImageViewer.anySelected(allImages) ? 'Снять выделение' : 'Выбрать все';
    ImageViewer.anySelected(allImages) ? sendButton.classList.remove('disabled') : sendButton.classList.add('disabled');
  }
  static anySelected(element) {
    for (let index = 0; index < element.length; index++) {
        if (element[index].classList.contains('selected')) {
          return true
        };
    }
    return false;
  }

  static allSelected(element) {
    for (let index = 0; index < element.length; index++) {
        if (!element[index].classList.contains('selected')) {
          return false
        };
    }
    return true;
  }

}
