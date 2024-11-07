/**
 * Класс SearchBlock
 * Используется для взаимодействием со строкой ввода и поиска изображений
 * */
class SearchBlock {
  constructor(element) {
    this.element = element;
    this.registerEvents();
  }

  /**
   * Выполняет подписку на кнопки "Заменить" и "Добавить"
   * Клик по кнопкам выполняет запрос на получение изображений и отрисовывает их,
   * только клик по кнопке "Заменить" перед отрисовкой очищает все отрисованные ранее изображения
   */
  registerEvents() {
    const findImages = (event) => { 
      const input = document.querySelector('input');
      if (input.value.trim()) {
        if (event.target.classList.contains('add')) {
          VK.get(input.value, App.imageViewer.drawImages);
        } else if (event.target.classList.contains('replace')) {
          App.imageViewer.clear();
          VK.get(input.value, App.imageViewer.drawImages);
        }
      } 
    };

    this.element.addEventListener('click', findImages); 
  }
}