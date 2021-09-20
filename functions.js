/**
 * @param{Presentation} presentation
 * @return{Presentation}
 * @param{History} history
 * @return{Histoty}
 */


function changeTitle(presentation, title) {}

function saveDoc(presentation) {}

function uploadDoc(presentation, presentationFile) {}

function exportDoc(presentation) {}

function switchPreview(presentation) {}


function undo(history, presentation) {}

/**
 * Отменить последнее действие
 * @param {history} history - История действий
 * @return {presentation} Презентация
 */
function redo(history, presentation) {}

/**
 * Добавить новый слайд в презентацию
 * @param {slides} slides - Слайды
 * @return {presentation} your project
 */
function addSlide(slides) {}

/**
 * Удалить все выделенные слайды
 * @param {slides}
 * @param {selectedSlideId}
 * @return {presentation} presentation - your project
 */
function removeSlide(slides, selectedSlideId) {}

/**
 * Перейти на нажатый слайд
 * @param {selectedSlideId}
 * @param {slideId}
 * @return {presentation} presentation - your project
 */
function switchSlide(selectedSlideId, slideId) {}

/**
 * Установить фоновое изображение
 * @param {slideId}
 * @param {background}
 * @return {presentation} presentation - your project
 */
function setBackground(slideId, background) {} //?

/**
 * Добавить объект на слайд
 * @param {objectType}
 * @param {elements}
 * @return {presentation} presentation - your project
 */
function addObject(objectType, elements) {}

/**
 * Изменить свойства объекта
 * @param {object}
 * @param {propertyType}
 * @param {value}
 * @return {presentation} presentation - your project
 */
function changeObject(object, propertyType, value) {}
