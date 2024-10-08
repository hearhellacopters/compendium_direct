import Tippy from '@tippyjs/react';

Tippy.defaultProps = {
  ...Tippy.defaultProps,
  arrow: true,
  maxWidth: "300px",
  animation: "shift-away",
  placement: "top",
  className: "tooltip",
  duration: [50, 500],
  touch: ["hold", 250],
  theme: 'new-white-boarder',
}

export default Tippy