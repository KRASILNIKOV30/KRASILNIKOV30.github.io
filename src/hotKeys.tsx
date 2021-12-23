import { dispatch, uploadDoc } from './model/editor';

import { changeTitle, saveDoc, exportDoc, switchPreview, undo, redo } from "./model/presentation";
import { addSlide, removeSlides, switchSlidePositions } from "./model/slide";
import { changeTextProps } from "./model/element"

document.addEventListener('keydown', function(event) {
if (event.code == 'KeyZ' && (event.ctrlKey || event.metaKey)) {
dispatch(undo, {})
}
});

document.addEventListener('keydown', function(event) {
if (event.code == 'KeyY' && (event.ctrlKey || event.metaKey)) {
dispatch(redo, {})
}
});

document.addEventListener('keydown', function(event) {
if (event.altKey) {
dispatch(switchPreview, {})
}
});

document.addEventListener('keydown', function(event) {
if (event.code == 'KeyN' && (event.ctrlKey || event.metaKey)) {
dispatch(addSlide, {})
}
});