import {$} from '../../core/dom';

export function resizeHandler($root, event) {
  const $resizer = $(event.target);
  const type = $resizer.data.resize;
  const sideProp = type === 'col' ? 'bottom' : 'right';
  // const $parent = $resizer.$el.parentNode; bad !!!
  // const $parent = $resizer.$el.closest('.column'); better but bad !!!

  // work with data
  const $parent = $resizer.closest('[data-type="resizable"]');
  // console.log($parent.getCoords());
  const coords = $parent.getCoords();
  let value;

  $resizer.css({
    opacity: 1,
    [sideProp]: '-5000px',
  });


  document.onmousemove = (e) => {
    // console.log(e);
    if ( type === 'col') {
      const delta = e.pageX - coords.right;
      value = coords.width + delta;
      $resizer.css({right: -delta + 'px'});
      // $parent.css({width: value + 'px'});
      // cells.forEach((el) => el.style.width = value + 'px');
    } else {
      const delta = e.pageY - coords.bottom;
      value = coords.height + delta;
      $resizer.css({bottom: -delta + 'px'});
      // $parent.css({height: value + 'px'});
    }
  };

  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;

    if (type === 'col') {
      $parent.css({width: value + 'px'});
      $root.findAll(`[data-col="${$parent.data.col}"]`)
          .forEach((el) => el.style.width = value + 'px');
    } else {
      $parent.css({height: value + 'px'});
    }

    $resizer.css({
      opacity: 0,
      bottom: 0,
      right: 0,
    });
  };
}
