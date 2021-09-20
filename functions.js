/**
 * Изменяет название презентации
 * @param {Presentation} presentation
 * @param {string} title
 * @return {Presentation}
*/


function changeTitle(presentation, title) {}

/**
 * Сохраняет презенацию в виде json файла
 * @param {Presentation} presentation
 * @return {File}
*/

function saveDoc(presentation) {}

/**
 * Загружает презентацию в приложение
 * @param {Presentation} presentation
 * @param {File} presentationFile
 * @return {Presentation}
*/

function uploadDoc(presentation, presentationFile) {}

/**
 * Экспортирует презентацию в виде pdf
 * @param {Presentation} presentation
 * @return {File}
*/

function exportDoc(presentation) {}

/**
 * Изменяет режим с редактирование презентации на просмотр, или наоборот
 * @param {Presentation} presentation
 * @param {Boolean} previewOn
 * @return {Presentation}
*/

function switchPreview(presentation) {}

/**
 * Отменяет предыдущее действие
 * @param {History} history
 * @param {Presentation} Presentation
 * @return {Presentation}
*/

function undo(history, presentation) {}

/**
 * Отменить последнее действие
 * @param {history} history - История действий
 * @return {presentation}
 */

function redo(history, presentation) {}

/**
 * Добавить новый слайд в презентацию
 * @param {slides} slides - Слайды
 * @return {slides}
 */

function addSlide(slides) {}

/**
 * Удалить все выделенные слайды
 * @param {slides} slides
 * @param {selectedSlideId} selectedSlideId
 * @return {slides}
 */

function removeSlide(slides, selectedSlideId) {}

/**
 * Перейти на нажатый слайд
 * @param {selectedSlideId} selectedSlideId
 * @param {slideId} slideId
 * @return {slides} presentation - your project
 */

function switchSlide(selectedSlideId, slideId) {}

/**
 * Установить фоновое изображение
 * @param {slideId} slideId
 * @param {string} background
 * @return {slide}
 */

function setBackground(slideId, background) {} //?

/**
 * Добавить объект на слайд
 * @param {element}
 * @return {elemenents}
 */
function addObject(element, elements) {}

/**
 * Изменить свойства объекта
 * @param {element} element
 * @param {property} propertyType
 * @param {string} value 
 * @return {element}
 */
function changeObject(object, propertyType, value) {}
