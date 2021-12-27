import { addSlide, redo, switchPreview, undo } from './model/actionCreators';
import { store } from './model/store'

document.addEventListener('keydown', function(event) {
    if (event.code == 'KeyZ' && (event.ctrlKey || event.metaKey)) {
        store.dispatch(undo())
    }
});

document.addEventListener('keydown', function(event) {
    if (event.code == 'KeyY' && (event.ctrlKey || event.metaKey)) {
        store.dispatch(redo())
    }
});

document.addEventListener('keydown', function(event) {
    if (event.altKey) {
        store.dispatch(switchPreview())
    }
});

document.addEventListener('keydown', function(event) {
    if (event.code == 'KeyN' && (event.ctrlKey || event.metaKey)) {
        store.dispatch(addSlide())
    }
});