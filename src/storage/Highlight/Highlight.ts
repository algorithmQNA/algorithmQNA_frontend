import { atom } from 'recoil';

const HighlightStatusAtom = atom({
  key: 'highlight-status',
  default: {
    commentId: -1,
    highlightingMode: false,
  },
});

export default HighlightStatusAtom;
